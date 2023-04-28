<template>
  <component
    :is="assets[name]"
    :width="size"
    :height="size"
  />
</template>

<script setup>
/* eslint-disable import/no-unresolved */
import TrashSVG from '~/assets/images/icons/trash.svg';
import SaveSVG from '~/assets/images/icons/save.svg';
import UndoSVG from '~/assets/images/icons/undo.svg';
/* eslint-enable import/no-unresolved */

const assets = {
  trash: TrashSVG,
  save: SaveSVG,
  undo: UndoSVG,
};

defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '16',
  },
});
</script>

<style lang="scss" scoped>
svg {
  fill: currentColor;
}
</style>
