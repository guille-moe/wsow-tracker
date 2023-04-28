# WSOW Tracker

A manual tool to keep track of last game and preview score for WSoW 2023 rules

## Stack overview

  - FrontEnd:
    - Nuxt
    - Pinia (vue store)
    - Tailwind CSS
  - BackEnd (serverless):
    - Firestore DB

# Development

### Nuxt frontend:

To static web app using FireStore to sync data publicly

### Others

 - Docker is here to keep an easy, consistent project dev env
 - Nginx is used to route the Nuxt dev server

## Requirement

  - docker
  - docker-compose
  - a Firebase project and a Firestore DB (free)

## Setup

### Make sure you have the dev requirement:

```
./scripts/bootstrap
```

### Add a .env with variables from your [Firebase app](https://firebase.google.com/docs/web/learn-more?authuser=0#config-object)

```
FIREBASE_API_KEY=""
FIREBASE_AUTH_DOMAIN=""
FIREBASE_PROJECT_ID=""
FIREBASE_STORAGE_BUCKET=""
FIREBASE_MESSAGING_SENDER_ID=""
FIREBASE_APP_ID=""
```

### Run the full stack:
on http://localhost:8080


```
./scripts/server
```

### Add players

Initials collection of `players` in the FireStoreDB are mandatory and will be used to track scores.
note: WSoW 2023 teams are made of 3 players.

A typical `player` document: `{ name: "<Display Name>" }`

### Check DB rules

For now no rules/roles management are made, so you want to leave read and write rules open (see Cloud Firestore/Rules/Edit Rules).


## Deployment

The app can be deployed on any static host (Netlify, GitHub pages, FTPs...) since the app is 100% compatible with Nuxt3 SSG (Static site generation), only Firestore is used has a backend.

### How to build static assets

```
yarn generate
```

or with docker dev enc:

```
scripts/run_web yarn generate
```

### End !

All static can be found in the `dist` folder
