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
        console.log(response, 9898)
        todos.value = response.data.data
    }

    const getTodo = async (id) => {
       await axios.get(`/api/todos/${id}`)
            .then(response => {
                todo.value = response.data.data;
            })
    }

    const storeTodo = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/todos', data)
            await router.push('/');
        } catch (e) {
            if (e.response.status === 422) {
                for (const key in e.response.data.errors) {
                    errors.value = e.response.data.errors
                }
            }
        }

    }


    const destroyTodo =  async (id) => {
        await axios.delete(`/api/todos/${id}`);
        await router.push('/');
    }

    return {
        errors, todos, todo, getTodos, getTodo, destroyTodo, storeTodo
    }
}
