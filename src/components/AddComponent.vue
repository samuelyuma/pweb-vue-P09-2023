<template>
  <section class="flex gap-4">
    <InputText />
    <AddRemoveButton class="bg-purple-500" />
  </section>
</template>

<script>
import AddRemoveButton from './AddRemoveButton.vue';
import InputText from './InputText.vue';

export default {
  components: {
    AddRemoveButton,
    InputText,
  },
};
</script>
