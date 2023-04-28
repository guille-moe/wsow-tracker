<template>
  <div class="flex items-center justify-center">
    <div class="w-3/4 mt-20 bg-black border border-green-600/25">
      <GameEntryHeader class="border-b border-green-600/25" />
      <GameEntry />
      <GameEntryHeader class="border-t border-green-600/25" />
    </div>
  </div>
</template>

<script setup>
import { genStore } from '../store/tracker_store';

const cfg = useRuntimeConfig(); // eslint-disable-line no-undef
const store = genStore(cfg);

store.getPlayers();
</script>
