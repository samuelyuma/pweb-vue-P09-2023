<template>
  <main class="mx-32 my-20 font-poppins">
    <h1 class="font-bold text-slate-800 text-5xl py-2">College</h1>
    <section class="flex flex-col gap-5">
      <form @submit.prevent="addTask">
        <h3 class="mt-12 font-medium text-4xl">Add new task:</h3>
        <div class="flex gap-4">
          <input type="text" v-model="content_input" placeholder="e.g. pemweb dapet A"
            class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400" />
          <button @click="addTask" class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-green-500">
            Add
          </button>
        </div>
      </form>
    </section>
    <section class="flex flex-col gap-5 mt-16">
      <h2 class="font-semibold text-4xl">College's tasks</h2>
      <div class="flex gap-3">
        <div v-for="task in unfinishedTodo" :key="task.createdAt" :class="`todo-item ${task.done && 'done'}`">
          <!-- Render task details as before -->
          <label>
            <input type="checkbox" v-model="task.done" />
          </label>
          <input type="text" v-model="task.content" />
          <p>{{ task.timestamp_date }}</p>
          <p>{{ task.timestamp_time }}</p>
          <button @click="removeToDo(task)" class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-red-500">
            Remove
          </button>
        </div>

        <!-- buat kalo gaada task -->
        <div v-if="unfinishedTodo.length === 0" class="font-medium text-xl text-gray-600">
          There's no task at the moment, santai dulu ga sih C;
        </div>
      </div>
    </section>

    <section class="flex flex-col gap-5 mt-16">
      <h2 class="font-semibold text-4xl">Completed Tasks</h2>
      <div class="flex gap-3">
        <!-- Render completed tasks or a message if there are none -->
        <div v-if="completedTodo.length === 0" class="font-medium text-xl text-gray-600">
          There's no completed task at the moment.
        </div>
        <div v-for="task in completedTodo" :key="task.createdAt" :class="`todo-item ${task.done && 'done'}`">
          <!-- Render task details as before -->
          <label>
            <input type="checkbox" v-model="task.done" />
          </label>
          <input type="text" v-model="task.content" />
          <p>{{ task.timestamp_date }}</p>
          <p>{{ task.timestamp_time }}</p>
          <button @click="removeToDo(task)" class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-red-500">
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
    };
  },
  computed: {
    completedTodo() {
      return this.todo.filter(task => task.done);
    },
    unfinishedTodo() {
      return this.todo.filter(task => !task.done);
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
};
</script>
