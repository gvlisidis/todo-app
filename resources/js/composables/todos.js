import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default function useTodos() {
    const todos = ref([])
    const todo = ref([])
    const errors = ref('')

    const router = useRouter()
    const getTodos = async () => {
        let response = await axios.get('/api/todos')
        todos.value = response.data.data
    }

    const getTodo = async (id) => {
       await axios.get(`/api/todos/${id}`)
            .then(response => {
                todo.value = response.data.data;
            })
    }

    const destroyTodo =  async (id) => {
        await axios.delete(`/api/todos/${id}`);
        router.push('/');
    }

    return {
        errors, todos, todo, getTodos, getTodo, destroyTodo
    }
}
