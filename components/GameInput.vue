<template>
  <input
    :value="value"
    type="text"
    class="px-1 text-center"
    @keydown="keyHandler"
    @input="changeValue"
  >
</template>

<script setup>
const emit = defineEmits(['input', 'enter']);
defineProps({
  value: {
    type: String,
    required: true,
  },
});

const keyHandler = (event) => {
  const { key } = event;
  if (key.length === 1) {
    if (!Number.isInteger(Number(key))) {
      event.preventDefault();
    }
  } else if (key === 'Enter') {
    emit('enter');
  }
};

const changeValue = ({ target: { value } }) => {
  emit('input', value);
};
</script>
