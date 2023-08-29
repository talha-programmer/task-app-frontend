<script setup>
import { onMounted, ref } from 'vue';
import {useStore} from "../stores/appStore"


const store = useStore();
const tasks = ref([])

const filters = ref([
  { name: "All", value: 'all' },
  { name: "Completed", value: 'completed' },
  { name: "Incomplete", value: 'incomplete' },
]);

const selectedFilter = ref('all');

onMounted(() => {
  getTasks();
})


function getTasks(filter = 'all') {
  selectedFilter.value = filter;

  store.getTasks(filter).then(() => {
    let allTasks = store.tasks.map((item) => ({
      ...item,
      focused: false,
      open: false,
    }))

    tasks.value = allTasks;
  });
}

async function saveTask(task, index) {
  if(task.title) {
    const savedTask = await store.saveTask(task);
    if(savedTask.id) {
      this.tasks[index].id = savedTask.id;
      this.defocusItem(index);
    } else {
      alert('Error occurred while saving the task');
    }

  }
}

async function toggleTaskCompleted(task, index)
{
  if(task.id) {
    const updatedTask = await store.toggleTaskComplete(task);
    task.completed = updatedTask.completed; 

  } else {
    task.completed = !task.completed
  }
}

function openItem(index) {
  if (!this.tasks[index].open) {

    for (let i = 0; i < this.tasks.length; i++) {
      this.tasks[i].focused = false;
      this.tasks[i].open = i == index;
    }
    setTimeout(() => document.getElementById(`titleField${index}`).focus(), 10);
  }
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

          <span class="mr-3 cursor-pointer" :class="{'text-gray-400': filter.value == selectedFilter}"  v-for="filter in filters" @click="getTasks(filter.value)">
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
                  <input type="checkbox" :checked="item.completed" @click="toggleTaskCompleted(item, index)">
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
                      @click="saveTask(item, index)"
                      class="px-3 py-1 -mr-1 bg-green-600 focus:outline-none rounded-md hover:bg-green-500 text-white">
                      Save
                      <i class="mdi mdi-check"></i></button>
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



