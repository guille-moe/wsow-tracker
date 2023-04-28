export default {
  currentPlayers({ players }) {
    const reversePlayers = [...players].reverse();
    return reversePlayers.slice(0, 3);
  },
};
