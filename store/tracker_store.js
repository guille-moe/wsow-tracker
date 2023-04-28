import { defineStore } from 'pinia';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import actions from './tracker_store/actions';
import getters from './tracker_store/getters';

const storeObj = {
  store: null,
};

const genStore = (cfg) => {
  // Initialize Firebase
  const firebase = initializeApp({
    apiKey: cfg.public.FIREBASE_API_KEY,
    authDomain: cfg.public.FIREBASE_AUTH_DOMAIN,
    projectId: cfg.public.FIREBASE_PROJECT_ID,
    storageBucket: cfg.public.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: cfg.public.FIREBASE_MESSAGING_SENDER_ID,
    appId: cfg.public.FIREBASE_APP_ID,
  });
  const db = getFirestore(firebase);

  const useStore = defineStore({
    id: 'tracker-store',
    state: () => ({
      players: [],
      games: [],
    }),

    actions: actions(db),
    getters,
  });

  storeObj.store = useStore();
  return storeObj.store;
};

const useStore = () => storeObj.store;

export const { store } = storeObj;
export { genStore, useStore };
