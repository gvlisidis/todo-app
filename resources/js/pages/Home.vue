<template>
   <div class="">
       <div>
           <h3>Add Todo Item</h3>
           <div>
               <form class="flex items-center space-x-4">
                   <div>
                       <input type="text" id="todo" name="todo" class="h-10 w-96     rounded border border-gray-300" v-model="form.todo">
                   </div>
                   <div>
                       <button type="button" @click.prevent="submitEditForm" class="text-xs md:text-sm px-3 py-2 rounded bg-sky-300">Add</button>
                   </div>
               </form>
           </div>
       </div>
       <div class="mt-10">
           <div v-if="todos.length > 0">
               <div v-for="todo in todos" :key="todo.id">
                   {{ todo.title }}
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

const form = reactive({
    todo: ''
})

const { todos, getTodos } = useTodos();

onMounted(() => {
    getTodos()
})
const submitEditForm = () => {
    alert('hello')
}
</script>
