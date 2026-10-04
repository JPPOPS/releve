/* Référentiel des compétences (livret d'apprentissage B, tel qu'affiché dans Suivi Drive)
   et liste des erreurs du relevé, reliées à la grille d'examen et au référentiel.
   Pour ajouter / modifier une erreur : éditer ERREURS plus bas. */
window.REF = {
  C1: { titre: "Maîtriser le maniement du véhicule dans un trafic faible ou nul", objectifs: [
    ["Connaître les principaux organes et commandes du véhicule, effectuer des vérifications intérieures et extérieures", ["Connaître les principaux organes du véhicule", "Connaître les principales commandes et savoir les utiliser", "Savoir effectuer les vérifications intérieures et extérieures"]],
    ["Entrer, s'installer au poste de conduite et en sortir", ["Savoir effectuer les contrôles autour du véhicule", "Savoir entrer, s'installer et sortir du véhicule en sécurité", "Savoir installer les passagers, animaux et bagages", "Connaître l'importance du rôle de la ceinture"]],
    ["Tenir, tourner le volant et maintenir la trajectoire", ["Savoir tenir et tourner le volant en ligne droite, en virage", "Savoir regarder pour diriger le véhicule"]],
    ["Démarrer et s'arrêter", ["Savoir faire démarrer le véhicule sur terrain plat, en montée, en descente", "Savoir se déplacer à allure lente", "Savoir s'arrêter avec précision"]],
    ["Doser l'accélération et le freinage à diverses allures", ["Savoir doser l'accélération", "Savoir doser le freinage à diverses allures"]],
    ["Utiliser la boîte de vitesses", ["Savoir manipuler le levier sans le regarder", "Savoir monter les vitesses et rétrograder", "Savoir choisir le rapport de vitesse convenable", "Aller en circulation et faire démarrage en côte"]],
    ["Diriger la voiture en avant en ligne droite et en courbe en adaptant allure et trajectoire", ["Savoir maintenir une trajectoire rectiligne et en courbe à diverses allures"]],
    ["Regarder autour de soi et avertir", ["Connaître les angles morts", "Savoir regarder dans les rétroviseurs et avertir", "Avoir des notions sur la direction et la mobilité du regard"]],
    ["Effectuer une marche arrière et un demi-tour en sécurité", ["Savoir effectuer une marche arrière en sécurité", "Savoir effectuer un demi-tour en sécurité", "Savoir faire une marche arrière en ligne droite et en courbe"]]
  ]},
  C2: { titre: "Appréhender la route et circuler dans des conditions normales", objectifs: [
    ["Rechercher la signalisation, les indices utiles et en tenir compte", ["Savoir rechercher la signalisation et en tenir compte", "Savoir rechercher les indices utiles et en tenir compte"]],
    ["Positionner le véhicule sur la chaussée et choisir la voie de circulation", ["Savoir positionner le véhicule sur la chaussée", "Savoir choisir la voie de circulation"]],
    ["Adapter l'allure aux situations", ["Connaître la réglementation liée à la vitesse", "Savoir adapter l'allure aux situations"]],
    ["Tourner à droite et à gauche en agglomération", ["Savoir se placer pour tourner à droite ou à gauche", "Connaître et appliquer les règles de priorité avant de tourner", "Savoir tourner en tenant compte de la présence des autres usagers"]],
    ["Détecter, identifier et franchir les intersections suivant le régime de priorité", ["Connaître les différentes règles de priorité des intersections", "Savoir détecter, identifier et franchir les différents types d'intersection"]],
    ["Franchir les ronds-points et les carrefours à sens giratoire", ["Savoir franchir un rond-point", "Savoir franchir un carrefour à sens giratoire"]],
    ["S'arrêter et stationner en épi, en bataille et en créneau", ["Connaître la réglementation de l'arrêt et du stationnement", "Savoir se ranger en épi, en bataille, dans un créneau"]]
  ]},
  C3: { titre: "Circuler dans des conditions difficiles et partager la route avec les autres usagers", objectifs: [
    ["Évaluer et maintenir les distances de sécurité", ["Savoir évaluer et respecter les distances de sécurité", "Savoir évaluer les distances latéralement avant de croiser ou de dépasser"]],
    ["Croiser, dépasser, être dépassé", ["Connaître la réglementation concernant le croisement et le dépassement", "Savoir choisir le moment et l'endroit pour dépasser et pour se rabattre"]],
    ["Passer des virages et conduire en déclivité", ["Connaître la signalisation des virages", "Connaître les effets de l'énergie cinétique et de la force centrifuge", "Savoir adapter allure et trajectoire avant et pendant le virage", "Savoir conduire en déclivité"]],
    ["Connaître les caractéristiques des autres usagers et savoir se comporter à leur égard avec respect et courtoisie", ["Connaître les particularités des diverses catégories d'usagers et savoir en tenir compte : piétons, EDPM, deux-roues, transports en commun, véhicules lourds, véhicules agricoles", "Connaître les moyens de communiquer", "Savoir utiliser les moyens de communiquer"]],
    ["S'insérer, circuler et sortir d'une voie rapide", ["Savoir s'insérer sur une voie rapide", "Savoir circuler et dépasser sur voie rapide", "Savoir quitter une voie rapide"]],
    ["Conduire dans une file de véhicules et dans une circulation dense", ["Connaître les risques particuliers de la circulation dans une file", "Connaître les risques particuliers de la circulation dense", "Savoir conduire dans une file de véhicule", "Savoir conduire en circulation dense"]],
    ["Connaître les règles relatives à la circulation inter-files des motocyclistes. Savoir en tenir compte", ["Connaître les règles et les pratiques de la circulation interfile des motocyclistes", "Savoir circuler en tenant compte des motocyclistes"]],
    ["Conduire quand l'adhérence et la visibilité sont réduites", ["Connaître les risques de l'adhérence et de la visibilité réduite", "Savoir conduire quand l'adhérence est réduite", "Savoir conduire lorsque la visibilité est réduite", "Savoir utiliser les équipements du véhicule dans ces situations dégradées"]],
    ["Conduire à l'abord et dans la traversée d'ouvrages routiers tels que les tunnels, les ponts…", ["Connaître les dangers particuliers des zones de chantiers, tunnels, ponts", "Savoir adapter sa conduite à l'approche des zones de chantiers, tunnels, ponts"]]
  ]},
  C4: { titre: "Pratiquer une conduite autonome, sûre et économique", objectifs: [
    ["Suivre un itinéraire de manière autonome", ["Connaître et savoir interpréter la signalisation de direction", "Savoir suivre les directions", "Savoir utiliser une carte routière et un GPS"]],
    ["Préparer et effectuer un voyage longue distance en autonomie", ["Savoir préparer le véhicule et son chargement avant le voyage", "Savoir organiser les pauses et les temps de conduite"]],
    ["Connaître les principaux facteurs de risque au volant et les recommandations à appliquer", ["Connaître les risques liés aux produits stupéfiants, à l'alcool, la fatigue", "Connaître les risques liés aux distracteurs : téléphone, GPS, passagers"]],
    ["Connaître les comportements à adopter en cas d'accident : protéger, alerter, secourir", ["Savoir protéger", "Savoir alerter", "Savoir secourir"]],
    ["Faire l'expérience des aides à la conduite du véhicule (régulateur, limiteur de vitesse, ABS, aides à la navigation…)", ["Connaître le fonctionnement et savoir utiliser en roulant les différents équipements et aides à la conduite du véhicule"]],
    ["Avoir des notions sur l'entretien, le dépannage et les situations d'urgence", ["Savoir entretenir son véhicule", "Savoir changer une roue", "Savoir utiliser les équipements de sécurité : gilet de haute visibilité et triangle de présignalisation"]],
    ["Pratiquer l'écoconduite", ["Connaître les principes de la conduite économe", "Savoir appliquer les principes de la conduite économe"]]
  ]}
};

