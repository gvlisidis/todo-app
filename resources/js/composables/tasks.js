import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

export default function useTasks() {
    const pendingTasks = ref([])
    const completedTasks = ref([])
    const task = ref([])
    const errors = ref('')

    const router = useRouter()
    const getTasks = async () => {
        let response = await axios.get('/api/tasks')
        pendingTasks.value = response.data.data.pending
        completedTasks.value = response.data.data.completed
    }

    const searchTasks = async (searchTerm) => {
        try {
            const response = await axios.get('/api/tasks', {
                params: {
                    searchTerm: searchTerm
                }
            });

            pendingTasks.value = response.data.data.pending
            completedTasks.value = response.data.data.completed
        } catch (error) {
            console.error(error);
        }
    };

    const storeTask = async (data) => {
        errors.value = ''

        await axios.post('/api/tasks', data)
            .then(response => {
                pendingTasks.value.unshift(response.data.data)
                router.push('/');
            })
            .catch(e => {
                errors.value = 'Something went wrong!'
                setTimeout(() => {
                    errors.value = ''
                }, 3000)
            })
    }

    const completeTask = async (id) => {
        await axios.put(`/api/tasks/complete/${id}`)
            .then((response) => {
                pendingTasks.value = pendingTasks.value.filter(task => task.id !== response.data.data.id);
                completedTasks.value.push(response.data.data);
            })
        await  router.push('/');

    }

    const destroyTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`)
            .then((response) => {
                router.push('/');
            })

    }

    return {
        errors, pendingTasks, completedTasks,searchTasks, task, getTasks, destroyTask, storeTask, completeTask
    }
}
