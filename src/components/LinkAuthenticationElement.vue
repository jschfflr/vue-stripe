<template>
  <div ref="mountPoint"/>
</template>

<script setup>
import { LINK_AUTHENTICATION_ELEMENT_TYPE as ELEMENT_TYPE  } from '../constants';
import { install, ref, toRef, watch, defineProps, defineExpose } from 'vue-demi';

install();

defineExpose({
  getElement,
});

const props = defineProps({
  elements: {
    type: Object,
  },
  options: {
    type: Object,
    default: () => ({}),
  },
});

const elements = toRef(props, 'elements');
const options = toRef(props, 'options');

const mountPoint = ref(null);
const element = ref(null);

watch(props, () => {
  init();
});

function init () {
  if (!elements.value) return;

  element.value = elements.value.create(ELEMENT_TYPE, options.value);
  element.value.mount(mountPoint.value);
};

async function getElement () {
  return elements.value.getElement(ELEMENT_TYPE);
};
</script>
