# WSOW Tracker

## Stack overview

  - FrontEnd:
    - Nuxt
    - Pinia (vue store)
    - Tailwind CSS
  - No BackEnd:
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
