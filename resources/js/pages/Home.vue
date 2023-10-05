<template>
   <div class="w-full">
       <div class="w-full">
           <h3>Add Todo Item</h3>
           <div class="w-full">
               <form class="flex  w-full items-center space-x-4">
                   <div class="w-full">
                       <input type="text" id="todo" name="todo" class="h-10 px-3 w-full rounded border border-gray-300" v-model="form.text">
                   </div>
                   <div>
                       <input type="date" class="h-10 px-3 rounded border border-gray-300" id="due_date" name="due_date" v-model="form.due_date" />
                   </div>
                   <div>
                       <button type="button" @click.prevent="saveTodo" class="text-xs md:text-sm px-5 py-2 rounded bg-sky-300">Add</button>
                   </div>
               </form>
           </div>
       </div>
       <div class="mt-10">
           <div v-if="todos.length > 0" class="w-full">
               <div v-for="todo in todos" :key="todo.id" class="w-full">
                   <div class="flex justify-between w-full py-3 items-center">
                       <div>{{ todo.text }}</div>
                       <div>{{ todo.due_date }}</div>
                   </div>
               </div>
           </div>
           <div v-else>
               <p>No todo items yet</p>
           </div>
       </div>
   </div>

</template>

<script setup>
import {onMounted, reactive} from "vue";
import useTodos from "../composables/todos.js";

onMounted(() => {
    getTodos()
})

const form = reactive({
    text: '',
    due_date: new Date().toISOString().slice(0,10)
})

const { todos, getTodos,  errors, storeTodo } = useTodos();


const saveTodo = async () => {
    await storeTodo({...form});
}

</script>
