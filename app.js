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
  const savoirTxt = (l) => OBJ_BY[l[0]].savoirs[l[1] - 1] || OBJ_BY[l[0]].titre;

  // ---------- État ----------
  let S;
  function fresh() { return { hide: false, sit: true, custom: [], lesson: null }; }
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY)) || {}); } catch (e) { S = fresh(); }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* */ } }
  const L = () => S.lesson;
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
    const push = (e) => { if (e && !out.includes(e) && !e.plus && e.id !== 'interv' && isActive(e)) out.push(e); };
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
  function hideSit() { const b = document.querySelector('.sitbar'); if (b) b.remove(); clearTimeout(sitT); }
  function askSituation() {
    hideSit(); if (!S.sit) return;
    const bar = document.createElement('div'); bar.className = 'sitbar';
    bar.innerHTML = `<div class="small" style="font-weight:700">Situation ? <span class="muted" style="font-weight:400">(facultatif)</span></div><div class="chips">${SITUATIONS.map((s) => `<button data-s="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
    document.body.appendChild(bar);
    bar.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => {
      const l = L(), last = l.log[l.log.length - 1]; if (!last) return;
      last.sit = b.dataset.s; save(); hideSit(); toast(`${ERR_BY[last.id].label} · ${last.sit}`);
    }));
    sitT = setTimeout(hideSit, 6000);
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
    if (h === 'bilan') return vBilan();
    vLecon();
  }
  function render(html) { $app.innerHTML = html; window.scrollTo(0, 0); }
  const back = (to) => `<a class="icon-btn" href="${to}" aria-label="Retour"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></a>`;

  // ---------- Écran : préparer la leçon ----------
  let draft = null;
  function vSetup() {
    const cur = L();
    if (!draft) draft = { initials: cur ? cur.initials : '', worked: cur ? cur.worked.slice() : [], today: cur ? cur.today.slice() : [], mode: cur && cur.worked.length ? 'one' : 'upto', info: '' };
    const d = draft;
    const grid = Object.keys(REF).map((c) => `<div class="objrow"><span class="objc">${c}</span><div class="objchips">${OBJ.filter((o) => o.comp === c).map((o) => `<button class="oc ${d.worked.includes(o.id) ? 'on' : ''}" data-o="${o.id}" aria-pressed="${d.worked.includes(o.id)}" aria-label="${o.id} ${esc(o.titre)}">${o.n}</button>`).join('')}</div></div>`).join('');
    const objChecks = Object.keys(REF).map((c) => `<div class="sect" style="margin:10px 0 0">${c}</div>${OBJ.filter((o) => o.comp === c).map((o) => `<label><input type="checkbox" value="${o.id}" ${d.today.includes(o.id) ? 'checked' : ''}><span><b>${o.id}</b> ${esc(o.titre)}</span></label>`).join('')}`).join('');
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
        <div class="switch"><label for="sit" style="font-weight:700">Proposer la situation après une erreur</label><input type="checkbox" id="sit" ${S.sit ? 'checked' : ''}></div>
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
    $app.querySelectorAll('[data-o]').forEach((b) => b.addEventListener('click', () => {
      sync(); const o = OBJ_BY[b.dataset.o];
      if (d.mode === 'upto') { d.worked = OBJ.filter((x) => x.idx <= o.idx).map((x) => x.id); d.mode = 'one'; d.info = `Coché jusqu'à ${o.id} · ${o.titre}. Ajuste au besoin.`; }
      else if (d.worked.includes(o.id)) { d.worked = d.worked.filter((x) => x !== o.id); d.info = `Retiré : ${o.id} · ${o.titre}`; }
      else { d.worked.push(o.id); d.info = `Ajouté : ${o.id} · ${o.titre}`; }
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
    const opts = Object.keys(REF).map((c) => `<optgroup label="${c}">${OBJ.filter((o) => o.comp === c).map((o) => `<option value="${o.id}">${o.id} · ${esc(o.titre)}</option>`).join('')}</optgroup>`).join('');
    const gopts = Object.entries(GRILLE).filter(([k]) => !['bonus'].includes(k)).map(([k, v]) => `<option value="${k}">${esc(v)}</option>`).join('');
    render(`<div class="row">${back('#setup')}<h1 style="font-size:24px;font-weight:800">Mes erreurs</h1></div>
      <div class="small muted">Elles s'ajoutent à la liste, sont rattachées à l'objectif choisi et restent enregistrées sur ce téléphone.</div>
      ${S.custom.length ? `<div class="list">${S.custom.map((e) => `<div class="row-tap" style="cursor:default"><span class="lab">${esc(e.label)}<span class="ref">${e.liens[0][0]} · ${esc(GRILLE[e.grille])}${e.bien ? ' · ✓ ' + esc(e.bien) : ''}</span></span><button class="icon-btn" data-del="${e.id}" aria-label="Supprimer ${esc(e.label)}">✕</button></div>`).join('')}</div>` : ''}
      <div class="card stack">
        <b>Ajouter une erreur</b>
        <div class="field"><label for="pl">Intitulé de l'erreur</label><input id="pl" class="input" maxlength="40" placeholder="ex. Frein à main oublié"></div>
        <div class="field"><label for="pb">Intitulé de la réussite (facultatif)</label><input id="pb" class="input" maxlength="40" placeholder="ex. Frein à main desserré"></div>
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
      S.custom.push(e); save(); rebuild(); toast('Erreur ajoutée'); vPerso();
    });
  }

  // ---------- Écran : leçon en cours ----------
  function vLecon(hitId, hitKind) {
    const l = L(); if (!l) return vSetup();
    const total = Object.values(l.counts).reduce((a, b) => a + b, 0);
    const totalOk = Object.values(l.ok).reduce((a, b) => a + b, 0);
    const big = bigList();
    const last = l.log[l.log.length - 1];
    const lastTxt = last ? (last.kind === 'ok' ? '✓ ' + ERR_BY[last.id].bien : ERR_BY[last.id].label) + (last.sit ? ' · ' + last.sit : '') : '';
    const okBtn = (e, cls) => e.bien ? `<button class="${cls}" data-ok="${e.id}" aria-label="Bien : ${esc(e.bien)}"><span aria-hidden="true">✓</span><b>${l.ok[e.id] || 0}</b></button>` : '';
    const tile = (e) => {
      const n = l.counts[e.id] || 0;
      return `<div class="tile2 ${e.elim ? 'elim' : ''} ${hitId === e.id ? 'hit-' + hitKind : ''}">
        <button class="tap-err" data-id="${e.id}"><span class="lab">${esc(e.label)}</span><span class="foot"><span class="ref">${esc(e.liens.length ? e.liens[0][0] : 'Éliminatoire')}</span><span class="cnt ${n ? '' : 'zero'}">${n}</span></span></button>
        ${okBtn(e, 'tap-ok')}</div>`;
    };
    const groups = {};
    ALL.forEach((e) => { if (big.includes(e) || e.id === 'interv') return; const k = e.plus ? 'bonus' : e.grille; (groups[k] = groups[k] || []).push(e); });
    const rows = Object.keys(GRILLE).filter((k) => groups[k]).map((k) => {
      const items = groups[k].filter((e) => isActive(e) || !S.hide || l.off[e.id]);
      if (!items.length) return '';
      return `<div class="sect">${esc(GRILLE[k])}</div><div class="list">${items.map((e) => {
        const act = isActive(e), n = act ? (l.counts[e.id] || 0) : (l.off[e.id] || 0);
        return `<div class="row2 ${act ? '' : 'off'} ${!act && n ? 'hasoff' : ''}"><button class="row-tap" data-id="${e.id}" ${act ? '' : 'data-off="1"'}><span class="lab">${e.elim ? '⚠ ' : ''}${e.plus ? '✚ ' : ''}${esc(e.label)}<span class="ref">${esc(e.liens.length ? e.liens[0][0] : '')}${act ? '' : ' · non travaillé · appui long'}</span></span><span class="cnt ${n ? '' : 'zero'}">${n}</span></button>${act && !e.plus ? okBtn(e, 'row-ok') : ''}</div>`;
      }).join('')}</div>`;
    }).join('');
    render(`
      <div class="bar-top"><a class="pill" href="#setup">${l.initials ? esc(l.initials) + ' · ' : ''}${l.worked.length} obj.${l.today.length ? ' · ciblée' : ''}</a>
        <span class="total" aria-label="${total} erreurs, ${totalOk} réussites"><span style="color:var(--orange-d)">✗${total}</span> <span style="color:var(--blue-d)">✓${totalOk}</span></span>
        <a class="btn btn-dark" href="#bilan" style="width:auto;min-height:44px;padding:0 16px;font-size:15px">Bilan</a></div>
      <div class="undo"><span>${last ? 'Dernier : ' + esc(lastTxt) : 'Gauche : erreur · Droite : ✓ réussite'}</span><button id="undo" ${last ? '' : 'disabled'}>Annuler</button></div>
      <div class="big">${big.map(tile).join('')}${tile(ERR_BY.interv)}</div>
      <details ${S.openOthers ? 'open' : ''} id="others"><summary>Autres erreurs et points positifs</summary><div class="stack" style="gap:12px">${rows}</div></details>`);
    if (S.openOthers && hitId) { const el = $app.querySelector(`[data-id="${hitId}"]`); if (el && !big.includes(ERR_BY[hitId])) el.scrollIntoView({ block: 'center' }); }
    $app.querySelector('#undo').addEventListener('click', undo);
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

  // ---------- Bilan ----------
  const detail = (e) => e.liens.length ? `${e.liens[0][0]} · ${savoirTxt(e.liens[0])}` : '';
  function sitText(id, kind) {
    const m = {}; L().log.filter((x) => x.id === id && x.kind === kind && x.sit).forEach((x) => { m[x.sit] = (m[x.sit] || 0) + 1; });
    const p = Object.entries(m).sort((a, b) => b[1] - a[1]).map(([s, n]) => `${n} ${s.toLowerCase()}`);
    return p.length ? `dont ${p.join(', ')}` : '';
  }
  function buildBilan() {
    const l = L();
    const ids = new Set(Object.keys(l.counts).concat(Object.keys(l.ok)));
    const rows = [...ids].map((id) => ({ e: ERR_BY[id], n: l.counts[id] || 0, ok: l.ok[id] || 0 })).filter((r) => r.e);
    const errs = rows.filter((r) => r.n && !r.e.plus && !r.e.elim).sort((a, b) => b.n - a.n || a.ok - b.ok);
    const elims = rows.filter((r) => r.n && r.e.elim).sort((a, b) => b.n - a.n);
    const plus = rows.filter((r) => r.n && r.e.plus);
    const strong = rows.filter((r) => r.ok && r.ok > r.n && !r.e.plus).sort((a, b) => (b.ok - b.n) - (a.ok - a.n));
    const later = Object.entries(l.off).filter(([, n]) => n).map(([id, n]) => ({ e: ERR_BY[id], n })).filter((r) => r.e).sort((a, b) => b.n - a.n);
    const byObj = {};
    rows.forEach((r) => { if (!r.e.liens.length || r.e.plus) return; const o = r.e.liens[0][0]; byObj[o] = byObj[o] || { n: 0, ok: 0 }; byObj[o].n += r.n; byObj[o].ok += r.ok; });
    const objs = Object.entries(byObj).filter(([, v]) => v.n).sort((a, b) => b[1].n - a[1].n || OBJ_BY[a[0]].idx - OBJ_BY[b[0]].idx);
    return { l, errs, elims, plus, strong, later, objs };
  }
  const ratio = (r) => r.e.bien ? `✗${r.n} / ✓${r.ok}` : `×${r.n}`;
  function textPro() {
    const { l, errs, elims, plus, strong, later, objs } = buildBilan();
    const d = new Date().toLocaleDateString('fr-FR');
    const out = [`Bilan de leçon du ${d}${l.initials ? ' — ' + l.initials : ''}${l.today.length ? ' — leçon ciblée : ' + l.today.join(', ') : ''}`];
    if (strong.length) { out.push('', 'Points forts :'); strong.forEach((r) => out.push(`• ${r.e.bien} ✓${r.ok}${r.n ? ' (✗' + r.n + ')' : ''} → ${detail(r.e)}`)); }
    if (errs.length) {
      out.push('', 'Points à travailler :');
      errs.forEach((r) => { const s = sitText(r.e.id, 'err'); out.push(`• ${r.e.label} ${ratio(r)}${s ? ' (' + s + ')' : ''} → ${detail(r.e)} (grille : ${GRILLE[r.e.grille]})`); });
    } else if (!elims.length) out.push('', 'Aucune erreur relevée sur les compétences travaillées.');
    if (objs.length) { out.push('', 'Compétences à revoir :'); objs.forEach(([o, v]) => out.push(`• ${o} ${OBJ_BY[o].titre} (✗${v.n}${v.ok ? ' / ✓' + v.ok : ''})`)); }
    if (elims.length) { out.push('', 'Situations éliminatoires à l\'examen :'); elims.forEach((r) => { const s = sitText(r.e.id, 'err'); out.push(`• ${r.e.label} ×${r.n}${s ? ' (' + s + ')' : ''}`); }); }
    if (later.length) { out.push('', 'À venir, déjà repéré (non évalué) :'); later.forEach((r) => out.push(`• ${r.e.label} ×${r.n} → ${detail(r.e)}`)); }
    if (plus.length) out.push('', 'Points positifs : ' + plus.map((r) => r.e.label).join(', ') + '.');
    return out.join('\n');
  }
  function textEleve() {
    const { errs, elims, plus, strong } = buildBilan();
    const out = ['Bilan de ta leçon :'];
    const good = strong.slice(0, 3).map((r) => `${r.e.bien.toLowerCase()} (${r.ok} fois)`).concat(plus.map((r) => r.e.label.toLowerCase()));
    out.push('', good.length ? 'Ce qui va bien : ' + good.join(', ') + '.' : 'Merci pour ta leçon, on continue à progresser ensemble.');
    if (errs.length) {
      out.push('', 'À travailler pour la prochaine fois :');
      errs.slice(0, 3).forEach((r, i) => out.push(`${i + 1}. ${r.e.label} (${r.n} fois)${r.e.liens.length ? ' — ' + savoirTxt(r.e.liens[0]).replace(/^Savoir /, '').replace(/^./, (c) => c.toUpperCase()) : ''}`));
    }
    if (elims.length) out.push('', 'Attention : ' + elims.map((r) => `${r.e.label.toLowerCase()} (${r.n} fois)`).join(', ') + '. À l\'examen, c\'est éliminatoire, on le retravaille en priorité.');
    out.push('', 'Bonne continuation !');
    return out.join('\n');
  }
  async function copy(txt, msg) {
    try { await navigator.clipboard.writeText(txt); toast(msg); }
    catch (e) { const ta = document.createElement('textarea'); ta.value = txt; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); toast(msg); } catch (x) { toast('Copie impossible'); } ta.remove(); }
  }
  function vBilan() {
    const { l, errs, elims, plus, strong, later, objs } = buildBilan();
    const res = (arr, top) => arr.map((r, i) => { const s = sitText(r.e.id, 'err'); return `<div class="res ${top && i < 3 ? 'top' : ''}"><div class="h"><span>${esc(r.e.label)}</span><b>${esc(r.e.bien ? `✗${r.n} ✓${r.ok}` : '×' + r.n)}</b></div>${s ? `<div class="s"><b>${esc(s)}</b></div>` : ''}${r.e.liens.length ? `<div class="s">${esc(detail(r.e))}<br>Grille : ${esc(GRILLE[r.e.grille])}</div>` : ''}</div>`; }).join('');
    render(`
      <div class="row">${back('#lecon')}<div><h1 style="font-size:24px;font-weight:800">Bilan de leçon</h1><div class="small muted">${l.initials ? esc(l.initials) + ' · ' : ''}${l.worked.length} objectifs travaillés${l.today.length ? ' · ciblée ' + esc(l.today.join(', ')) : ''}</div></div></div>
      ${strong.length ? `<div class="card" style="border:2px solid var(--blue)"><h2 style="color:var(--blue-d)">Points forts</h2>${strong.map((r) => `<div class="res"><div class="h"><span>${esc(r.e.bien)}</span><b>✓${r.ok}${r.n ? ' ✗' + r.n : ''}</b></div><div class="s">${esc(detail(r.e))}</div></div>`).join('')}</div>` : ''}
      ${errs.length ? `<div class="card"><h2>Points à travailler</h2>${res(errs, true)}</div>` : '<div class="card">Aucune erreur relevée sur les compétences travaillées.</div>'}
      ${objs.length ? `<div class="card"><h2>Compétences à revoir</h2>${objs.map(([o, v]) => `<div class="res"><div class="h"><span>${o}</span><b>✗${v.n}${v.ok ? ' ✓' + v.ok : ''}</b></div><div class="s">${esc(OBJ_BY[o].titre)}</div></div>`).join('')}</div>` : ''}
      ${elims.length ? `<div class="card" style="border:2px solid var(--orange)"><h2 style="color:var(--orange-d)">⚠ Éliminatoire à l'examen</h2>${res(elims)}</div>` : ''}
      ${later.length ? `<div class="card" style="opacity:.85"><h2>À venir, déjà repéré</h2><div class="small muted">Non évalué : compétence pas encore travaillée.</div>${later.map((r) => `<div class="res"><div class="h"><span>${esc(r.e.label)}</span><b>×${r.n}</b></div><div class="s">${esc(detail(r.e))}</div></div>`).join('')}</div>` : ''}
      ${plus.length ? `<div class="card" style="border:2px solid var(--blue)"><h2 style="color:var(--blue-d)">✚ Points positifs</h2><div>${plus.map((r) => esc(r.e.label)).join(' · ')}</div></div>` : ''}
      <div class="spacer stack">
        <button class="btn btn-primary" id="cpro">Copier pour Suivi Drive</button>
        <button class="btn btn-light" id="celv">Copier le message pour l'élève</button>
        <button class="btn btn-light" id="new" style="border-color:var(--orange);color:var(--orange-d)">Nouvelle leçon (remise à zéro)</button>
      </div>`);
    $app.querySelector('#cpro').addEventListener('click', () => copy(textPro(), 'Bilan détaillé copié'));
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
