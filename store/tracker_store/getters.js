import { sum, weightedPlacementScore } from '../../lib/utils';

export default {
  currentPlayers({ players }) {
    const reversePlayers = [...players].reverse();
    return reversePlayers.slice(0, 3);
  },

  sortedGames({ games }) {
    return [...games].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  extendedScoreGames({ games }) {
    const scoreGames = games.map((game) => {
      const allKills = sum(game.scores, 'kills');
      const weightedScore = weightedPlacementScore(game.placement, allKills, true);

      return { ...game, allKills, weightedScore };
    });

    return scoreGames.sort((a, b) => b.weightedScore - a.weightedScore);
  },

  bestGames({ extendedScoreGames }) {
    return extendedScoreGames.slice(0, 10);
  },
};
