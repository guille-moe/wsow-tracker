<template>
  <div class="flex items-center justify-center">
    <div class="sm:w-3/4 w-full mt-20 bg-black border border-green-600/25">
      <GameHeaderEntry class="border-b border-green-600/25" />
      <GameEntry class="border-b border-green-600/25" />
      <GameAggregateEntry class="bg-green-600 text-black" />
      <GameEntry
        v-for="game in store.sortedGames"
        :key="game.id"
        :game="game"
      />
      <GameHeaderEntry class="border-t border-green-600/25" />
    </div>
  </div>
</template>

<script setup>
import { genStore } from '../store/tracker_store';

const cfg = useRuntimeConfig(); // eslint-disable-line no-undef
const store = genStore(cfg);

store.getPlayers();
store.getGames();
store.listenGames();
</script>
