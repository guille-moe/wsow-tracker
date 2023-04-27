import {
  collection, query, getDocs,
} from 'firebase/firestore';

export default function setupActions(db) {
  return {
    async getPlayers() {
      this.players = [];

      const playersQuery = query(collection(db, 'players'));
      const querySnapshot = await getDocs(playersQuery);

      querySnapshot.forEach((doc) => {
        const { id } = doc;
        this.players.push({ id, ...doc.data() });
      });
    },
  };
}
