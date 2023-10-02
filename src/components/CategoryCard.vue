<template>
  <section
    class="w-full shadow-xl pb-full rounded-3xl bg-blue-500 px-9 py-7 font-poppins"
  >
    <div class="flex flex-col gap-40">
      <h1 class="text-white text-3xl font-semibold">{{ categories }}</h1>
      <div class="flex items-center justify-between">
        <p class="text-white text-xl font-medium">{{ taskCount }} notes</p>
        <button
          class="text-blue-500 bg-white font-semibold text-4xl rounded-full py-1 px-3"
        >
          +
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    categories: String,
    taskCount: Number,
  },
};
</script>
