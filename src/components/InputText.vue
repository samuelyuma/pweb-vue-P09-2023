<template>
  <section>
    <input
      type="text"
      class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
    />
  </section>
</template>

<script>
export default {
  props: {
    placeHolder: String,
  },
};
</script>
