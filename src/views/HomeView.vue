<script setup>
import { reactive, ref } from 'vue';



const tasks = ref([])

const filters = ref([
  { name: "All", value: 'all', selected: true },
  { name: "Completed", value: 'completed', selected: false },
  { name: "Incomplete", value: 'incomplete', selected: false },
]);

// function focusItem(index) {
//   if (!this.tasks[index].open) {
//     for (let i = 0; i < this.tasks.length; i++) {
//       this.tasks[i].open = false;
//       this.tasks[i].focused = i == index;
//     }
//   }
// }

function openItem(index) {
  if (!this.tasks[index].open) {

    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].focused = false;
      this.tasks[i].open = i == index;
    }
    setTimeout(() => document.getElementById(`titleField${index}`).focus(), 10);
  }
}

function filterTasks(filter) {

}

function defocusItem(i) {
  const task = this.tasks[i];
  if (!task.title && !task.id) {
    this.tasks.splice(i, 1);

  } else {
    this.tasks[i].focused = false;
    this.tasks[i].open = false;
  }
}

// function removeItem(index) {
//   this.tasks = this.tasks.filter((todo, i) => {
//     return i == index ? false : true;
//   });
// }

function addItem() {
  this.tasks.push({
    title: '',
    description: '',
    completed: false,
    focused: false,
    open: false
  });
  setTimeout(() => this.openItem(this.tasks.length - 1), 10);
}

</script>




<template>
  <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
    <div class="w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300"
      style="max-width: 800px">
      <div class="mb-10 flex justify-between">
        <h1 class="text-2xl font-bold">
          Tasks</h1>
        <div>

          <span class="mr-3 cursor-pointer" :class="{'text-gray-400': filter.selected}"  v-for="filter in filters" @click="filterTasks(filter.value)">
            {{ filter.name }}
          </span>
        </div>
      </div>
      <div class="mb-10">
        <div v-if="tasks.length">
          <ul class="-mx-1">
            <template v-for="(item, index) in tasks" :key="index">
              <li class="px-2 py-2 rounded transition-all flex text-md"
                :class="{ 'bg-indigo-800': item.focused, 'bg-gray-700 shadow-lg px-4 py-4 my-10 -mx-2': item.open, 'mb-1 cursor-pointer': !item.open }">
                <div class="flex-none w-10 leading-none">
                  <input type="checkbox" :checked="item.completed" @click="item.completed = !item.completed">
                </div>
                <div class="flex-grow max-w-full">
                  <div class="w-full leading-none" @click="openItem(index)">
                    <h3 class="text-md leading-none truncate w-full pr-10"
                      :class="item.title.length ? 'text-gray-300' : 'text-gray-500'" v-text="item.title || 'New task...'"
                      v-show="!item.open"></h3>
                    <input type="text" v-show="item.open"
                      class="text-md w-full bg-transparent text-gray-300 leading-none focus:outline-none mb-2"
                      v-model="item.title" :id="`titleField${index}`" placeholder="New task..." />
                  </div>
                  <div class="w-full" v-show="item.open">
                    <textarea class="text-md w-full bg-transparent text-gray-300 leading-tight focus:outline-none"
                      rows="10" v-model="item.description" placeholder="Description"></textarea>
                  </div>
                  <div class="w-full flex gap-3 justify-end" v-show="item.open">
                    <button @click="defocusItem(index)"
                      class="px-3 py-1 -mr-1 bg-gray-600 focus:outline-none rounded-md hover:bg-gray-500 text-white">
                      Cancel
                    </button>
                    <button
                      class="px-3 py-1 -mr-1 bg-green-600 focus:outline-none rounded-md hover:bg-green-500 text-white">
                      Save
                      <i class="mdi mdi-check"></i></button>
                    <!-- <button class="p-1 -mr-1 focus:outline-none hover:text-red-300" @click="removeItem(index)"><i
                        class="mdi mdi-trash-can-outline"></i></button> -->
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div v-if="!tasks.length">
          <p class="text-gray-500">No tasks</p>
        </div>
      </div>
      <div class="flex justify-center">
        <button
          class="py-1 px-10 border border-gray-800 hover:border-gray-700 rounded leading-none focus:outline-none text-xl"
          @click="addItem()"><i class="mdi mdi-plus"></i></button>
      </div>
    </div>
  </div>
</template>