/* Cases de la grille d'examen */
window.GRILLE = {
  inst: "Installation et sécurité à bord", cmd: "Connaître et utiliser les commandes",
  info: "Prendre l'information", allure: "Adapter son allure", regl: "Appliquer la réglementation",
  comm: "Communiquer avec les autres usagers", chaussee: "Partager la chaussée", espaces: "Maintenir les espaces de sécurité",
  analyse: "Autonomie · analyse des situations", autonome: "Autonomie · conduite autonome", bonus: "Point bonus", hors: "Hors grille"
};

/* Erreurs du relevé.
   lien : [objectif, n° du « savoir » (à partir de 1)] — le 1er lien est l'objectif principal
          et fixe le niveau à partir duquel l'erreur est évaluée.
   bien : intitulé de la réussite (bouton ✓) · elim : éliminatoire à l'examen · plus : point positif · toujours : jamais grisée */
window.ERREURS = [
  { id: "inst", bien: "Installation complète", label: "Installation incomplète", grille: "inst", liens: [["C1-2", 2]] },
  { id: "calage", bien: "Démarrage sans caler", label: "Calage", grille: "cmd", liens: [["C1-4", 1]] },
  { id: "cote", bien: "Démarrage en côte réussi", label: "Démarrage en côte / recul", grille: "cmd", liens: [["C1-4", 1], ["C1-6", 4]] },
  { id: "arret", bien: "Arrêt précis", label: "Arrêt imprécis", grille: "cmd", liens: [["C1-4", 3]] },
  { id: "accel", bien: "Accélération dosée", label: "Accélération mal dosée", grille: "cmd", liens: [["C1-5", 1]] },
  { id: "frein", bien: "Freinage dosé", label: "Freinage brusque / tardif", grille: "cmd", liens: [["C1-5", 2]] },
  { id: "rapport", bien: "Bon rapport", label: "Mauvais rapport", grille: "cmd", liens: [["C1-6", 3], ["C1-6", 2]] },
  { id: "levier", bien: "Levier sans regarder", label: "Regarde le levier", grille: "cmd", liens: [["C1-6", 1]] },
  { id: "volant", bien: "Trajectoire tenue", label: "Volant / trajectoire", grille: "cmd", liens: [["C1-3", 1], ["C1-7", 1]] },
  { id: "regard", bien: "Regard loin", label: "Regard trop proche", grille: "info", liens: [["C1-3", 2], ["C1-8", 3]] },
  { id: "mar", bien: "Marche arrière / demi-tour réussi", label: "Marche arrière / demi-tour", grille: "cmd", liens: [["C1-9", 1], ["C1-9", 2]] },
  { id: "rangement", bien: "Rangement réussi", label: "Rangement (créneau, épi, bataille)", grille: "cmd", liens: [["C2-7", 2]] },

  { id: "angle", bien: "Angle mort contrôlé", label: "Angle mort oublié", grille: "info", liens: [["C1-8", 1]] },
  { id: "retro", bien: "Rétro contrôlé", label: "Rétro non contrôlé", grille: "info", liens: [["C1-8", 2]] },
  { id: "panneau", bien: "Indice formel vu", label: "Indice formel non vu", grille: "info", liens: [["C2-1", 1]] },
  { id: "indice", bien: "Indice informel pris en compte", label: "Indice informel non pris en compte", grille: "info", liens: [["C2-1", 2]] },
  { id: "inter", bien: "Intersection bien identifiée", label: "Intersection mal identifiée", grille: "info", liens: [["C2-5", 2]] },

  { id: "vite", bien: "Allure adaptée", label: "Trop vite pour la situation", grille: "allure", liens: [["C2-3", 2]] },
  { id: "lent", label: "Trop lent / hésitant", grille: "allure", liens: [["C2-3", 2]] },
  { id: "virage", bien: "Virage bien préparé", label: "Virage mal préparé", grille: "allure", liens: [["C3-3", 3]] },

  { id: "limit", bien: "Limitation respectée", label: "Limitation dépassée", grille: "regl", liens: [["C2-3", 1]] },
  { id: "stop", bien: "Stop respecté", label: "Stop non respecté", grille: "regl", liens: [["C2-5", 1]], elim: true },
  { id: "prio", bien: "Priorité respectée", label: "Priorité à droite / cédez-le-passage", grille: "regl", liens: [["C2-5", 1]], elim: true },
  { id: "feu", label: "Feu rouge", grille: "regl", liens: [["C2-1", 1]], elim: true },
  { id: "ligne", label: "Ligne continue", grille: "regl", liens: [["C2-2", 1]], elim: true },
  { id: "priotourne", bien: "Priorité respectée en tournant", label: "Priorité oubliée en tournant", grille: "regl", liens: [["C2-4", 2]] },

  { id: "cligno", bien: "Clignotant mis à temps", label: "Clignotant oublié", grille: "comm", liens: [["C1-8", 2]] },
  { id: "cligno2", label: "Clignotant tardif / mauvais côté / non annulé", grille: "comm", liens: [["C1-8", 2], ["C3-4", 3]] },

  { id: "placement", bien: "Bon placement", label: "Placement sur la chaussée", grille: "chaussee", liens: [["C2-2", 1]] },
  { id: "voie", bien: "Bonne voie", label: "Mauvais choix de voie", grille: "chaussee", liens: [["C2-2", 2]] },
  { id: "tourner", bien: "Bien placé pour tourner", label: "Placement pour tourner", grille: "chaussee", liens: [["C2-4", 1]] },
  { id: "giratoire", bien: "Giratoire réussi", label: "Giratoire (voie, trajectoire, sortie)", grille: "chaussee", liens: [["C2-6", 1], ["C2-6", 2]] },
  { id: "insertion", bien: "Insertion réussie", label: "Insertion / sortie de voie rapide", grille: "chaussee", liens: [["C3-5", 1], ["C3-5", 3]] },
  { id: "depass", bien: "Dépassement réussi", label: "Dépassement / rabattement", grille: "chaussee", liens: [["C3-2", 2]] },

  { id: "distance", bien: "Distance respectée", label: "Distance avec le véhicule devant", grille: "espaces", liens: [["C3-1", 1]] },
  { id: "lateral", bien: "Écart latéral respecté", label: "Écart latéral insuffisant", grille: "espaces", liens: [["C3-1", 2], ["C3-4", 1]] },

  { id: "anticip", bien: "Bonne anticipation", label: "Manque d'anticipation", grille: "analyse", liens: [["C2-1", 2]] },
  { id: "itin", bien: "Direction suivie", label: "Direction / itinéraire non suivi", grille: "autonome", liens: [["C4-1", 2]] },

  { id: "iv_volant", label: "Intervention volant", grille: "hors", liens: [], elim: true, toujours: true, inter: true },
  { id: "iv_pedales", label: "Intervention pédales", grille: "hors", liens: [], elim: true, toujours: true, inter: true },
  { id: "iv_verbale", label: "Intervention verbale", grille: "hors", liens: [], toujours: true, inter: true },
  { id: "courtoisie", label: "Courtoisie", grille: "bonus", liens: [["C3-4", 1]], plus: true, toujours: true },
  { id: "eco", label: "Conduite économe", grille: "bonus", liens: [["C4-7", 2]], plus: true, toujours: true }
];

