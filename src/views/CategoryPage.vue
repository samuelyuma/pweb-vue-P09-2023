<template>
  <main class="mx-32 my-20 font-poppins">
    <h1 class="font-bold text-slate-800 text-5xl py-2">College</h1>
    <section class="flex flex-col gap-5">
      <h3 class="mt-12 font-medium text-4xl">Add new to-do-list:</h3>
      <div class="flex gap-4">
        <input
          type="text"
          class="w-auto border-2 border-slate-400 rounded-xl bg-slate-200 font-medium text-xl text-slate-600 px-3 py-2 focus:ring-0 focus:border-transparent focus:outline-slate-400"
        />
        <button
          class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-green-500"
        >
          Add
        </button>
      </div>
    </section>
    <section class="flex flex-col gap-5 mt-16">
      <h2 class="font-semibold text-4xl">College's To-Do-List</h2>
      <div class="flex gap-3">
        <!-- buat naruh tanggal, gatau pake apa ini, div ato apa -->
        <!-- buat naruh task -->
        <button
          class="text-white font-medium text-xl px-12 py-2 rounded-xl bg-red-500"
        >
          Remove
        </button>
      </div>
    </section>
  </main>
</template>

<script>
export default {};
</script>
