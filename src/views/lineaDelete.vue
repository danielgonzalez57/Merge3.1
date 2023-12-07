<script setup>
import Nav from '../components/Nav.vue'

import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const lineaDelete = ref([]);


const nombreLinea = ref('')
const cod_sapLinea = ref('')
const user_creaMarca = ref('')
const Fec_CreaMarca = ref('')

// URL
const id = ref('')
id.value = route.params.key 
console.log(id.value)



async function getFilterLineaDelete(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/lineasFilter/${id.value}`)
        
        lineaDelete.value =  response.data
        

    } catch(error){
        console.log(error)

    }
}

async function eliminarLinea(){
          
    try{
        await axios.delete(`http://149.50.131.95:3001/api/v1/lineasDelete/${id.value}`);

    } catch(error){
        console.log(error)
    }

}

onMounted( async () => {
   await getFilterLineaDelete();
  
   nombreLinea.value = lineaDelete.value.nombre
    cod_sapLinea.value = lineaDelete.value.cod_sap
    user_creaMarca.value = lineaDelete.value.user_crea
    Fec_CreaMarca.value = lineaDelete.value.fec_crea
});

function eliminarL(){
    
    Swal.fire({

        icon: 'question',
        title: 'Alerta!',
        text: '¿Deseas eliminar estos datos?',
        background: '#3A3B3C',
        color: '#fff',
        confirmButtonText: 'Eliminar',

    }).then((result) => {
        if (result.isConfirmed) {

        // REDIRECCIONA AL TABLE PRINCIPAL  
        eliminarLinea()
        router.push('/lineas');

        }
    })
}



</script>

<template>
    <Nav :class="{ close: valor }"/>
    
    <section class="dashboard">
        <div class="top">
        <button id="sidebarToggle" class="boton_burguer" @click="valor = !valor"> 
            <i class="ri-menu-line sidebar-toggle"></i> 
        </button> 

        <div class="search-box">
            <i class="ri-search-2-line"></i>
            <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)">
        </div>

        <img src="../assets/profile3.png" alt="imagen de perfil">
    </div>
        <div class="dash-content">
            <div class="contenedorDelete">
              <div class="card">
                <div class="header">
                  <span class="icon">
                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
                    </svg>
                  </span>
                  <p class="alert">Eliminar Datos</p>
                </div>

                <p class="message">
                  <span>id: </span>{{ id }}
                </p>
                <p class="message">
                  <span>Nombre: </span>{{ nombreLinea }}
                </p>
        
                <p class="message">
                  <span>Codigo SAP: </span>{{ cod_sapLinea }}
                </p>
                <p class="message">
                  <span>Creado Por: </span>{{ user_creaMarca }}
                </p>
                <p class="message">
                  <span>Fecha de Creacion: </span>{{ Fec_CreaMarca }}
                </p>
               

                <div class="actions">
                  <button @click="eliminarL()" class="read">
                    Eliminar
                  </button>
                  <router-link class="mark-as-read" to="/lineas">
                      volver           
                  </router-link>
                  
                </div>
            </div>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>


<style scoped> 

.contenedorDelete{
  display: flex;
  justify-content: center; /* centra los elementos hijos horizontalmente */
  align-items: center; /* centra los elementos hijos verticalmente */
  height: 85vh; 
}
    .card {
  width: 520px;
  border-width: 1px;
  border-color: rgba(219, 234, 254, 1);
  border-radius: 8px;
  background-color: var(--border-color);
  padding: 1rem;
  
}


.header {
  display: flex;
  align-items: center;
  grid-gap: 1rem;
  gap: 1rem;
}

.icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #1DB954;
  padding: 0.5rem;
  color: rgba(255, 255, 255, 1);
}

.icon svg {
  height: 1rem;
  width: 1rem;
}

.alert {
  font-weight: 600;
  color:  var(--text-color);
}

.message {
  margin-top: 1rem;
  color: var(--text-color);
}
.message span{
  font-weight: 600;
}

.actions {
  margin-top: 1.5rem;
}

.actions a {
  text-decoration: none;
}

.mark-as-read, .read {
  display: inline-block;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  cursor: pointer;
}

.read {
  background-color: #1DB954;
  color: rgba(255, 255, 255, 1);
  border: none;
}

.mark-as-read {
  margin-top: 0.5rem;
  background-color: rgb(198, 199, 201);
  color: rgba(107, 114, 128, 1);
  transition: all .15s ease;
  border: none;
}

.mark-as-read:hover {
  background-color: rgb(230, 231, 233);
}
</style>


