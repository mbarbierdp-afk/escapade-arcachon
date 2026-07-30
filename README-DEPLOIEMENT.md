# Escapade Arcachon — guide de mise en ligne

Ce dossier contient ton site complet, prêt à héberger gratuitement (ou presque).
Voici les étapes, dans l'ordre. Compte environ 30-45 minutes la première fois.

## 1. Créer un compte GitHub (gratuit)

GitHub va simplement stocker les fichiers de ton site.

1. Va sur https://github.com et crée un compte gratuit.
2. Clique sur "New repository" (nouveau dépôt).
3. Nomme-le par exemple `escapade-arcachon`, laisse-le en "Public" ou "Private", ne coche aucune case, clique "Create repository".
4. Sur la page du dépôt vide, clique sur le lien "uploading an existing file".
5. Glisse-dépose TOUT le contenu de ce dossier (pas le dossier lui-même, mais tout ce qu'il y a dedans : index.html, css, js, images, admin, content, netlify.toml) et clique "Commit changes".

## 2. Créer un compte Netlify (gratuit) et connecter le site

1. Va sur https://www.netlify.com et crée un compte gratuit (tu peux te connecter directement avec ton compte GitHub, c'est plus simple).
2. Clique sur "Add new site" → "Import an existing project" → "GitHub".
3. Choisis le dépôt `escapade-arcachon` que tu viens de créer.
4. Laisse les réglages par défaut (dossier de publication = racine) et clique "Deploy".
5. Après 1-2 minutes, ton site est en ligne sur une adresse du type `nom-au-hasard.netlify.app`. Clique dessus pour vérifier que tout s'affiche bien.

## 3. Activer le formulaire de réservation

Netlify détecte automatiquement le formulaire du site. Il ne reste qu'à choisir où recevoir les demandes :

1. Dans Netlify, va dans ton site → **Site configuration** → **Forms**.
2. Dans "Form notifications", clique "Add notification" → "Email notification".
3. Indique **marjorie.bonadei@gmail.com** et valide.

Désormais, chaque demande de réservation envoyée depuis le site t'arrivera par email.

## 4. Activer ton espace admin (pour gérer les disponibilités toi-même)

1. Dans Netlify : **Site configuration** → **Identity** → clique "Enable Identity".
2. Toujours dans Identity, section "Registration", choisis "Invite only" (pour que seule toi puisse créer un compte).
3. Descends à "Services" → "Git Gateway" → clique "Enable Git Gateway".
4. Retourne dans l'onglet **Identity**, clique "Invite users", entre ton adresse email, et valide. Tu recevras un email pour définir ton mot de passe.
5. Une fois ton mot de passe défini, va sur `https://TON-SITE.netlify.app/admin/` et connecte-toi.

Tu arrives sur un petit tableau de bord "Disponibilités" : tu peux y ajouter, modifier ou supprimer les périodes réservées (date d'arrivée / date de départ). Chaque enregistrement met à jour le calendrier du site automatiquement, en 1-2 minutes.

## 5. Acheter le nom de domaine et le relier

1. Achète `escapade-arcachon.fr` (ou le nom que tu préfères) chez un registrar comme OVH, Gandi ou Ionos (environ 10-15 €/an).
2. Dans Netlify : **Site configuration** → **Domain management** → "Add a domain" → entre ton nom de domaine.
3. Netlify t'indique les enregistrements DNS à renseigner (en général deux lignes à copier-coller). Va les ajouter dans l'espace client de ton registrar, section "Zone DNS".
4. La mise à jour peut prendre de quelques minutes à 24h. Netlify active automatiquement un certificat de sécurité (https) une fois le domaine reconnu.

## 6. Faire pointer ta fiche Google vers le site

Une fois le nom de domaine actif :

1. Va sur ta fiche Google Business Profile du bien (ou demande l'accès si ce n'est pas encore fait).
2. Dans les informations du profil, ajoute ou modifie le champ "Site web" avec ton adresse (ex : `https://escapade-arcachon.fr`).

## Pour mettre à jour les photos ou les textes plus tard

- **Disponibilités** : via `/admin/`, comme expliqué ci-dessus — pas besoin de moi.
- **Photos, textes, tarifs** : reviens vers moi avec ce que tu veux changer, je te fournirai les fichiers mis à jour à re-glisser sur GitHub (Netlify republie automatiquement à chaque mise à jour des fichiers).

## Récapitulatif des coûts

| Poste | Coût |
|---|---|
| Hébergement Netlify | Gratuit (largement suffisant pour ce site) |
| Espace admin (Identity + Git Gateway) | Gratuit |
| Formulaire de réservation | Gratuit (jusqu'à 100 soumissions/mois) |
| Nom de domaine `escapade-arcachon.fr` | ~10-15 €/an |
