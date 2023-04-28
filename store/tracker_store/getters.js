export default {
  currentPlayers({ players }) {
    const reversePlayers = [...players].reverse();
    return reversePlayers.slice(0, 3);
  },

  sortedGames({ games }) {
    return [...games].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },
};
