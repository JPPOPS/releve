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
  { id: "panneau", bien: "Signalisation vue", label: "Panneau / feu non vu", grille: "info", liens: [["C2-1", 1]] },
  { id: "indice", bien: "Indice pris en compte", label: "Indice ignoré (piéton, bus…)", grille: "info", liens: [["C2-1", 2]] },
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

  { id: "interv", label: "Intervention du moniteur", grille: "hors", liens: [], elim: true, toujours: true },
  { id: "courtoisie", label: "Courtoisie", grille: "bonus", liens: [["C3-4", 1]], plus: true, toujours: true },
  { id: "eco", label: "Conduite économe", grille: "bonus", liens: [["C4-7", 2]], plus: true, toujours: true }
];

/* Ordre de priorité pour remplir les gros boutons quand il manque des erreurs liées au niveau */
/* Situations proposées après une erreur (facultatif, pour préciser le bilan) */
window.SITUATIONS = ["Démarrage", "Ligne droite", "Virage", "Intersection", "Tourne-à-droite", "Tourne-à-gauche", "Giratoire", "Changement de voie", "Dépassement", "Manœuvre"];

window.PRIORITE = ["angle", "retro", "cligno", "placement", "calage", "vite", "tourner", "prio", "distance", "rapport", "volant", "frein"];
