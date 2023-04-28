<template>
  <component
    :is="assets[name]"
    :width="size"
    :height="size"
  />
</template>

<script setup>
/* eslint-disable import/no-unresolved */
import CalendarSVG from '~/assets/images/icons/calendar.svg';
import WorkersSVG from '~/assets/images/icons/workers.svg';
import AddWorkerSVG from '~/assets/images/icons/add_worker.svg';
import ChevronRightSVG from '~/assets/images/icons/chevron_right.svg';
import TrashSVG from '~/assets/images/icons/trash.svg';
import EditSVG from '~/assets/images/icons/edit.svg';
import SaveSVG from '~/assets/images/icons/save.svg';
import CloseSVG from '~/assets/images/icons/close.svg';
/* eslint-enable import/no-unresolved */

const assets = {
  calendar: CalendarSVG,
  workers: WorkersSVG,
  'add-worker': AddWorkerSVG,
  trash: TrashSVG,
  edit: EditSVG,
  save: SaveSVG,
  close: CloseSVG,
  'chevron-right': ChevronRightSVG,
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
