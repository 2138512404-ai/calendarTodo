import{createRouter, createWebHistory} from 'vue-router'
import Rili from "~/pages/rili.vue";
import Event from "~/pages/event.vue";
import Admin from '../layouts/admin.vue';

const routes =[{
    path: '/',
    component:Admin,
    redirect: '/rili',
    children: [
{
    path:"/rili",
    component:Rili
},
{
    path:"/event",
    component:Event
}
]
}
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
export default router 