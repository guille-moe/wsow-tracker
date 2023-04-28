<template>
  <GameInput
    :value="props.kills"
    type="text"
    @input="inputScore"
    @enter="emit('enter')"
  />
</template>

<script setup>
const emit = defineEmits(['input', 'enter']);
const props = defineProps({
  playerId: {
    type: String,
    required: true,
  },
  kills: {
    type: String,
    default: '',
    required: false,
  },
});

const inputScore = (kills) => {
  emit('input', {
    player_id: props.playerId,
    kills,
  });
};
</script>