/* Précisions proposées après chaque erreur (adaptées à l'erreur).
   Une erreur absente de cette liste reçoit les SITUATIONS générales. */
window.PRECISIONS = {
  inst: ["Siège", "Rétroviseurs", "Ceinture", "Appuie-tête", "Volant", "Portières", "Passagers"],
  calage: ["Démarrage à plat", "Démarrage en côte", "Arrêt stop / feu", "Intersection", "Changement de rapport", "Ralentissement", "Manœuvre"],
  cote: ["Recul", "Calage", "Frein à main", "Sur-régime", "Embrayage patiné"],
  arret: ["Trop tôt", "Ligne dépassée", "Stop", "Feu", "Passage piéton", "Repère annoncé", "Derrière un véhicule"],
  accel: ["À-coups au démarrage", "Sur-régime", "Trop timide", "En virage", "Insertion", "Reprise après ralentissement"],
  frein: ["Trop tardif", "Trop brusque", "Dans le virage", "Approche stop / feu", "Derrière un véhicule", "Pas dégressif"],
  rapport: ["Sous-régime", "Sur-régime", "Rétrogradage oublié", "Montée trop tôt", "1re oubliée", "En virage", "Saut de rapport"],
  levier: ["Montée de rapport", "Rétrogradage", "Point mort", "Marche arrière"],
  volant: ["Louvoiement ligne droite", "Virage", "Tourne-à-droite", "Tourne-à-gauche", "Giratoire", "Tenue des mains", "Manœuvre"],
  virage: ["Entrée trop rapide", "Freine dans le virage", "Trajectoire (corde coupée)", "Trop large", "Regard pas vers la sortie", "Virage masqué"],
  regard: ["Ligne droite", "Virage", "Intersection", "Giratoire", "Manœuvre"],
  mar: ["Contrôles oubliés", "Trajectoire", "Trop vite", "Mauvais repères", "Regard mal orienté", "Demi-tour"],
  rangement: ["Créneau", "Épi", "Bataille", "Contrôles oubliés", "Trop loin du trottoir", "Touche le trottoir", "Clignotant"],
  angle: ["Démarrage", "Changement de voie", "Dépassement", "Rabattement", "Tourne-à-droite (vélos)", "Tourne-à-gauche", "Insertion", "Sortie de giratoire", "Manœuvre"],
  retro: ["Avant de freiner", "Avant de ralentir", "Changement de direction", "Changement de voie", "Démarrage", "Arrêt / stationnement", "Giratoire", "Dépassement"],
  panneau: ["Stop", "Cédez-le-passage", "Limitation de vitesse", "Fin de limitation", "Sens interdit", "Interdiction de tourner", "Direction obligatoire", "Panneau de danger", "Feu tricolore", "Route prioritaire / AB", "Marquage au sol"],
  indice: ["Piéton", "Vélo / trottinette", "Roues qui tournent", "Moto", "Bus à l'arrêt", "Poids lourd", "Portière (stationnement)", "Sortie de garage / parking", "Enfant / ballon", "Véhicule prioritaire", "Feux stop devant", "Clignotant d'un usager"],
  inter: ["Priorité à droite", "Stop", "Cédez-le-passage", "Feu", "Giratoire", "Route prioritaire", "Intersection masquée"],
  vite: ["Approche d'intersection", "Virage", "Agglomération", "Zone 30", "Giratoire", "Passage piéton", "Ralentisseur", "Pluie / visibilité", "Croisement étroit"],
  lent: ["Insertion", "Voie rapide", "Hors agglomération", "Hésitation intersection", "Hésitation giratoire", "Fin de limitation", "Gêne la circulation"],
  limit: ["Zone 20", "Zone 30", "50", "70", "80", "90", "100", "110"],
  stop: ["Roues non arrêtées", "Arrêt sur la ligne", "Arrêt après la ligne", "Arrêt trop tôt", "Pas d'exploration", "Engagement sans priorité"],
  prio: ["Priorité à droite", "Cédez-le-passage", "Entrée de giratoire", "Piéton sur passage", "Véhicule prioritaire", "Sortie de parking / chemin"],
  feu: ["Rouge", "Orange franchi", "Flèche / feu clignotant"],
  ligne: ["Dépassement", "Tourne-à-gauche", "Évitement d'obstacle", "Virage coupé", "Giratoire"],
  priotourne: ["Piéton (à droite)", "Vélo (à droite)", "Véhicule en face (à gauche)", "Piéton (à gauche)"],
  cligno: ["Tourne-à-droite", "Tourne-à-gauche", "Changement de voie", "Sortie de giratoire", "Entrée de giratoire (à gauche)", "Démarrage", "Stationnement", "Dépassement", "Rabattement"],
  cligno2: ["Trop tard", "Mauvais côté", "Non annulé", "Trop tôt (ambigu)"],
  placement: ["Trop à droite", "Trop à gauche / centre", "Virage (corde coupée)", "Ligne droite", "Rue étroite", "Voie bus / vélo", "Après avoir tourné"],
  voie: ["Présélection", "Giratoire", "Voie bus / vélo", "Voie de gauche sans raison", "Voie rapide", "Sens unique"],
  tourner: ["Tourne-à-droite trop large", "Tourne-à-gauche pas au centre", "Tourne-à-gauche coupé", "Sens unique", "Rue étroite"],
  giratoire: ["Entrée (priorité)", "Mauvaise voie", "Trajectoire coupée", "Sortie (clignotant)", "Sortie (angle mort)", "Arrêt inutile", "Mauvaise sortie"],
  insertion: ["Vitesse trop faible", "Hésitation / arrêt", "Contrôles oubliés", "Clignotant", "Sortie : ralentit trop tôt", "Bretelle"],
  depass: ["Contrôles oubliés", "Écart latéral", "Rabattement trop tôt", "Visibilité insuffisante", "Vitesse", "Cycliste dépassé"],
  distance: ["En roulant (2 s)", "À l'arrêt (trop près)", "Pluie", "Voie rapide", "File / bouchon"],
  lateral: ["Cycliste", "Piéton", "Véhicule stationné", "Croisement", "Trottoir / bordure", "Obstacle"],
  anticip: ["Feu qui change", "Ralentissement devant", "Piéton qui traverse", "Bus qui démarre", "Intersection", "Panneau vu trop tard", "Bouchon"],
  itin: ["Panneau de direction", "Mauvaise présélection", "Sortie de giratoire ratée", "Consigne GPS", "Hésitation"],
  iv_volant: ["Trajectoire", "Bordure / trottoir", "Placement", "Priorité", "Angle mort / changement de voie", "Giratoire", "Croisement", "Manœuvre"],
  iv_pedales: ["Freinage tardif", "Stop", "Priorité", "Feu", "Piéton / vélo", "Distance de sécurité", "Vitesse excessive", "Recul en côte"],
  iv_verbale: ["Priorité", "Stop", "Angle mort", "Vitesse", "Direction", "Panneau", "Feu", "Piéton / vélo"]
};

