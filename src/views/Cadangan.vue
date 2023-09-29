<template>
  <main class="mx-36 my-32">
    <section class="user">
      <h2 class="font-exo font-bold text-gray-800 text-4xl">
        Good luck for today,
        <input
          type="text"
          placeholder="your name here"
          v-model="name"
          class="py-3 px-2 border-b-2 border-gray-800 mr-4 active:border-0 focus:border-0"
        />!
      </h2>
    </section>

    <section class="current_time">
      <h4>The current time shows</h4>
      <p class="date">{{ date }}</p>
      <p class="time">{{ time }}</p>
    </section>

    <section class="add-to-do">
      <h3>ADD A TO DO LIST</h3>

      <form @submit.prevent="addTask">
        <h4>What do you plan to do?</h4>
        <input
          type="text"
          placeholder="Ex. Punya pacar"
          v-model="content_input"
          class="border-gray-300 border-2 rounded-md px-3 py-2 shadow-md"
        />

        <h4>Select a category</h4>

        <div class="">
          <label v-for="category in categories" :key="category">
            <input
              type="radio"
              :name="'category-' + category"
              :value="category"
              v-model="category_input"
            />
            <span :class="`bubble ${category}`"></span>
            <div>{{ category }}</div>
          </label>
        </div>

        <div class="category">
          <label>
            <input
              type="radio"
              name="category"
              value="other"
              v-model="category_input"
            />
            <span class="bubble other"></span>
            <div>Other</div>
          </label>
          <input
            type="text"
            placeholder="Add a new category"
            v-model="category_custom"
            v-if="category_input === 'other'"
          />
          <button @click="addCategory">Add category</button>
        </div>

        <input type="submit" value="Add task" />
      </form>
    </section>

    <section class="todo-list">
      <h3>MY TO DO LIST</h3>

      <div class="list">
        <div
          v-for="task in sortedTodo"
          :class="`todo-item ${task.done && 'done'}`"
        >
          <label>
            <input type="checkbox" v-model="task.done" />
            <span :class="`bubble ${task.category}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="task.content" />
          </div>

          <div class="action">
            <button class="remove" @click="removeToDo(task)">Remove</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      todo: [], // initialize mt array for todo list
      name: '', // initialize mt string for user name
      content_input: '', // initialize mt string for todo content
      category_input: null, // null by default
      category_custom: '', // initilize mt string for custom category
      categories: ['Daily', 'Work'], // initial categories biar ga sepi aja
      date: '', // initialize mt string for date
      time: '', // initialize mt string for time
      week: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ], //
    };
  },
  computed: {
    sortedTodo() {
      return this.todo.slice().sort((a, b) => b.createdAt - a.createdAt);
    },
  },
  methods: {
    addCategory() {
      const newCategory = this.category_custom.trim();
      if (newCategory !== '' && !this.categories.includes(newCategory)) {
        this.categories.push(newCategory);
        this.category_input = newCategory;
        this.category_custom = '';
      }
    },
    addTask() {
      if (this.content_input.trim() === '' || this.category_input === null) {
        return;
      }

      const newToDo = {};

      if (
        this.category_input === 'other' &&
        this.category_custom.trim() !== ''
      ) {
        newToDo.category = this.category_custom.trim();
      } else {
        newToDo.category = this.category_input;
      }

      this.todo.push({
        content: this.content_input,
        category: this.category_input,
        done: false,
        createdAt: new Date().getTime(),
      });

      this.content_input = '';
    },
    removeToDo(task) {
      const index = this.todo.indexOf(task);
      if (index !== -1) {
        this.todo.splice(index, 1);
      }
    },
    updateTime() {
      const current_date = new Date();
      this.date =
        this.week[current_date.getDay()] +
        ', ' +
        this.zeroPadding(current_date.getDate(), 2) +
        ' - ' +
        this.zeroPadding(current_date.getMonth() + 1, 2) +
        ' - ' +
        this.zeroPadding(current_date.getFullYear(), 4) +
        ' ';

      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ':' +
        this.zeroPadding(current_date.getMinutes(), 2) +
        ':' +
        this.zeroPadding(current_date.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = '';
      for (let i = 0; i < digit; i++) {
        zero += '0';
      }
      return (zero + num).slice(-digit);
    },
  },
  mounted() {
    this.name = localStorage.getItem('name') || '';

    const storedTodo = JSON.parse(localStorage.getItem('todo'));
    if (Array.isArray(storedTodo)) {
      this.todo = storedTodo;
    }

    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
};
</script>
