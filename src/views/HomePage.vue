<template>
  <main class="mx-32 my-44">
    <section class="flex">
      <input
        type="text"
        placeholder="Your name here"
        v-model="name"
        class="py-3 px-2 border-b-2 border-gray-800 mr-4 active:border-0 focus:border-0"
      />
      <h2 class="font-exo font-bold text-gray-800 text-4xl">'s To-Do-List</h2>
    </section>
    <section class="grid grid-cols-4 gap-10 mt-16">
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
      <CategoryCard />
    </section>
  </main>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue';

export default {
  components: {
    CategoryCard,
  },
  data: () => {
    return {
      name: '',
    };
  },
};
</script>
