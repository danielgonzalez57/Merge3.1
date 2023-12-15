<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario
const lineas = ref([]);

// URL
const id = ref('')
id.value = route.params.key 

const nombre = ref('')
const id_linea = ref('')
const user_crea = ref(usuario)


async function articuloCreated(jsonArt){
    
    try{
        await axios.post(`http://149.50.131.95:3001/api/v1/articuloCreated`, jsonArt)
        

    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getLineas(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getLineas`);
        lineas.value = response.data[0].map(linea => ({
            label: linea.nombre,
            value: linea.Id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
   
    await getLineas();
  
});

function addDataC(){

    const jsonArt = {
        nombre:nombre.value,
        id_linea:id_linea.value, 
        user_crea:user_crea.value,
    }

    Swal.fire({
        title: "Alerta!",
        text: "¿Desea guardar estos datos?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Guardar!",
        background: '#3A3B3C',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            articuloCreated(jsonArt)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                router.push('/articulo');
                }
            });

        }
    });

}


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
                    <span class="text">Articulo</span>
                </div>

                <router-link to="/articulo">
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
                            @submit="addDataC"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre del Articulo"
                                validation="required"
                                placeholder="Nombre del Articulo"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre.'
                                    }"
                            />

                            <FormKit
                                type="select"
                                label="Linea Asociada"
                                name="id_tienda"
                                class="formKitt"
                                v-model="id_linea"
                                placeholder="Escoge una Linea"
                                :options="lineas"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger una Linea.',
                                }"
                            />

                            <FormKit
                                disabled 
                                type="text"
                                label="Creado Por"
                                name="CreadoPor"
                                placeholder="Creado Por"
                                v-model="user_crea"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar un usuario.'
                                }"
                            />
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


