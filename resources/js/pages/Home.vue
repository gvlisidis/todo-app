<template>
    <div class="w-full flex flex-col space-y-6 text-sm">
        <!-- SEARCH FOR TASK -->
        <div class="flex space-x-2 items-center relative">
            <div class="w-full flex  items-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                     stroke="#64748b"
                     class="left-2  w-4 h-4 absolute">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>
                </svg>
                <input type="text" v-model="searchTerm"
                       name="searchTerm" placeholder="Search for task"
                       class="rounded pl-8 pr-4 py-2 w-full border border-gray-300 focus:outline-0 focus:border-gray-600 focus:ring-gray-600 text-slate-800"
                />
            </div>

            <button class="px-4 py-2 whitespace-nowrap text-white hover:bg-slate-700 rounded bg-slate-600"
                    @click="clearSearch"
            >Clear Search
            </button>
        </div>

        <!-- ADD A TASK -->
        <div class="w-full">
            <h3>Add a task</h3>
            <div class="my-3 px-4 py-1 w-full rounded bg-red-200 text-red-700 text-xs" v-if="errors">{{ errors }}</div>
            <div class="w-full">
                <form class="flex  w-full items-center space-x-4">
                    <div class="w-full">
                        <input type="text" id="todo" name="todo" class="h-10 px-3 w-full rounded border border-gray-300"
                               v-model="form.text">
                    </div>
                    <div>
                        <input type="date" class="h-10 px-3 rounded border border-gray-300" id="due_date"
                               name="due_date" v-model="form.due_date"/>
                    </div>
                    <div>
                        <button type="button" @click.prevent="saveTask"
                                class="text-xs md:text-sm px-5 py-2 rounded whitespace-nowrap text-white hover:bg-slate-700 bg-slate-600">
                            Add task
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- PENDING TASKS -->
        <div class="mt-10">
            <div class="">
                <div class="bg-slate-600 text-white py-2 px-2 rounded-t flex justify-between">
                    <h3 class="font-bold ">Pending Tasks</h3>
                    <div class="flex space-x-16">
                        <p>Due date</p>
                        <p class="pr-6">Actions</p>
                    </div>
                </div>
                <div v-if="pendingTasks.length > 0" class="w-full px-2 border border-gray-200 ">
                    <div class="flex flex-col w-full">
                        <div v-for="task in pendingTasks" :key="task.id" class="w-full flex justify-between">
                            <TaskComponent :task="task"
                                           @taskCompleted="taskCompleted"
                                           @taskRemoved="taskRemoved"
                            ></TaskComponent>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="px-2">No tasks in the list</p>
                </div>
            </div>
        </div>

        <!-- COMPLETED TASKS -->
        <div class="mt-10">
            <div class=" ">
                <div class="bg-slate-600 py-2 text-white rounded-t flex justify-between items-center">
                    <h3 class="font-bold px-2">Completed Tasks</h3>
                </div>
                <div v-if="completedTasks.length > 0"
                     class="w-full text-gray-400 line-through px-2 border border-gray-200">
                    <div class="flex flex-col w-full">
                        <div v-for="task in completedTasks" :key="task.id" class="w-full flex justify-between">
                            <div class="py-2 flex w-full items-center">
                                {{ task.text }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="px-2">No tasks in the list</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import {onMounted, reactive, ref, watch} from "vue";
import useTasks from "../composables/tasks.js";
import TaskComponent from "../components/TaskComponent.vue";

const form = reactive({
    text: '',
    due_date: new Date().toISOString().slice(0, 10)
})
const searchTerm = ref('')
const {pendingTasks, completedTasks, searchTasks, getTasks, errors, storeTask} = useTasks();

watch(searchTerm, (newValue, oldValue) => {
    search();
});

onMounted(() => {
    getTasks()
})

const taskCompleted = (id) => {
    const task = pendingTasks.value.find(task => task.id === id);
    pendingTasks.value = pendingTasks.value.filter(task => task.id !== id);
    completedTasks.value.push(task);

}

const taskRemoved = (id) => {
    pendingTasks.value = pendingTasks.value.filter(task => task.id !== id);
}
const saveTask = async () => {
    await storeTask({...form});
    form.text = '';
    form.due_date = new Date().toISOString().slice(0, 10)
}

const search = async () => {
    await searchTasks(searchTerm.value)
};

const clearSearch = () => {
    searchTerm.value = ''
}
</script>
