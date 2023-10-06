<template>
    <div class="w-full py-2 flex">
        <div  class="flex w-3/5 items-center">
            <span v-if="task.is_overdue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>
                </svg>
            </span>
            <p class="ml-2">{{ task.text }}</p>
        </div>
        <div class="w-2/5 flex items-center justify-end">
            <div  class="items-center text-center mr-4">{{ task.due_date }}</div>
            <div  class="flex  space-x-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24"
                     stroke-width="1.5"
                     class="w-6 h-6 hover:cursor-pointer hover:stroke-white fill-none hover:fill-green-500"
                     @click.prevent="markComplete(task.id)"
                >
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-5 h-5 hover:cursor-pointer"
                     @click="openEditModal"
                >
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-5 h-5 hover:cursor-pointer"
                     @click="deleteTask"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </div>
        </div>


        <!--  MODAL -->
        <div v-if="editModal" class="overflow-y-auto transition-opacity text-black ">
            <div class="bg-gray-300 opacity-70 fixed inset-0" @click.prevent="closeEditModal"></div>
            <div class="z-50 flex flex-col m-auto h-fit max-w-[300px] md:max-w-sm lg:max-w-lg xl:max-w-2xl bg-white space-y-2 md:space-y-6 fixed inset-0  rounded-sm" >
                <button @click.prevent="closeEditModal" class="absolute right-3 top-3 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <form class="px-2 flex flex-col md:px-6 pb-6 pt-2 space-y-6">
                    <div class="flex space-x-2">
                        <div class="w-full">
                            <input type="text" id="todo" name="todo" class="h-10 px-3 w-full rounded border border-gray-300"
                                   v-model="task.text">
                        </div>
                        <div>
                            <input type="date" class="h-10 px-3 rounded border border-gray-300" id="due_date"
                                   name="due_date" v-model="task.due_date"/>
                        </div>
                    </div>
                    <div>
                        <button type="button" @click.prevent="updateTask"
                                class="text-xs md:text-sm px-5 py-2 rounded whitespace-nowrap hover:bg-sky-500 bg-sky-300">Update task
                        </button>
                    </div>
                </form>
            </div>
        </div>


    </div>
</template>

<script setup>
import useTasks from "../composables/tasks.js";
import {ref} from "vue";
import axios from "axios";

const props = defineProps(['task'])
const emit = defineEmits();


const task = props.task;

const {completeTask, destroyTask} = useTasks();
const editModal = ref(false)

const markComplete = (id) => {
    completeTask(id)
    emit('taskCompleted');
}

const openEditModal = () => {
    editModal.value = true;
}
const closeEditModal = () => {
    editModal.value = false;
}

const updateTask = async () => {
    await axios.put(`/api/tasks/${task.id}`, {
        text: task.text,
        due_date: task.due_date,
        completed: task.completed
    })
        .then((response) => {
            editModal.value = false;
        })
}

const deleteTask = () => {
    destroyTask(task.id)
}
</script>
