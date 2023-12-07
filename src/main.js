import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
import 'datatables.net-responsive';

import App from './App.vue'
import router from './router'
import createPersistedState  from 'pinia-plugin-persistedstate'
import axios from 'axios'
import config from '/formkit.config.js'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'



window.axios = axios;
DataTable.use(DataTablesCore);

const pinia = createPinia() 

pinia.use(({store}) =>{
    store.router = markRaw(router)
})
pinia.use(createPersistedState)


const app = createApp(App)

// CODIGO BASIC DE JS
document.addEventListener('keydown', function(event) {

    const buscador = document.getElementById('searchField');
    if (event.ctrlKey  && event.key === 'k') {
      // Activar el campo de búsqueda
      event.preventDefault();
      buscador.focus();
    }
  });

  const vuetify = createVuetify({
    components,
    directives,
  })

  app.use(vuetify)
  app.use(plugin, defaultConfig(config))
  app.use(createPinia())
  app.use(router)
  app.mount('#app')




