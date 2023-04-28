<template>
  <div
    class="grid py-6"
    :style="gridStyle"
  >
    <div class="flex self-center justify-center text-lg font-semibold pr-3">
      ~{{ avgPlacement }}
    </div>
    <div
      v-for="player in store.currentPlayers"
      :key="player.id"
      class="flex self-center justify-center text-lg font-semibold"
    >
      {{ displayRound(bestSummary[player.id]) }}
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      {{ displayRound(bestSummary.allKills) }}
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      {{ displayRound(bestSummary.weightedScore) }}
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      -
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store/tracker_store';
import { sum, displayRound } from '../lib/utils';

const store = useStore();

const avgPlacement = computed(() => {
  const placementSum = sum(store.bestGames, 'placement');
  const rawAvg = placementSum / store.bestGames.length;
  return displayRound(rawAvg);
});

const bestSummary = computed(() => (
  store.bestGames.reduce((summary, game) => {
    summary.allKills += Number(game.allKills || '0');
    summary.weightedScore += Number(game.weightedScore || '0');

    game.scores.forEach((score) => {
      summary[score.player_id] = (summary[score.player_id] || 0) + Number(score.kills || '0');
    });

    return summary;
  }, {
    placement: 0,
    allKills: 0,
    weightedScore: 0,
  })
));

const gridStyle = computed(() => ({
  'grid-template-columns': `repeat(${store.currentPlayers.length + 4}, minmax(0, 1fr))`,
}));
</script>
