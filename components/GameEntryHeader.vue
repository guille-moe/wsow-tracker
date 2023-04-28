<template>
  <div
    class="grid py-6"
    :style="gridStyle"
  >
    <div class="flex self-center justify-center text-lg font-semibold">
      Placement
    </div>
    <div
      v-for="player in store.currentPlayers"
      :key="player.id"
      class="flex self-center justify-center text-lg font-semibold"
    >
      {{ player.name }}
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      Kills
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      Score
    </div>
    <div class="flex self-center justify-center text-lg font-semibold">
      Actions
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from '../store/tracker_store';

const store = useStore();

const gridStyle = computed(() => ({
  'grid-template-columns': `repeat(${store.currentPlayers.length + 4}, minmax(0, 1fr))`,
}));
</script>
