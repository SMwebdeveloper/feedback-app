import {createApp} from 'vue'
import App from './App.vue'
import './main.css'
import  router  from './routers/router'
import {createPinia} from "pinia"
import { createORM } from 'pinia-orm'

const app = createApp(App)
const pinia = createPinia().use(createORM())

app.use(router)
app.use(pinia)
app.mount('#app')