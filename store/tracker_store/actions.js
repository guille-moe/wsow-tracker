import {
  collection, query, doc, getDocs, setDoc,
} from 'firebase/firestore';

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
        this.games.push({ id, ...game.data() });
      });
    },

    async createGame(game) {
      await setDoc(doc(db, 'games', game.id), game);
      this.games.push(game);
    },
  };
}