/* Ordre de priorité pour remplir les gros boutons quand il manque des erreurs liées au niveau */
/* Situations proposées après une erreur (facultatif, pour préciser le bilan) */
window.SITUATIONS = ["Démarrage", "Ligne droite", "Virage", "Intersection", "Tourne-à-droite", "Tourne-à-gauche", "Giratoire", "Changement de voie", "Dépassement", "Manœuvre"];

window.PRIORITE = ["angle", "retro", "cligno", "placement", "calage", "vite", "tourner", "prio", "distance", "rapport", "volant", "frein"];

/* Thèmes travaillés pendant la leçon (partie « Travaillé aujourd'hui »).
   obj : objectifs du livret concernés (pour l'aide « à cocher dans Suivi Drive »)
   opts : détails proposés (manœuvres) */
window.THEME_GROUPS = ["Véhicule et commandes", "Observation", "Circulation", "Manœuvres", "Conditions difficiles", "Autonomie"];
window.KINDS = ["Vu", "Revu", "Continué", "Abordé"];
window.HOWS = ["en statique", "sur schéma", "en démonstration", "en double commande", "en circulation", "avec aide", "seul(e)"];
window.THEMES = [
  { id: "t_install", g: 0, label: "installation au poste de conduite", obj: ["C1-2"] },
  { id: "t_commandes", g: 0, label: "principales commandes", obj: ["C1-1"] },
  { id: "t_chaine", g: 0, label: "chaîne cinématique", obj: ["C1-4"] },
  { id: "t_pedalier", g: 0, label: "pédalier (placement des pieds)", obj: ["C1-1"] },
  { id: "t_regime", g: 0, label: "régime moteur", obj: ["C1-6"] },
  { id: "t_freinmoteur", g: 0, label: "frein moteur", obj: ["C1-5"] },
  { id: "t_rouelibre", g: 0, label: "roue libre", obj: ["C1-5"] },
  { id: "t_verifs", g: 0, label: "vérifications intérieures et extérieures", obj: ["C1-1"] },
  { id: "t_bvstat", g: 0, label: "boîte de vitesses en statique", obj: ["C1-6"] },
  { id: "t_montee", g: 0, label: "montée des rapports", obj: ["C1-6"], opts: { niveau: ["jusqu'en 3e", "jusqu'en 4e", "jusqu'en 5e", "jusqu'en 6e"] } },
  { id: "t_retro", g: 0, label: "rétrogradage", obj: ["C1-6"], opts: { niveau: ["3-2", "4-3-2", "5-4-3-2", "6 à 2"] } },
  { id: "t_bvratio", g: 0, label: "utilisation rationnelle de la boîte de vitesses", obj: ["C1-6"] },
  { id: "t_pp", g: 0, label: "point de patinage", obj: ["C1-4"] },
  { id: "t_demplat", g: 0, label: "démarrage sur le plat", obj: ["C1-4"] },
  { id: "t_demcotefa", g: 0, label: "démarrage en côte avec frein à main", obj: ["C1-4", "C1-6"] },
  { id: "t_demcote", g: 0, label: "démarrage en côte sans frein à main", obj: ["C1-4", "C1-6"] },
  { id: "t_demdesc", g: 0, label: "démarrage en descente", obj: ["C1-4"] },
  { id: "t_lente", g: 0, label: "allure lente", obj: ["C1-4"] },
  { id: "t_arret", g: 0, label: "arrêt de précision", obj: ["C1-4"] },
  { id: "t_dosage", g: 0, label: "dosage de l'accélération et du freinage", obj: ["C1-5"] },
  { id: "t_volant", g: 0, label: "techniques du volant", obj: ["C1-3"] },
  { id: "t_traj", g: 0, label: "trajectoires", obj: ["C1-7"] },
  { id: "t_vif", g: 1, label: "Vérifier, Informer, Faire (rétroviseurs, clignotant, angles morts)", obj: ["C1-8"] },
  { id: "t_regard", g: 1, label: "regarder loin et large", obj: ["C1-3"] },
  { id: "t_formels", g: 1, label: "indices formels (panneaux, feux, marquages)", obj: ["C2-1"] },
  { id: "t_informels", g: 1, label: "indices informels (piétons, roues qui tournent, feux stop…)", obj: ["C2-1"] },
  { id: "t_observation", g: 1, label: "observation", obj: ["C2-1"] },
  { id: "t_tournerd", g: 2, label: "tourner à droite", obj: ["C2-4"] },
  { id: "t_tournerg", g: 2, label: "tourner à gauche", obj: ["C2-4"] },
  { id: "t_priod", g: 2, label: "priorité à droite", obj: ["C2-5"] },
  { id: "t_stop", g: 2, label: "stop et cédez-le-passage", obj: ["C2-5"] },
  { id: "t_detect", g: 2, label: "détection des intersections", obj: ["C2-5"] },
  { id: "t_girs", g: 2, label: "giratoires simples", obj: ["C2-6"] },
  { id: "t_gird", g: 2, label: "giratoires doubles", obj: ["C2-6"] },
  { id: "t_placement", g: 2, label: "placement sur la chaussée", obj: ["C2-2"] },
  { id: "t_allure", g: 2, label: "adaptation de l'allure", obj: ["C2-3"] },
  { id: "t_virages", g: 2, label: "virages", obj: ["C3-3"] },
  { id: "t_mald", g: 3, label: "marche arrière en ligne droite", obj: ["C1-9"] },
  { id: "t_mac", g: 3, label: "marche arrière en courbe", obj: ["C1-9"], opts: { cote: ["à droite", "à gauche"] } },
  { id: "t_dt", g: 3, label: "demi-tour", obj: ["C1-9"] },
  { id: "t_creneau", g: 3, label: "créneau", obj: ["C2-7"], opts: { cote: ["droit", "gauche"], veh: ["avec véhicules", "sans véhicule"] } },
  { id: "t_bataille", g: 3, label: "rangement en bataille", obj: ["C2-7"], opts: { sens: ["avant", "arrière"], cote: ["droit", "gauche"], veh: ["avec véhicules", "sans véhicule"] } },
  { id: "t_epi", g: 3, label: "rangement en épi", obj: ["C2-7"], opts: { sens: ["avant", "arrière"], cote: ["droit", "gauche"], veh: ["avec véhicules", "sans véhicule"] } },
  { id: "t_vi", g: 4, label: "voie d'insertion", obj: ["C3-5"] },
  { id: "t_vd", g: 4, label: "voie de décélération / de sortie", obj: ["C3-5"] },
  { id: "t_chgvoie", g: 4, label: "changement de voie", obj: ["C2-2", "C1-8"] },
  { id: "t_depass", g: 4, label: "dépassement", obj: ["C3-2"] },
  { id: "t_crois", g: 4, label: "croisement", obj: ["C3-2"] },
  { id: "t_dense", g: 4, label: "circulation dense", obj: ["C3-6"] },
  { id: "t_dist", g: 4, label: "distances de sécurité", obj: ["C3-1"] },
  { id: "t_vuln", g: 4, label: "usagers vulnérables", obj: ["C3-4"] },
  { id: "t_comm", g: 5, label: "conduite commentée", obj: ["C2-1"] },
  { id: "t_auto", g: 5, label: "conduite autonome / itinéraire", obj: ["C4-1"] },
  { id: "t_eco", g: 5, label: "écoconduite", obj: ["C4-7"] },
  { id: "t_exblanc", g: 5, label: "examen blanc", obj: [] },
  { id: "t_bilan", g: 5, label: "bilan intermédiaire", obj: [] }
];
window.OPT_LABELS = { niveau: "Jusqu'où", sens: "Sens", cote: "Côté", veh: "Véhicules" };

