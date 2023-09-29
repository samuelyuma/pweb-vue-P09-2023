<template>
  <main class="mx-32 my-20 font-poppins">
    <section class="flex">
      <input
        type="text"
        placeholder="Your name here"
        v-model="name"
        class="py-3 px-2 border-b-2 border-gray-800 mr-4 active:border-0 focus:border-0"
      />
      <h2 class="font-exo font-bold text-gray-800 text-4xl">'s To-Do-List</h2>
    </section>
    <section class="flex flex-col gap-5">
      <h3 class="mt-12 font-medium text-4xl">Add new categories:</h3>
      <AddComponent />
    </section>

    <h3 class="mt-12 mb-7 font-medium text-4xl">Categories:</h3>
    <section class="grid grid-cols-4 gap-10">
      <CategoryCard categories="Daily" />
      <CategoryCard categories="Work" />
    </section>
  </main>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue';
import AddComponent from '../components/AddComponent.vue';

export default {
  components: {
    CategoryCard,
    AddComponent,
  },
  data: () => {
    return {
      name: '',
    };
  },
};
</script>
