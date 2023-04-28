import {
  collection, query, doc, getDocs, setDoc, deleteDoc, onSnapshot,
} from 'firebase/firestore';

const smartPush = (collection_arr, newDoc) => {
  const hasDoc = collection_arr.find((d) => d.id === newDoc.id);
  if (!hasDoc) {
    collection_arr.push(newDoc);
  }
};

let unsubGameListener = () => {};

export default function setupActions(db) {
  return {
    async getPlayers() {
      this.players = [];

      const playersQuery = query(collection(db, 'players'));
      const querySnapshot = await getDocs(playersQuery);

      querySnapshot.forEach((player) => {
        const { id } = player;
        this.players.push({ id, ...player.data() });
      });
    },

    async getGames() {
      this.games = [];

      const gameQuery = query(collection(db, 'games'));
      const querySnapshot = await getDocs(gameQuery);

      querySnapshot.forEach((game) => {
        const { id } = game;
        smartPush(this.games, { id, ...game.data() });
      });
    },

    async listenGames() {
      unsubGameListener();
      unsubGameListener = onSnapshot(collection(db, 'games'), (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const changedGame = { id: change.doc.id, ...change.doc.data() };

          if (change.type === 'added') {
            smartPush(this.games, changedGame);
          }
          if (change.type === 'modified') {
            const index = this.games.findIndex((g) => g.id === changedGame.id);
            this.games[index] = Object.assign(this.games[index], changedGame);
          }
          if (change.type === 'removed') {
            this.games = this.games.filter((g) => g.id !== changedGame.id);
          }
        });
      });
    },

    unlistenGames() {
      unsubGameListener();
    },

    async createGame(game) {
      await setDoc(doc(db, 'games', game.id), game);
      smartPush(this.games, game);
    },

    async updateGame(game) {
      await setDoc(doc(db, 'games', game.id), game);
      const index = this.games.findIndex((g) => g.id === game.id);
      this.games[index] = Object.assign(this.games[index], game);
    },

    async destroyGame(game) {
      await deleteDoc(doc(db, 'games', game.id));
      this.games = this.games.filter((g) => g.id !== game.id);
    },
  };
}
