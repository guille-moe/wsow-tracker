<template>
  <div
    class="grid py-6"
    :style="gridStyle"
  >
    <div
      class="flex self-center justify-center text-lg font-semibold overflow-hidden px-1"
      title="Placement"
    >
      {{ isWide ? 'Placement' : 'P.' }}
    </div>
    <div
      v-for="player in store.currentPlayers"
      :key="player.id"
      class="flex self-center justify-center text-lg font-semibold truncate px-1"
      :title="player.name"
    >
      <span>
        {{ isWide ? player.name : `${player.name.slice(0, 3)}.` }}
      </span>
    </div>
    <div
      class="flex self-center justify-center text-lg font-semibold truncate px-1"
      title="Kills"
    >
      {{ isWide ? 'Kills' : 'K.' }}
    </div>
    <div
      class="flex self-center justify-center text-lg font-semibold truncate px-1"
      title="Score"
    >
      {{ isWide ? 'Score' : 'S.' }}
    </div>
    <div
      class="flex self-center justify-center text-lg font-semibold truncate px-1"
      title="Actions"
    >
      {{ isWide ? 'Actions' : 'A.' }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../store/tracker_store';

const store = useStore();

const gridStyle = computed(() => ({
  'grid-template-columns': `repeat(${store.currentPlayers.length + 4}, minmax(0, 1fr))`,
}));

const isWide = ref(true);

if (process.client) {
  const wideQuery = matchMedia('(min-width: 640px)');
  isWide.value = wideQuery.matches;

  wideQuery.addEventListener('change', () => {
    isWide.value = wideQuery.matches;
  });
}
</script>
