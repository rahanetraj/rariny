# Rariny — Contre la discrimination raciale à Madagascar

Site de sensibilisation et d'orientation contre la discrimination raciale à Madagascar. Aucun
compte utilisateur, aucun dépôt de plainte officiel : le site aide à comprendre le cadre légal,
génère un document PDF de signalement côté client, oriente vers l'institution compétente, et
publie des statistiques anonymisées et agrégées.

## Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4 — un seul projet full-stack (pages +
  routes API), le plus simple à déployer pour ce MVP.
- **PostgreSQL** (Neon recommandé) en production pour les statistiques agrégées uniquement ;
  **SQLite** en local pour le développement (aucune base à installer).
- **jsPDF** pour générer le document de signalement entièrement côté client — la description des
  faits et les coordonnées de contact ne transitent jamais par le serveur.
- **Recharts** pour les graphiques de l'Observatoire.
- **Panneau d'administration** (`/admin`) protégé par mot de passe unique, pour éditer sans
  redéploiement les références juridiques, les institutions et le texte des pages « Comprendre »
  (stockés en base, rendus via Markdown).

## Développement local

```bash
npm install
npm run dev
```

Le site tourne sur [http://localhost:3000](http://localhost:3000). Aucune variable
d'environnement n'est requise en local : une base SQLite est créée automatiquement dans
`.data/local.db` (ignorée par git) au premier signalement enregistré.

## Variables d'environnement

Voir `.env.example`. En production, définissez :

- `DATABASE_URL` — chaîne de connexion PostgreSQL (fournie par Neon). Si elle est absente, le site
  bascule sur SQLite — **à ne pas faire en production sur Vercel**, le système de fichiers y est
  éphémère et les statistiques seraient perdues à chaque déploiement.
- `ADMIN_PASSWORD` — mot de passe du panneau `/admin`. Obligatoire pour que l'administration
  fonctionne ; choisissez une valeur longue et aléatoire (c'est le seul secret protégeant
  l'édition du contenu du site).

## Panneau d'administration (`/admin`)

Permet d'éditer sans toucher au code :

- les **références juridiques** citées dans les encarts « Cadre légal cité » (créer, modifier,
  supprimer, associer à une ou plusieurs pages) ;
- les **coordonnées des 4 institutions** (CNIDH, Inspection du Travail, Police/Gendarmerie,
  Associations) ;
- le **texte des 5 pages « Comprendre »**, au format Markdown (`## Titre`, `**gras**`, `- liste`).

Authentification par mot de passe unique (`ADMIN_PASSWORD`), session de 12h via cookie signé —
pas de compte multi-utilisateur, adapté à un unique administrateur du site. Au premier accès,
les tables sont créées et pré-remplies automatiquement avec le contenu d'origine du site.

## Déploiement — Vercel + Neon

### 1. Créer la base de données (Neon)

1. Créez un compte sur [neon.tech](https://neon.tech) (offre gratuite suffisante pour ce MVP).
2. Créez un nouveau projet, une base de données.
3. Copiez la chaîne de connexion (`postgres://...`) depuis le tableau de bord — choisissez la
   version **pooled connection** si proposée (meilleure compatibilité avec les fonctions
   serverless de Vercel).

Le schéma (`report_entries`) est créé automatiquement par l'application au premier appel — aucune
migration manuelle n'est nécessaire pour ce MVP.

### 2. Déployer sur Vercel

**Option A — via l'interface web (la plus simple) :**

1. Poussez ce projet sur un dépôt GitHub/GitLab/Bitbucket.
2. Sur [vercel.com](https://vercel.com), « Add New Project » → importez le dépôt. Vercel détecte
   Next.js automatiquement, aucune configuration de build n'est nécessaire.
3. Dans « Environment Variables », ajoutez `DATABASE_URL` avec la chaîne de connexion Neon.
4. Déployez.

**Option B — via la CLI :**

```bash
npm install -g vercel
vercel login
vercel link
vercel env add DATABASE_URL production
vercel env add ADMIN_PASSWORD production
vercel --prod
```

### 3. Vérifications post-déploiement

- Soumettez un signalement de test sur le site déployé et vérifiez que `/observatoire` reflète
  bien l'incrément (le total s'affiche dès le premier signalement ; les répartitions par
  catégorie n'apparaissent qu'à partir de 5 signalements dans la même catégorie — c'est le
  comportement attendu, pas un bug).
- Vérifiez que le PDF se télécharge bien et qu'aucune information personnelle n'apparaît dans les
  requêtes réseau envoyées à `/api/reports` (uniquement type, région, contexte, mois, année).

## Ce que ce site n'est pas

- Ce n'est **pas** un dépôt de plainte officiel : le PDF généré est un support que l'utilisateur
  apporte lui-même à l'institution compétente.
- Ce n'est **pas** un avis juridique : le contenu juridique doit être vérifié périodiquement
  auprès de sources officielles (Journal Officiel de Madagascar).
