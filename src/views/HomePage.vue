<template>
  <NavbarComponent />
  <main class="mx-32 my-10 font-poppins">
    <section class="flex">
      <input type="text" placeholder="Your name here" v-model="name"
        class="py-2 px-2 border-b-2 border-slate-800 mr-4 focus:outline-none text-4xl font-bold w-3/12 text-slate-800" />
      <h2 class="font-bold text-slate-800 text-4xl py-2">'s To-Do-List</h2>
    </section>
    <section class="flex flex-col gap-5">
      <h3 class="mt-12 font-medium text-4xl">Add new categories:</h3>
      <div class="flex gap-4">
        <input type="text" v-model="category_custom"
          class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" />
        <button @click="addCategory" class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-purple-500">
          Add
        </button>
      </div>
    </section>

    <h3 class="mt-12 mb-7 font-medium text-4xl">Categories:</h3>
    <section class="grid grid-cols-4 gap-10">
      <CategoryCard v-for="category in categories" :key="category" :categories="category" />
    </section>
  </main>
</template>

<script>
import CategoryCard from '../components/CategoryCard.vue';
import NavbarComponent from '../components/NavbarComponent.vue';

export default {
  components: {
    CategoryCard,
    NavbarComponent,
  },
  data: () => {
    return {
      name: '',
      category_custom: '',
      categories: ['Daily', 'Work'],
    };
  },

  methods: {
    addCategory() {
      if (this.category_custom.trim() === '' || this.categories.includes(this.category_custom.trim())) {
        return;
      }

      this.categories.push(this.category_custom.trim());

      localStorage.setItem('categories', JSON.stringify(this.categories));

      this.category_custom = '';
    },
  },
  mounted() {
    this.name = localStorage.getItem('name');

    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (Array.isArray(storedCategories)) {
      this.categories = storedCategories;
    }
  },
};
</script>
