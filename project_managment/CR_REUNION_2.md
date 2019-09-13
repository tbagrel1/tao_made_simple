# Réunion n°2

**Date** : jeudi 12 septembre 2019 (12:15 - 13:30)

## Participants## :

- T. ADAM
- T. BAGREL
- A. CESARI
- J. DUMAS

## Intervenants externes## :

- S. DA SILVA (client)
- Y. SEDDIKI (ingénieur)

## Ordre du jour## :

- Formulation du besoin
- Présentation du déroulement d'un examen
- Listage des fonctionnalités demandées
- Listage des incidents à prendre en compte
- Retours sur le schéma
- Méthode et rôles de Scrum

## Contenu de la réunion##

### Besoin### : avoir un tableau de bord pour le suivi d'une épreuve concours. Le tableau de bord doit comporter une interface simple d'utilisation, à destination de personnels non formés et non techniques.

### Précisions sur le fonctionnement de TAO### :

L'examen possède une heure d'ouverture et une heure de clôture. Pendant cette période de temps, un candidat peut se connecter et passer un examen. Il ne dispose cependant que d'une durée fixe de temps pour le réaliser : c'est le temps d'examen. Si ce temps l'amène à dépasser l'heure de clôture, alors l'examen est terminé. Ainsi, tous les participants disposent du même temps d'examen s'ils le lancent de telle sorte que, l'heure de clôture ne soit pas contenue dans le temps d'examen. Chaque candidat dispose donc d'un chronomètre qui indique le temps d'examen qui lui reste.

L'arrêt ou le retard de l'examen n'est pas envisageable. Dans le pire des cas, une nouvelle session d'examen est créée.

En cas de déconnexion à TAO (ou de perte de connexion à internet), le candidat reprend là où il s'était arrêté dans l'examen.

Un examen se décompose généralement en plusieurs phases (voir le fichier Powerpoint "Ordonnancement oraux. 6-8 jurys") :

- Le candidat s'enregistre auprès d'un acceuil, ce qui lui confère des identifiants de connexion (ID et MDP). Un numéro unique SCEI est généré pour désigner ce candidat.
- Le candidat se connecte sur une machine avec ses identifiants. En cas de problème, il le signal à un examinateur.
- Lorsque l'examen est ouvert, le candidat lance l'examen. Il dispose d'une plage de temps (généralement quelques minutes, mais cela dépend de l'examen) avant de lancer l'examen et de disposer de tout le temps consacré à sa réalisation.
- Lorsque le candidat a terminé de répondre aux questions et qu'il a validé l'examen ou que l'examen est clôturé, ce dernier est considéré comme terminé, et le candidat ne peut plus répondre aux questions. Il ne peut plus modifier ses réponses. Généralement, il reste dans la salle tant que l'examen n'est pas clôturé.
- Ses résultats l'examen peuvent être envoyés plus tard au candidat. Si le candidat a utilisé un compte de secours, la liaison entre les résultats de ce compte et le compte du candidat est effectuée après l'examen.

Un numéro SCEI unique est généré pour chaque candidat. Ce numéro permet de conserver l'anonymat du candidat. Ce numéro permet d'identifier ce candidat par l'examinateur et par le système TAO.

Dans TAO, un examen est placé dans un delivery, programmé à l'avance. Il contient notamment l'heure d'ouverture, l'heure de clôture et le temps d'examen. Il est affilié à un groupe de candidats. Le delivery est ensuite appelé lorsque l'examen est ouvert.

### Fonctionnalités demandées### :

1. Le seul bouton de contrôle de l'interface de supervision est le bouton "Démarrer" (ou "Start"). Il ne peut être activé qu'après l'heure de lancement de l'examen. Il doit disposer d'un petit décompte de temps avant de lancer l'examen (3 - 2 - 1 secondes, par exemple).

2. Un candidat doit être dans l'un des états suivants (qui possèdent chacun une erreur) :

  - Connecté, pas en examen.
  - Connecté, en examen.
  - Connecté, ayant fini l'examen Un candidat a terminé l'examen lorsqu'il a validé ses réponses ou que l'examen prend fin.
  - Déconnecté (les raisons de cet état ne sont pas demandées).

3. Un chronomètre qui indique le temps d'examen restant pour chaque candidat (heure, temps restant, temps écoulé, temps d'arrêt).

4. Un candidat absent doit être marqué en rouge. Étant donné les conditions vues dans la partie **Fonctionnalités demandées**, il s'agit soit d'un problème de connexion à TAO ou à internet, soit d'un abandon, soit d'une courte absence.

5. Les barres de recherche par ID, avancement des candidats, ... ne sont pas demandées.

6. Une fonction de filtrage par statut (connecté, déconnecté, ...) est démandé.

7. Afficher le SCEI comme identifiant des candidats.

8. L'examen ne doit en aucun cas pouvoir être stoppé, arrêté ou annulé depuis l'interface de supervision.

9. Une alerte doit survenir sur l'interface de supervision lorsqu'un candidat est déconnecté après ouverture de l'examen.

10. Afficher l'heure à laquelle le dernier candidat s'est connecté (heure de fin au plus tard, hormi clôture de l'examen).

11. L'état de tous les candidats doit être déterminé en moins d'une minute (30 secondes selon S. DA SILVA) sur l'interface de supervision. Autrement dit, lorsque l'examen est ouvert, tous les candidats doivent être connectés le plus rapidement possible, donc détecter au plus tôt les problèmes de connexion.

12. La récupération de l'adresse IP de la machine du candidat ou de son nom/prénom n'est pas utile. Le numéro SCEI ou son identifiant peuvent être utilisés.

13. Pour deux examens différents, qu'ils soient lancés simultanément ou non, il faut deux interface de supervision différentes.

14. Comme un examen classique sur TAO, l'examen doit se clôturer automatiquement.

### Retours sur le schéma### :

S. DA SILVA a approuvé le schéma réalisé au tableau lors de la dernière réunion. Mis à part pour ajouter et modifier les fonctionnalités demandées, il n'a pas été demandé de le modifier.

### À faire### :

1. Définir les rôles au sein de l'équipe (Scrum master, project owner, developers)

2. Identifier les user stories et les sous-tâches

3. Vérifier si, lorsqu'un candidat est déconnecté, son temps d'examen continue à être décompté.

4. Créer une nomenclature pour les identifiants des candidats, notamment pour les comptes de secours (par exemple, l'identifiant commence par "SEC_").

5. Identifier les différents problèmes de connexion/déconnexion. Par exemple, comment sait-on si un candidat perd sa connexion internet ? Dans le même sujet, creuser les problèmes qui peuvent survenir dans TAO.

6. Mettre en place un salon Discord pour échanger.

7. Réfléchir à comment réaliser la fonctionnalité #11.

8. Regarder le jeu de données et les tables de la base de données TAO.

## Documents fournis depuis la dernière réunion## :

- Jeu de données
- Document Powerpoint "Ordonnancement oraux. 6-8 jurys"

## Prochaine réunion## : mercredi 18 septembre 2019 (13:15 - 14:00)
