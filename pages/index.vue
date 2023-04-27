<template>
  <div class="flex items-center justify-center">
    WSOW Tracker
  </div>
</template>

<script setup>
import { genStore } from '../store/tracker_store';

const cfg = useRuntimeConfig(); // eslint-disable-line no-undef
const store = genStore(cfg);

store.getPlayers();
</script>