/* Fiches explicatives (animation + schéma + texte), reliées aux thèmes et aux erreurs */
window.FICHES = {
  vif: { titre: "Vérifier, Informer, Faire", url: "fiches/vif.html", code: "C1.8",
    parts: [["Changement de voie", ""], ["Tourner à gauche après un arrêt", "#gauche"]] },
  chaine: { titre: "La chaîne cinématique", url: "fiches/chaine.html", code: "C1.4 · C1.5 · C1.6",
    parts: [["Moteur, embrayage, boîte, roues", ""], ["Point de patinage", "#patinage"], ["Régime moteur", "#regime"], ["Frein moteur", "#freinmoteur"], ["Roue libre", "#rouelibre"], ["Calage", "#calage"], ["Les pieds sur les pédales", "#pieds"], ["La grille de la boîte", "#boite"]] }
};
window.FICHE_DE = {
  t_vif: "vif", t_chgvoie: "vif",
  angle: "vif", retro: "vif", cligno: "vif", cligno2: "vif",
  t_tournerg: "vif#gauche", tourner: "vif#gauche",
  t_chaine: "chaine", t_pp: "chaine#patinage", t_demplat: "chaine#patinage", t_lente: "chaine#patinage", calage: "chaine#calage",
  t_regime: "chaine#regime", rapport: "chaine#regime", accel: "chaine#regime", t_montee: "chaine#regime",
  t_freinmoteur: "chaine#freinmoteur", t_rouelibre: "chaine#rouelibre",
  t_pedalier: "chaine#pieds", t_bvstat: "chaine#boite", levier: "chaine#boite"
};
