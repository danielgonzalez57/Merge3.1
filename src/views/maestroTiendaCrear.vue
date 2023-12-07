<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const ciudades = ref([]);

// URL
const id = ref('')
id.value = route.params.key 


const jsonMaestroT = ref({

nombre:'', 
id_ciudad:'',
latitud:'',
longitud:'',
tipo_tienda:'',
direccion:'',
user_crea: `${usuario}`

});

// FUNCTION PARA LLENAR TABLE
async function getCiudades(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getCiudades`);
        ciudades.value = response.data[0].map(ciudad => ({
            label: ciudad.nombre,
            value: ciudad.Id
        }));

    } catch(error){

        console.log(error)
    }
}


async function maestroTiendaCreated(){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/maestroTiendaCreated`, jsonMaestroT.value)
        
        if(response.data.status === 'ok'){

            Swal.fire({

                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas guardar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Guardar',

            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                
                router.push('/maestroTiendas');

                }
            })

            }
    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
   
  await getCiudades();
});

</script>

<template>
    <Nav :class="{ close: valor }"/>
    
    <section class="dashboard">

        <div class="top" >
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

            <div class="overview"> 
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Maestro de tienda</span>
                </div>

                <router-link to="/maestroTiendas">
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>
                
            </div>
            <br>

            <div class="activity">
                <section class="container_form1">

                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="maestroTiendaCreated"
                            submit-label="Registrar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de la Tienda"
                                placeholder="Nombre de la tienda"
                                validation="required"
                                v-model="jsonMaestroT.nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el nombre de la tienda.'
                                    }"
                            />

                            <FormKit
                                type="select"
                                label="Ciudad"
                                name="id_tienda"
                                class="formKitt"
                                v-model="jsonMaestroT.id_ciudad"
                                placeholder="Escoge una ciudad"
                                :options="ciudades"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger una ciudad.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Sucursal"
                                name="Sucursal"
                                placeholder="Sucursal"
                                v-model="jsonMaestroT.latitud"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar la sucursal.'
                                }"
                            />
                            
                            <FormKit
                                type="text"
                                label="Latitud y Longitud"
                                name="longitud"
                                placeholder="Latitud y Longitud"
                                validation="required"
                                v-model="jsonMaestroT.longitud"
                                :validation-messages="{
                                    required: 'Debes colocar la longitud.'
                                }"
                            />
                            <FormKit
                                type="select" 
                                label="Tipo de Tienda"
                                name="tipo_tienda"
                                class="formKitt"
                                v-model="jsonMaestroT.tipo_tienda"
                                placeholder="Escoge el tipo"
                                :options="['C', 'P']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger el tipo de tienda.',
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Dirección de la Tienda"
                                name="direccion"
                                placeholder="Direccion"
                                validation="required"
                                v-model="jsonMaestroT.direccion"
                                :validation-messages="{
                                    required: 'Debes colocar la dirección.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="creado por"
                                validation="required"
                                disabled
                                v-model="jsonMaestroT.user_crea"
                                :validation-messages="{
                                    required: 'Debes colocar el user crea.'
                                }"
                            />

                            <!-- <pre wrap>{{ value }}</pre> -->
                        </FormKit>
                    </div>
                    
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style scoped>
    .container-combobox{
        width: 40%;
        min-width: 100%;
    }
    .comboInput{
        padding: 14px;
        border-radius: 5px;
        color: #999;
    }
</style>

<!-- <template>
    <FormKit
      type="select"
      label="Ciudad"
      name="id_tienda"
      class="formKitt"
      v-model="jsonMaestroT.id_ciudad"
      placeholder="Escoge una tienda"
      :options="ciudades"
      validation="required"
      :validation-messages="{
        required: 'Debes escoger una ciudad.',
      }"
    />
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        ciudades: [],
        jsonMaestroT: {
          id_ciudad: null,
        },
      };
    },
    async created() {
      const response = await axios.get('URL_DE_TU_API');
      this.ciudades = response.data.map(ciudad => ({
        label: ciudad.nombre,
        value: ciudad.id,
      }));
    },
  };
  </script>

 -->
