<template>
  <main class="mx-32 my-20 font-poppins">
    <div class="flex justify-between items-center">
      <h1 class="font-bold text-slate-800 text-5xl py-2">{{ name }}</h1>
      <router-link to="/"
        ><button
          class="text-white font-medium text-xl px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
        >
          Back to home
        </button></router-link
      >
    </div>
    <section>
      <form @submit.prevent="addTask">
        <h3 class="mt-12 font-medium text-4xl mb-4">Add new task:</h3>
        <div class="flex gap-4">
          <input
            type="text"
            v-model="content_input"
            placeholder="e.g. pemweb dapet A"
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
          />
          <button
            @click="addTask"
            class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-green-500"
          >
            Add
          </button>
        </div>
      </form>
    </section>
    <section class="flex flex-col gap-4 mt-16">
      <h2 class="font-semibold text-4xl">{{ name }} Tasks</h2>
      <div class="flex-row gap-96">
        <div
          v-for="task in unfinishedTodo"
          :key="task.createdAt"
          :class="`todo-item ${task.done && 'done'}`"
          class="flex items-center gap-2 mb-4"
        >
          <!-- Render task details as before -->
          <p
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2"
          >
            {{ task.timestamp_date }}
          </p>
          <p
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2"
          >
            {{ task.timestamp_time }}
          </p>
          <input
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
            type="text"
            v-model="task.content"
          />
          <label class="relative">
            <input
              class="appearance-none bg-slate-200 p-5 rounded-xl w-56 cursor-pointer"
              type="checkbox"
              v-model="task.done"
            />
            <span
              class="font-medium text-xl absolute inset-0 flex items-center justify-center bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600 transition-all"
            >
              Task Completed
            </span>
          </label>
          <button
            @click="removeToDo(task)"
            class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
          >
            Remove
          </button>
        </div>

        <!-- buat kalo gaada task -->
        <div
          v-if="unfinishedTodo.length === 0"
          class="font-medium text-xl text-gray-600"
        >
          There's no task at the moment, santai dulu ga sih :V
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-5 mt-16">
      <h2 class="font-semibold text-4xl">Completed Tasks</h2>
      <div class="flex-row gap-3">
        <!-- Render completed tasks or a message if there are none -->
        <div
          v-if="completedTodo.length === 0"
          class="font-medium text-xl text-gray-600"
        >
          There's no completed task at the moment.
        </div>
        <div
          v-for="task in completedTodo"
          :key="task.createdAt"
          :class="`todo-item ${task.done && 'done'}`"
          class="flex items-center gap-2 mb-4"
        >
          <!-- Render task details as before -->
          <p
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2"
          >
            {{ task.timestamp_date }}
          </p>
          <p
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2"
          >
            {{ task.timestamp_time }}
          </p>
          <input
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-700 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
            type="text"
            v-model="task.content"
          />
          <label class="relative">
            <input
              class="appearance-none bg-slate-200 p-5 rounded-xl w-64 cursor-pointer"
              type="checkbox"
              v-model="task.done"
            />
            <span
              class="font-medium text-xl absolute inset-0 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-xl cursor-pointer transition-all"
            >
              Task Not Completed
            </span>
          </label>
          <button
            @click="removeToDo(task)"
            class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
          >
            Remove
          </button>
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
      content_input: '', // initialize mt string for todo content
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
      ],
      name: '', // name of the category
      categoryName: '',
    };
  },
  computed: {
    completedTodo() {
      return this.todo.filter(
        (task) => task.done && task.category === this.categoryName
      );
    },
    unfinishedTodo() {
      return this.todo.filter(
        (task) => !task.done && task.category === this.categoryName
      );
    },
  },
  methods: {
    addTask() {
      if (this.content_input.trim() === '') {
        return;
      }

      const newToDo = {
        content: this.content_input,
        done: false,
        createdAt: new Date().getTime(),
        timestamp_date: this.date,
        timestamp_time: this.time,
        category: this.categoryName, // Include the category name
      };

      this.todo.push(newToDo);

      localStorage.setItem('todo', JSON.stringify(this.todo));

      this.content_input = '';
    },

    removeToDo(task) {
      const index = this.todo.indexOf(task);
      if (index !== -1) {
        this.todo.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(this.todo));
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
  watch: {
    todo: {
      deep: true,
      handler(newTodo) {
        localStorage.setItem('todo', JSON.stringify(newTodo)); // Save the entire todo array to local storage
      },
    },
  },
  mounted() {
    const storedTodo = JSON.parse(localStorage.getItem('todo'));
    if (Array.isArray(storedTodo)) {
      this.todo = storedTodo;
    }

    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
  created() {
    this.categoryName = this.$route.params.categoryName;
    this.name = this.categoryName;
  },
};
</script>
