<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const articulos = ref([]);

// URL
const id = ref('')
id.value = route.params.key 


const jsonTipoArt = ref({

id_articulo:'',
nombre:'', 
user_crea: `${usuario}`,

});

async function tipoArticuloCreated(){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/tipoArticuloCreated`, jsonTipoArt.value)
        
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
                router.push('/tipoArticulo');

                }
            })

            }
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getArticulo(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/articuloAll`);
        articulos.value = response.data.map(linea => ({
            label: linea.nombre,
            value: linea.id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
   await getArticulo();
});

</script>

<template>
    <Nav :class="{ close: valor }"/>
    
    <section class="dashboard">

        <div class="top"  >
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
                    <span class="text">Tipo de Articulo</span>
                </div>

                <router-link to="/tipoArticulo">
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
                            @submit="tipoArticuloCreated"
                            submit-label="Registrar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Tipo de Articulo"
                                placeholder="Tipo de Articulo"
                                validation="required"
                                v-model="jsonTipoArt.nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el nombre de la tienda.'
                                }"
                            />

                            <FormKit
                                type="select"
                                label="Id Articulo"
                                name="id_articulo"
                                class="formKitt"
                                v-model="jsonTipoArt.id_articulo"
                                placeholder="Escoge un articulo"
                                :options="articulos"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes Escoger un Tipo Articulo.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                v-model="jsonTipoArt.user_crea"
                                validation="required"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar la latitud.'
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


