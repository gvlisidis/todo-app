<template>
    <div class="w-full py-2 flex">
        <div  class="flex w-3/5 items-center">
            <span v-if="task.is_overdue">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-5 h-5"
                     :class="task.is_overdue ? 'text-red-500' : ''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>

            </span>
            <p class="ml-2" :class="task.is_overdue ? 'text-red-500' : ''">{{ task.text }}</p>
        </div>
        <div class="w-2/5 flex items-center justify-end">
            <div  class="items-center text-center mr-8">{{ task.due_date }}</div>
            <div  class="flex  space-x-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="currentColor" viewBox="0 0 24 24"
                     stroke-width="1.5"
                     class="w-6 h-6 hover:cursor-pointer hover:stroke-green-500 fill-none"
                     @click.prevent="markComplete(task.id)"
                >
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="w-5 h-5 hover:cursor-pointer hover:stroke-orange-500"
                     @click="openEditModal"
                >
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                     class="w-5 h-5 hover:cursor-pointer hover:stroke-red-500"
                     @click="deleteTask(task.id)"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </div>
        </div>


        <!--  MODAL -->
        <div v-if="editModal" class="overflow-y-auto transition-opacity text-black ">
            <div class="bg-gray-300 opacity-70 fixed inset-0" @click.prevent="closeEditModal"></div>
            <div class="z-50 flex flex-col m-auto h-fit w-[800px] bg-white space-y-2 md:space-y-6 fixed inset-0  rounded-sm" >
                <form class="px-2 flex flex-col md:px-6 pb-6 pt-2 space-y-6 w-full mt-6">
                    <div class="flex space-x-2 w-full">
                        <div class="w-full">
                            <input type="text" id="todo" name="todo" class="h-10 px-3 w-full rounded border border-gray-300"
                                   v-model.lazy="task.text">
                        </div>
                        <div>
                            <input type="date" class="h-10 px-3 rounded border border-gray-300" id="due_date"
                                   name="due_date" v-model.lazy="task.due_date"/>
                        </div>
                    </div>
                    <div>
                        <button type="button" @click.prevent="updateTask"
                                class="text-xs md:text-sm px-5 py-2 rounded whitespace-nowrap text-white hover:bg-slate-700 bg-slate-600">Update task
                        </button>
                    </div>
                </form>
            </div>
        </div>


    </div>
</template>

<script setup>
import useTasks from "../composables/tasks.js";
import {computed, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const props = defineProps(['task'])
const emit = defineEmits();

const router = useRouter()


const task = props.task;

const {completeTask, destroyTask} = useTasks();
const editModal = ref(false)

const markComplete = (id) => {
    completeTask(id)
    emit('taskCompleted', id);
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
            router.push({name: 'home'})
        })
}

const deleteTask = (id) => {
    destroyTask(id)
    emit('taskRemoved', id);
}
</script>
