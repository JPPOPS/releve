/* Relevé de leçon — compteur d'erreurs et de réussites pour le moniteur.
   Rien n'est envoyé. La leçon en cours est gardée sur le téléphone (en cas de fermeture
   accidentelle) et effacée à la « Nouvelle leçon ». Seuls tes réglages et tes erreurs
   personnalisées sont conservés. */
(function () {
  'use strict';
  const KEY = 'releve.v2';
  const MAX_DU_JOUR = 3;
  const $app = document.getElementById('app');
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- Référentiel ----------
  const OBJ = [];
  Object.keys(REF).forEach((c) => REF[c].objectifs.forEach(([titre, savoirs], i) => OBJ.push({ id: `${c}-${i + 1}`, comp: c, n: i + 1, titre, savoirs })));
  const OBJ_BY = Object.fromEntries(OBJ.map((o, i) => [o.id, Object.assign(o, { idx: i })]));
  const cd = (id) => String(id).replace('-', '.');
  const COLORS = { C1: '#0F8F8F', C2: '#D4116B', C3: '#5E8A12', C4: '#C46F00' };
  const savoirTxt = (l) => OBJ_BY[l[0]].savoirs[l[1] - 1] || OBJ_BY[l[0]].titre;

  // ---------- État ----------
  let S;
  function fresh() { return { hide: false, sit: true, sitDur: 30, custom: [], lesson: null }; }
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { S = fresh(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* */ } }
  const L = () => S.lesson;
  function ensure() { const l = L(); if (!l) return; l.themes = l.themes || {}; l.pl = l.pl || []; if (l.plNote == null) l.plNote = ''; }
  const TH_BY = Object.fromEntries(THEMES.map((t) => [t.id, t]));
  const tabs = (cur) => { const l = L(), n = Object.keys(l.themes || {}).length; return `<div class="seg tabs" role="tablist"><a href="#lecon" role="tab" aria-selected="${cur === 'lecon'}">Erreurs</a><a href="#travail" role="tab" aria-selected="${cur === 'travail'}">Travaillé${n ? ' (' + n + ')' : ''}</a></div>`; };
  let ALL = [], ERR_BY = {};
  function rebuild() { ALL = ERREURS.concat(S.custom); ERR_BY = Object.fromEntries(ALL.map((e) => [e.id, e])); }
  rebuild();

  function isActive(e) {
    const l = L();
    if (e.toujours || !e.liens.length) return true;
    return e.liens.some((x) => l.worked.includes(x[0]) || l.today.includes(x[0]));
  }
  function bigList() {
    const l = L(), out = [];
    const push = (e) => { if (e && !out.includes(e) && !e.plus && !e.inter && isActive(e)) out.push(e); };
    if (l.today.length) ALL.filter((e) => e.liens.some((x) => l.today.includes(x[0]))).forEach(push);
    else {
      const last3 = l.worked.slice().sort((a, b) => OBJ_BY[b].idx - OBJ_BY[a].idx).slice(0, 3);
      ALL.filter((e) => e.liens.length && last3.includes(e.liens[0][0])).forEach(push);
    }
    PRIORITE.forEach((id) => { if (out.length < 6) push(ERR_BY[id]); });
    return out.slice(0, 8);
  }

  // ---------- Toast & situation ----------
  let toastT = null, sitT = null;
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.textContent = msg; t.style.display = 'block';
    clearTimeout(toastT); toastT = setTimeout(() => { t.style.display = 'none'; }, 1400);
  }
  function hideSit() { const b = document.querySelector('.sitbar'); if (b) b.remove(); document.body.classList.remove('has-sit'); clearTimeout(sitT); }
  function askSituation(force) {
    hideSit(); if (!S.sit && !force) return;
    const l = L(), last = l.log[l.log.length - 1]; if (!last) return;
    const dur = S.sitDur || 0;
    const bar = document.createElement('div'); bar.className = 'sitbar';
    bar.innerHTML = `<div class="row between"><div class="small" style="font-weight:700">Précision : ${esc(ERR_BY[last.id].label)} <span class="muted" style="font-weight:400">(facultatif)</span></div><button class="icon-btn" id="sitx" aria-label="Fermer" style="width:40px;height:40px">✕</button></div>
      ${dur ? `<div class="sitprog"><div style="animation-duration:${dur}s"></div></div>` : ''}
      <div class="sitgrid">${(PRECISIONS[last.id] || ERR_BY[last.id].precisions || SITUATIONS).map((s2) => `<button data-s="${esc(s2)}" ${last.sit === s2 ? 'aria-pressed="true"' : ''}>${esc(s2)}</button>`).join('')}</div>`;
    document.body.appendChild(bar); document.body.classList.add('has-sit');
    bar.querySelector('#sitx').addEventListener('click', hideSit);
    bar.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => {
      last.sit = b.dataset.s; save(); hideSit(); toast(`${ERR_BY[last.id].label} · ${last.sit}`); if (location.hash !== '#bilan') vLecon();
    }));
    if (dur) sitT = setTimeout(hideSit, dur * 1000);
  }

  // ---------- Compter ----------
  function bag(kind) { const l = L(); return kind === 'ok' ? l.ok : kind === 'off' ? l.off : l.counts; }
  function count(id, kind) {
    const l = L(), b = bag(kind);
    b[id] = (b[id] || 0) + 1; l.log.push({ id, kind }); save();
    if (navigator.vibrate) navigator.vibrate(kind === 'ok' ? [20, 40, 20] : kind === 'off' ? [30, 60, 30] : 35);
    const e = ERR_BY[id];
    toast(kind === 'ok' ? `✓ ${e.bien}` : `+1 ${e.label}${kind === 'off' ? ' (non travaillé)' : ''}`);
    vLecon(id, kind);
    if (kind === 'err' && !e.plus) askSituation(); else hideSit();
  }
  function undo() {
    const l = L(), last = l.log.pop(); if (!last) return;
    const b = bag(last.kind); b[last.id] = Math.max(0, (b[last.id] || 0) - 1); if (!b[last.id]) delete b[last.id];
    save(); hideSit(); if (navigator.vibrate) navigator.vibrate(15); toast(`Annulé : ${last.kind === 'ok' ? ERR_BY[last.id].bien : ERR_BY[last.id].label}`); vLecon();
  }

  // ---------- Navigation ----------
  function go(h) { if (location.hash === h) route(); else location.hash = h; }
  window.addEventListener('hashchange', route);
  function route() {
    hideSit();
    const h = location.hash.replace('#', '');
    if (h === 'perso') return vPerso();
    if (!L() || h === 'setup') return vSetup();
    ensure();
    if (h === 'bilan') return vBilan();
    if (h === 'travail') return vTravail();
    vLecon();
  }
  let keepScroll = false;
  function render(html) { const y = window.scrollY; $app.innerHTML = html; window.scrollTo(0, keepScroll ? y : 0); keepScroll = false; }
  const back = (to) => `<a class="icon-btn" href="${to}" aria-label="Retour"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></a>`;

  // ---------- Écran : préparer la leçon ----------
  let draft = null;
  function vSetup() {
    keepScroll = !!draft;
    const cur = L();
    if (!draft) draft = { initials: cur ? cur.initials : '', worked: cur ? cur.worked.slice() : [], today: cur ? cur.today.slice() : [], mode: cur && cur.worked.length ? 'one' : 'upto', info: '' };
    const d = draft;
    if (!d.open) { const hi = d.worked.length ? OBJ_BY[d.worked.slice().sort((x, y) => OBJ_BY[y].idx - OBJ_BY[x].idx)[0]].comp : 'C1'; d.open = { [hi]: true }; }
    const grid = Object.keys(REF).map((c) => {
      const list = OBJ.filter((o) => o.comp === c), n = list.filter((o) => d.worked.includes(o.id)).length;
      return `<section class="comp" style="--cc:${COLORS[c]}">
        <button class="comphead" data-c="${c}" aria-expanded="${!!d.open[c]}"><span class="cbadge">${c}</span><span class="ctitle">${esc(REF[c].titre)}</span><span class="ccount">${n}/${list.length}</span></button>
        ${d.open[c] ? `<div class="objlines">${list.map((o) => `<button class="objline ${d.worked.includes(o.id) ? 'on' : ''}" data-o="${o.id}" aria-pressed="${d.worked.includes(o.id)}"><span class="box" aria-hidden="true">${d.worked.includes(o.id) ? '✓' : ''}</span><span class="otxt"><b>${o.n}.</b> ${esc(o.titre)}</span></button>`).join('')}</div>` : ''}
      </section>`;
    }).join('');
    const objChecks = Object.keys(REF).map((c) => `<div class="sect" style="margin:10px 0 0">${c}</div>${OBJ.filter((o) => o.comp === c).map((o) => `<label><input type="checkbox" value="${o.id}" ${d.today.includes(o.id) ? 'checked' : ''}><span><b>${cd(o.id)}</b> ${esc(o.titre)}</span></label>`).join('')}`).join('');
    render(`
      <div class="row between"><div class="brand">Relevé de leçon</div>${cur ? '<a class="pill" href="#lecon">Reprendre</a>' : ''}</div>
      <div class="field"><label for="ini">Élève (initiales, facultatif)</label><input id="ini" class="input" maxlength="5" autocomplete="off" value="${esc(d.initials)}" placeholder="ex. AC"></div>
      <div class="card stack" style="gap:10px">
        <div class="row between"><b>Objectifs déjà travaillés</b><span class="small muted">${d.worked.length} / ${OBJ.length}</span></div>
        <div class="seg" role="group" aria-label="Mode de sélection">
          <button data-m="upto" aria-pressed="${d.mode === 'upto'}">Jusqu'à…</button><button data-m="one" aria-pressed="${d.mode === 'one'}">Un par un</button></div>
        <div class="small muted">${d.mode === 'upto' ? 'Touche le dernier objectif travaillé : tout ce qui précède est coché, la suite décochée.' : 'Touche un objectif pour l\'ajouter ou l\'enlever.'}</div>
        ${grid}
        <div class="small" style="min-height:36px;color:var(--ink2)">${esc(d.info)}</div>
        <div class="row"><button class="btn btn-light" id="all" style="min-height:44px;font-size:14px">Tout</button><button class="btn btn-light" id="none" style="min-height:44px;font-size:14px">Rien</button></div>
      </div>
      <details class="card" ${d.today.length ? 'open' : ''}><summary>Leçon ciblée (facultatif)</summary>
        <span class="small muted">Jusqu'à ${MAX_DU_JOUR} objectifs du jour : leurs erreurs passent en gros boutons et sont actives même s'ils ne sont pas cochés plus haut.</span>
        <div class="objlist" id="today">${objChecks}</div></details>
      <div class="card stack" style="gap:4px">
        <div class="switch"><label for="hide" style="font-weight:700">Masquer les erreurs non travaillées</label><input type="checkbox" id="hide" ${S.hide ? 'checked' : ''}></div>
        <div class="switch"><label for="sit" style="font-weight:700">Proposer une précision après une erreur</label><input type="checkbox" id="sit" ${S.sit ? 'checked' : ''}></div>
        <div class="switch"><label for="sitd" style="font-weight:700">Temps pour choisir la précision</label><select id="sitd" class="input" style="width:auto;min-height:44px">${[[15, '15 s'], [30, '30 s'], [60, '1 min'], [0, 'Jusqu\'à fermeture']].map(([v, t]) => `<option value="${v}" ${(S.sitDur ?? 30) === v ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
        <a class="pill" href="#perso" style="justify-content:space-between;margin-top:6px">Mes erreurs personnalisées (${S.custom.length}) <span aria-hidden="true">›</span></a>
      </div>
      <div class="spacer stack">
        ${cur ? '<button class="btn btn-primary" id="keep">Appliquer et reprendre la leçon</button>' : ''}
        <button class="btn ${cur ? 'btn-light' : 'btn-primary'}" id="go" ${d.worked.length || d.today.length ? '' : 'disabled'}>${cur ? 'Nouvelle leçon (remise à zéro)' : 'Commencer la leçon'}</button>
        ${d.worked.length || d.today.length ? '' : '<div class="small muted" style="text-align:center">Coche au moins un objectif travaillé.</div>'}
      </div>
      <p class="footer">Rien n'est envoyé ni conservé après la remise à zéro. · <a href="mentions-legales.html">Mentions légales</a></p>`);
    const sync = () => { d.initials = $app.querySelector('#ini').value.trim().toUpperCase(); d.today = [...$app.querySelectorAll('#today input')].filter((b) => b.checked).map((b) => b.value); };
    $app.querySelector('#ini').addEventListener('input', sync);
    $app.querySelectorAll('[data-m]').forEach((b) => b.addEventListener('click', () => { sync(); d.mode = b.dataset.m; vSetup(); }));
    $app.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('click', () => { sync(); d.open[b.dataset.c] = !d.open[b.dataset.c]; vSetup(); }));
    $app.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => {
      sync(); const o = OBJ_BY[b.dataset.o];
      if (d.mode === 'upto') { d.worked = OBJ.filter((x) => x.idx <= o.idx).map((x) => x.id); d.mode = 'one'; d.info = `Coché jusqu'à ${cd(o.id)}. Ajuste au besoin.`; }
      else if (d.worked.includes(o.id)) { d.worked = d.worked.filter((x) => x !== o.id); d.info = `Retiré : ${cd(o.id)}`; }
      else { d.worked.push(o.id); d.info = `Ajouté : ${cd(o.id)}`; }
      vSetup();
    }));
    $app.querySelector('#all').addEventListener('click', () => { sync(); d.worked = OBJ.map((x) => x.id); d.info = 'Tout le programme est coché (fin de formation).'; vSetup(); });
    $app.querySelector('#none').addEventListener('click', () => { sync(); d.worked = []; d.mode = 'upto'; d.info = ''; vSetup(); });
    const boxes = () => [...$app.querySelectorAll('#today input')];
    const limit = () => { const n = boxes().filter((b) => b.checked).length; boxes().forEach((b) => { b.disabled = !b.checked && n >= MAX_DU_JOUR; }); };
    boxes().forEach((b) => b.addEventListener('change', () => { limit(); sync(); const g = $app.querySelector('#go'); if (g) g.disabled = !(d.worked.length || d.today.length); }));
    limit();
    $app.querySelector('#hide').addEventListener('change', (e) => { S.hide = e.target.checked; save(); });
    $app.querySelector('#sit').addEventListener('change', (e) => { S.sit = e.target.checked; save(); });
    $app.querySelector('#sitd').addEventListener('change', (e) => { S.sitDur = parseInt(e.target.value, 10); save(); });
    $app.querySelector('#go').addEventListener('click', () => {
      sync();
      if (cur && cur.log.length && !confirm('Remettre tous les compteurs à zéro ?')) return;
      S.lesson = { initials: d.initials, worked: d.worked.slice(), today: d.today.slice(), counts: {}, ok: {}, off: {}, log: [], start: Date.now() };
      save(); draft = null; go('#lecon');
    });
    const keep = $app.querySelector('#keep');
    if (keep) keep.addEventListener('click', () => { sync(); Object.assign(S.lesson, { initials: d.initials, worked: d.worked.slice(), today: d.today.slice() }); save(); draft = null; go('#lecon'); });
  }

  // ---------- Écran : erreurs personnalisées ----------
  function vPerso() {
    const opts = Object.keys(REF).map((c) => `<optgroup label="${c}">${OBJ.filter((o) => o.comp === c).map((o) => `<option value="${o.id}">${cd(o.id)} · ${esc(o.titre)}</option>`).join('')}</optgroup>`).join('');
    const gopts = Object.entries(GRILLE).filter(([k]) => !['bonus'].includes(k)).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('');
    render(`<div class="row">${back('#setup')}<h1 style="font-size:24px;font-weight:800">Mes erreurs</h1></div>
      <div class="small muted">Elles s'ajoutent à la liste, sont rattachées à l'objectif choisi et restent enregistrées sur ce téléphone.</div>
      ${S.custom.length ? `<div class="list">${S.custom.map((e) => `<div class="row-tap" style="cursor:default"><span class="lab">${esc(e.label)}<span class="ref">${cd(e.liens[0][0])} · ${esc(GRILLE[e.grille])}${e.bien ? ' · ✓ ' + esc(e.bien) : ''}</span></span><button class="icon-btn" data-del="${e.id}" aria-label="Supprimer ${esc(e.label)}">✕</button></div>`).join('')}</div>` : ''}
      <div class="card stack">
        <b>Ajouter une erreur</b>
        <div class="field"><label for="pl">Intitulé de l'erreur</label><input id="pl" class="input" maxlength="40" placeholder="ex. Frein à main oublié"></div>
        <div class="field"><label for="pb">Intitulé de la réussite (facultatif)</label><input id="pb" class="input" maxlength="40" placeholder="ex. Frein à main desserré"></div>
        <div class="field"><label for="pp">Précisions proposées (facultatif, séparées par des virgules)</label><input id="pp" class="input" maxlength="200" placeholder="ex. Démarrage, Stationnement en côte"></div>
        <div class="field"><label for="po">Objectif du livret</label><select id="po" class="input">${opts}</select></div>
        <div class="field"><label for="pg">Case de la grille</label><select id="pg" class="input">${gopts}</select></div>
        <div class="check"><input type="checkbox" id="pe"><label for="pe" style="font-weight:400">Éliminatoire à l'examen</label></div>
        <button class="btn btn-primary" id="add">Ajouter</button>
      </div>`);
    $app.querySelectorAll('[data-del]').forEach((b) => b.addEventListener('click', () => {
      if (!confirm('Supprimer cette erreur ?')) return;
      S.custom = S.custom.filter((e) => e.id !== b.dataset.del); save(); rebuild(); vPerso();
    }));
    $app.querySelector('#add').addEventListener('click', () => {
      const label = $app.querySelector('#pl').value.trim(); if (!label) { $app.querySelector('#pl').focus(); return; }
      const bien = $app.querySelector('#pb').value.trim();
      const e = { id: 'u' + Date.now(), label, liens: [[$app.querySelector('#po').value, 0]], grille: $app.querySelector('#pg').value, custom: true };
      if (bien) e.bien = bien; if ($app.querySelector('#pe').checked) e.elim = true;
      const pr = $app.querySelector('#pp').value.split(',').map((x) => x.trim()).filter(Boolean).slice(0, 12); if (pr.length) e.precisions = pr;
      S.custom.push(e); save(); rebuild(); toast('Erreur ajoutée'); vPerso();
    });
  }

  // ---------- Écran : leçon en cours ----------
  function vLecon(hitId, hitKind) {
    const l = L(); if (!l) return vSetup();
    keepScroll = !!$app.querySelector('.big');
    const total = Object.values(l.counts).reduce((a, b) => a + b, 0);
    const totalOk = Object.values(l.ok).reduce((a, b) => a + b, 0);
    const big = bigList();
    const last = l.log[l.log.length - 1];
    const lastTxt = last ? (last.kind === 'ok' ? '✓ ' + ERR_BY[last.id].bien : ERR_BY[last.id].label) + (last.sit ? ' · ' + last.sit : '') : '';
    const okBtn = (e, cls) => e.bien ? `<button class="${cls}" data-ok="${e.id}" aria-label="Bien : ${esc(e.bien)}"><span aria-hidden="true">✓</span><b>${l.ok[e.id] || 0}</b></button>` : '';
    const tile = (e) => {
      const n = l.counts[e.id] || 0;
      return `<div class="tile2 ${e.elim ? 'elim' : ''} ${hitId === e.id ? 'hit-' + hitKind : ''}">
        <button class="tap-err" data-id="${e.id}"><span class="lab">${esc(e.label)}</span><span class="foot"><span class="ref">${esc(e.liens.length ? cd(e.liens[0][0]) : (e.elim ? 'Éliminatoire' : 'Hors grille'))}</span><span class="cnt ${n ? '' : 'zero'}">${n}</span></span></button>
        ${okBtn(e, 'tap-ok')}</div>`;
    };
    const groups = {};
    ALL.forEach((e) => { if (big.includes(e) || e.inter) return; const k = e.plus ? 'bonus' : e.grille; (groups[k] = groups[k] || []).push(e); });
    const rows = Object.keys(GRILLE).filter((k) => groups[k]).map((k) => {
      const items = groups[k].filter((e) => isActive(e) || !S.hide || l.off[e.id]);
      if (!items.length) return '';
      return `<div class="sect">${esc(GRILLE[k])}</div><div class="list">${items.map((e) => {
        const act = isActive(e), n = act ? (l.counts[e.id] || 0) : (l.off[e.id] || 0);
        return `<div class="row2 ${act ? '' : 'off'} ${!act && n ? 'hasoff' : ''}"><button class="row-tap" data-id="${e.id}" ${act ? '' : 'data-off="1"'}><span class="lab">${e.elim ? '⚠ ' : ''}${e.plus ? '✚ ' : ''}${esc(e.label)}<span class="ref">${esc(e.liens.length ? cd(e.liens[0][0]) : '')}${act ? '' : ' · non travaillé · appui long'}</span></span><span class="cnt ${n ? '' : 'zero'}">${n}</span></button>${act && !e.plus ? okBtn(e, 'row-ok') : ''}</div>`;
      }).join('')}</div>`;
    }).join('');
    render(`
      <div class="bar-top"><a class="pill" href="#setup">${l.initials ? esc(l.initials) + ' · ' : ''}${l.worked.length} obj.${l.today.length ? ' · ciblée' : ''}</a>
        <span class="total" aria-label="${total} erreurs, ${totalOk} réussites"><span style="color:var(--orange-d)">✗${total}</span> <span style="color:var(--blue-d)">✓${totalOk}</span></span>
        <a class="btn btn-dark" href="#bilan" style="width:auto;min-height:44px;padding:0 16px;font-size:15px">Bilan</a></div>
      ${tabs('lecon')}
      <div class="undo"><span>${last ? 'Dernier : ' + esc(lastTxt) : 'Gauche : erreur · Droite : ✓ réussite'}</span><span class="row" style="gap:6px">${last && last.kind === 'err' && !ERR_BY[last.id].plus ? '<button id="sitbtn">Préciser</button>' : ''}<button id="undo" ${last ? '' : 'disabled'}>Annuler</button></span></div>
      <div class="big">${big.map(tile).join('')}${ALL.filter((e) => e.inter).map(tile).join('')}</div>
      <details ${S.openOthers ? 'open' : ''} id="others"><summary>Autres erreurs et points positifs</summary><div class="stack" style="gap:12px">${rows}</div></details>`);
    $app.querySelector('#undo').addEventListener('click', undo);
    const sb = $app.querySelector('#sitbtn'); if (sb) sb.addEventListener('click', () => askSituation(true));
    $app.querySelector('#others').addEventListener('toggle', (e) => { S.openOthers = e.target.open; save(); });
    $app.querySelectorAll('[data-ok]').forEach((b) => b.addEventListener('click', () => count(b.dataset.ok, 'ok')));
    $app.querySelectorAll('[data-id]').forEach((b) => {
      const id = b.dataset.id;
      if (!b.dataset.off) { b.addEventListener('click', () => count(id, 'err')); return; }
      let t = null, fired = false;
      const start = () => { fired = false; t = setTimeout(() => { fired = true; count(id, 'off'); }, 550); };
      const stop = () => clearTimeout(t);
      b.addEventListener('pointerdown', start); b.addEventListener('pointerup', stop); b.addEventListener('pointerleave', stop); b.addEventListener('pointercancel', stop);
      b.addEventListener('contextmenu', (e) => e.preventDefault());
      b.addEventListener('click', () => { if (!fired) toast('Non travaillé : appui long pour noter'); });
    });
  }

  // ---------- Écran : travaillé aujourd'hui ----------
  const themeText = (t, st) => {
    let txt = t.label;
    if (t.opts && st.opts) {
      const o = st.opts, parts = [];
      if (o.sens) parts.push(o.sens); if (o.cote) parts.push(o.cote);
      if (parts.length) txt += ' ' + parts.join(' ');
      if (o.veh) txt += ', ' + o.veh;
    }
    if (st.how && st.how.length) txt += ' (' + st.how.join(', ') + ')';
    return txt;
  };
  function vTravail() {
    const l = L(); if (!l) return vSetup();
    keepScroll = !!$app.querySelector('.thg');
    S.openG = S.openG || { 0: true };
    const row = (t) => {
      const st = l.themes[t.id] || {}, on = !!st.kind, p = st.plus || 0;
      const opts = t.opts ? Object.entries(t.opts).map(([k, vals]) => `<div class="optrow"><span class="small muted">${esc(OPT_LABELS[k])}</span>${vals.map((v) => `<button data-opt="${t.id}|${k}|${esc(v)}" aria-pressed="${!!(st.opts && st.opts[k] === v)}">${esc(v)}</button>`).join('')}</div>`).join('') : '';
      return `<div class="th ${on ? 'on' : ''}">
        <div class="th-top"><span class="th-lab">${esc(t.label.replace(/^./, (c) => c.toUpperCase()))}</span>
          <span class="row" style="gap:4px">${p ? `<button class="th-minus" data-minus="${t.id}" aria-label="Retirer un plus">−</button>` : ''}<button class="th-plus ${p ? 'has' : ''}" data-plus="${t.id}" aria-label="Point positif">${p ? '+'.repeat(Math.min(p, 5)) : '+'}</button></span></div>
        <div class="kinds">${KINDS.map((k) => `<button data-kind="${t.id}|${k}" aria-pressed="${st.kind === k}">${k}</button>`).join('')}</div>
        ${on ? `<div class="hows">${HOWS.map((h) => `<button data-how="${t.id}|${esc(h)}" aria-pressed="${!!(st.how && st.how.includes(h))}">${esc(h)}</button>`).join('')}</div>${opts}` : ''}
      </div>`;
    };
    const groups = THEME_GROUPS.map((g, i) => {
      const list = THEMES.filter((t) => t.g === i), n = list.filter((t) => l.themes[t.id]).length;
      return `<section class="thg"><button class="thg-head" data-g="${i}" aria-expanded="${!!S.openG[i]}"><span>${esc(g)}</span><span class="small muted">${n ? n + ' noté' + (n > 1 ? 's' : '') : ''}</span></button>${S.openG[i] ? `<div class="thg-list">${list.map(row).join('')}</div>` : ''}</section>`;
    }).join('');
    render(`
      <div class="bar-top"><a class="pill" href="#setup">${l.initials ? esc(l.initials) + ' · ' : ''}${l.worked.length} obj.</a><span class="total"></span>
        <a class="btn btn-dark" href="#bilan" style="width:auto;min-height:44px;padding:0 16px;font-size:15px">Bilan</a></div>
      ${tabs('travail')}
      <div class="small muted">Touche Vu, Revu, Continué ou Abordé, puis précise comment. Le « + » valorise un progrès.</div>
      <div class="stack" style="gap:10px">${groups}</div>`);
    const st = (id) => (l.themes[id] = l.themes[id] || {});
    const clean = (id) => { const x = l.themes[id]; if (x && !x.kind && !x.plus) delete l.themes[id]; };
    const done = () => { save(); vTravail(); };
    $app.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => { S.openG[b.dataset.g] = !S.openG[b.dataset.g]; done(); }));
    $app.querySelectorAll('[data-kind]').forEach((b) => b.addEventListener('click', () => { const [id, k] = b.dataset.kind.split('|'); const x = st(id); x.kind = x.kind === k ? null : k; clean(id); done(); }));
    $app.querySelectorAll('[data-how]').forEach((b) => b.addEventListener('click', () => { const [id, h] = b.dataset.how.split('|'); const x = st(id); x.how = x.how || []; x.how = x.how.includes(h) ? x.how.filter((y) => y !== h) : x.how.concat(h); done(); }));
    $app.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => { const [id, k, v] = b.dataset.opt.split('|'); const x = st(id); x.opts = x.opts || {}; x.opts[k] = x.opts[k] === v ? undefined : v; done(); }));
    $app.querySelectorAll('[data-plus]').forEach((b) => b.addEventListener('click', () => { const x = st(b.dataset.plus); x.plus = (x.plus || 0) + 1; if (navigator.vibrate) navigator.vibrate([20, 40, 20]); done(); }));
    $app.querySelectorAll('[data-minus]').forEach((b) => b.addEventListener('click', () => { const x = st(b.dataset.minus); x.plus = Math.max(0, (x.plus || 0) - 1); clean(b.dataset.minus); done(); }));
  }

  // ---------- Bilan ----------
  const detail = (e) => e.liens.length ? `${cd(e.liens[0][0])} · ${savoirTxt(e.liens[0])}` : '';
  const lc = (t) => t.replace(/^./, (c) => c.toLowerCase());
  const uc = (t) => t.replace(/^./, (c) => c.toUpperCase());
  function sitText(id, kind) {
    const m = {}; L().log.filter((x) => x.id === id && x.kind === kind && x.sit).forEach((x) => { m[x.sit] = (m[x.sit] || 0) + 1; });
    const p = Object.entries(m).sort((a, b) => b[1] - a[1]).map(([s, n]) => `${n} ${s.toLowerCase()}`);
    return p.length ? `dont ${p.join(', ')}` : '';
  }
  // erreurs regroupées par précision : « Angle mort oublié — changement de voie ×2 »
  function errLines(kind, filter) {
    const m = new Map();
    L().log.filter((x) => x.kind === kind && ERR_BY[x.id] && filter(ERR_BY[x.id])).forEach((x) => {
      const k = x.id + '|' + (x.sit || ''); m.set(k, (m.get(k) || 0) + 1);
    });
    return [...m.entries()].map(([k, n]) => { const [id, sit] = k.split('|'); return { e: ERR_BY[id], sit, n }; })
      .sort((a, b) => b.n - a.n || a.e.label.localeCompare(b.e.label))
      .map((r) => ({ ...r, txt: `${r.e.label}${r.sit ? ' — ' + lc(r.sit) : ''} ×${r.n}` }));
  }
  function buildBilan() {
    const l = L();
    const ids = new Set(Object.keys(l.counts).concat(Object.keys(l.ok)));
    const rows = [...ids].map((id) => ({ e: ERR_BY[id], n: l.counts[id] || 0, ok: l.ok[id] || 0 })).filter((r) => r.e);
    const errs = rows.filter((r) => r.n && !r.e.plus && !r.e.elim && !r.e.inter).sort((a, b) => b.n - a.n || a.ok - b.ok);
    const plus = rows.filter((r) => r.n && r.e.plus);
    const strong = rows.filter((r) => r.ok && r.ok > r.n && !r.e.plus).sort((a, b) => (b.ok - b.n) - (a.ok - a.n));
    const worked = THEMES.filter((t) => l.themes[t.id] && l.themes[t.id].kind);
    const thPlus = THEMES.filter((t) => l.themes[t.id] && l.themes[t.id].plus);
    const eLines = errLines('err', (e) => !e.plus && !e.elim && !e.inter);
    const iLines = errLines('err', (e) => e.inter);
    const elLines = errLines('err', (e) => e.elim && !e.inter);
    const later = errLines('off', () => true);
    // aide « à cocher dans Suivi Drive »
    const ck = {};
    const mark = (o, tag) => { (ck[o] = ck[o] || new Set()).add(tag); };
    worked.forEach((t) => t.obj.forEach((o) => mark(o, ['Vu', 'Abordé'].includes(l.themes[t.id].kind) ? 'abordé' : 'travaillé')));
    rows.forEach((r) => { if (r.e.liens.length && !r.e.plus && r.n > r.ok) mark(r.e.liens[0][0], 'à revoir'); });
    const check = Object.entries(ck).sort((a, b) => OBJ_BY[a[0]].idx - OBJ_BY[b[0]].idx);
    return { l, errs, plus, strong, worked, thPlus, eLines, iLines, elLines, later, check };
  }
  function positives(b) {
    return b.thPlus.map((t) => `${lc(t.label)} ${'+'.repeat(b.l.themes[t.id].plus)}`)
      .concat(b.strong.map((r) => `${lc(r.e.bien)} ×${r.ok}`))
      .concat(b.plus.map((r) => lc(r.e.label)));
  }
  function plText(l) {
    const p = l.pl.map((id) => TH_BY[id] && TH_BY[id].label).filter(Boolean);
    return p.concat(l.plNote.trim() ? [l.plNote.trim()] : []).join(' / ');
  }
  function textPro() {
    const b = buildBilan(), l = b.l, out = [];
    KINDS.forEach((k) => b.worked.filter((t) => l.themes[t.id].kind === k).forEach((t) => out.push(`${k} ${themeText(t, l.themes[t.id])}`)));
    const errBlock = b.eLines.map((r) => r.txt).concat(b.elLines.map((r) => r.txt + ' (éliminatoire à l\'examen)')).concat(b.iLines.map((r) => r.txt));
    if (errBlock.length) { if (out.length) out.push(''); out.push(...errBlock); }
    if (b.later.length) out.push('', 'Repéré, pas encore travaillé : ' + b.later.map((r) => lc(r.txt)).join(', '));
    const pos = positives(b);
    if (pos.length) out.push('', 'Points positifs : ' + pos.join(', '));
    const pl = plText(l);
    if (pl) out.push('', 'Prochaine leçon : ' + pl);
    return out.join('\n').trim() || 'Rien de noté pour cette leçon.';
  }
  function textEleve() {
    const b = buildBilan(), l = b.l, out = ['Bilan de ta leçon :'];
    if (b.worked.length) out.push('', 'Aujourd\'hui : ' + b.worked.map((t) => lc(themeText(t, { opts: l.themes[t.id].opts }))).join(', ') + '.');
    const pos = positives(b);
    out.push('', pos.length ? 'Ce qui va bien : ' + pos.slice(0, 4).join(', ') + '.' : 'Merci pour ta leçon, on continue à progresser ensemble.');
    const top = b.eLines.slice(0, 3);
    if (top.length) { out.push('', 'À travailler :'); top.forEach((r, i) => out.push(`${i + 1}. ${r.txt.replace(/ ×(\d+)$/, ' ($1 fois)')}`)); }
    if (b.elLines.length) out.push('', 'Attention : ' + b.elLines.map((r) => lc(r.e.label)).join(', ') + '. À l\'examen, c\'est éliminatoire : on le retravaille en priorité.');
    const pl = plText(l);
    if (pl) out.push('', 'Prochaine leçon : ' + pl + '.');
    out.push('', 'Bonne continuation !');
    return out.join('\n');
  }
  async function copy(txt, msg) {
    try { await navigator.clipboard.writeText(txt); toast(msg); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(msg); } catch (x) { toast('Copie impossible'); } ta.remove(); }
  }
  function vBilan() {
    const b = buildBilan(), l = b.l;
    keepScroll = !!$app.querySelector('#pl-box');
    const plChips = THEME_GROUPS.map((g, i) => `<div class="sect" style="margin:8px 0 2px">${esc(g)}</div><div class="plchips">${THEMES.filter((t) => t.g === i).map((t) => `<button data-pl="${t.id}" aria-pressed="${l.pl.includes(t.id)}">${esc(uc(t.label))}</button>`).join('')}</div>`).join('');
    const lines = (arr) => arr.map((r) => `<div class="res"><div class="h"><span>${esc(r.e.label)}${r.sit ? ' — ' + esc(lc(r.sit)) : ''}</span><b>×${r.n}</b></div>${r.e.liens.length ? `<div class="s">${esc(detail(r.e))}</div>` : ''}</div>`).join('');
    const pos = positives(b);
    render(`
      <div class="row">${back('#lecon')}<div><h1 style="font-size:24px;font-weight:800">Bilan de leçon</h1><div class="small muted">${l.initials ? esc(l.initials) + ' · ' : ''}${l.worked.length} objectifs travaillés</div></div></div>
      ${b.worked.length ? `<div class="card"><h2>Travaillé</h2>${b.worked.map((t) => `<div class="res"><div class="h"><span>${esc(l.themes[t.id].kind)} ${esc(themeText(t, l.themes[t.id]))}</span></div></div>`).join('')}</div>` : `<a class="card" href="#travail" style="text-decoration:none;color:inherit">Rien de noté dans « Travaillé ». <b style="color:var(--blue-d)">Ajouter</b></a>`}
      ${pos.length ? `<div class="card" style="border:2px solid var(--blue)"><h2 style="color:var(--blue-d)">Points positifs</h2><div>${pos.map(esc).join(' · ')}</div></div>` : ''}
      ${b.eLines.length ? `<div class="card"><h2>Erreurs</h2>${lines(b.eLines)}</div>` : ''}
      ${b.elLines.length || b.iLines.length ? `<div class="card" style="border:2px solid var(--orange)"><h2 style="color:var(--orange-d)">Interventions et éliminatoires</h2>${lines(b.elLines.concat(b.iLines))}</div>` : ''}
      ${b.later.length ? `<div class="card" style="opacity:.85"><h2>Repéré, pas encore travaillé</h2>${lines(b.later)}</div>` : ''}
      <div class="card stack" id="pl-box"><h2>Prochaine leçon</h2>
        <details ${l.pl.length ? 'open' : ''}><summary>Choisir des thèmes${l.pl.length ? ' (' + l.pl.length + ')' : ''}</summary>${plChips}</details>
        <label for="pln" class="small muted">Note libre</label><textarea id="pln" class="input" rows="2" style="padding:10px 14px;min-height:64px">${esc(l.plNote)}</textarea></div>
      ${b.check.length ? `<div class="card"><h2>À cocher dans Suivi Drive</h2><div class="small muted">Aide uniquement : n'apparaît pas dans le texte copié.</div>${b.check.map(([o, tags]) => `<div class="res"><div class="h"><span>${cd(o)} ${esc(OBJ_BY[o].titre)}</span></div><div class="s"><b>${[...tags].join(', ')}</b></div></div>`).join('')}</div>` : ''}
      <div class="spacer stack">
        <button class="btn btn-primary" id="cpro">Copier pour Suivi Drive</button>
        <button class="btn btn-light" id="celv">Copier le message pour l'élève</button>
        <button class="btn btn-light" id="new" style="border-color:var(--orange);color:var(--orange-d)">Nouvelle leçon (remise à zéro)</button>
      </div>`);
    $app.querySelectorAll('[data-pl]').forEach((x) => x.addEventListener('click', () => { const id = x.dataset.pl; l.pl = l.pl.includes(id) ? l.pl.filter((y) => y !== id) : l.pl.concat(id); save(); vBilan(); }));
    $app.querySelector('#pln').addEventListener('input', (e) => { l.plNote = e.target.value; save(); });
    $app.querySelector('#cpro').addEventListener('click', () => copy(textPro(), 'Bilan copié'));
    $app.querySelector('#celv').addEventListener('click', () => copy(textEleve(), 'Message élève copié'));
    $app.querySelector('#new').addEventListener('click', () => {
      if (!confirm('Remettre à zéro et préparer une nouvelle leçon ?')) return;
      S.lesson = null; save(); draft = null; go('#setup');
    });
  }

  window.__releve = { textPro, textEleve };
  route();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(() => { /* */ }); });
  }
})();
