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

const id_articulo = ref('')
const nombre = ref('')
const user_crea = ref(usuario)


// const jsonTipoArt = ref({

// id_articulo:'',
// nombre:'', 
// user_crea: `${usuario}`,

// });

async function tipoArticuloCreated(jsonTA){
    
    try{
        await axios.post(`https://teelspay.com:3001/api/v1/tipoArticuloCreated`, jsonTA)
        
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getArticulo(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/articuloAll`);
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

function createData(){

    const jsonTA = {
        id_articulo:id_articulo.value, 
        nombre:nombre.value,
        user_crea:user_crea.value
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
            tipoArticuloCreated(jsonTA)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) { 
                    router.push('/tipoArticulo');
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
                            @submit="createData"
                            submit-label="Registrar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Tipo de Articulo"
                                placeholder="Tipo de Articulo"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el nombre de la tienda.'
                                }"
                            />

                            <FormKit
                                type="select"
                                label="Id Articulo"
                                name="id_articulo"
                                class="formKitt"
                                v-model="id_articulo"
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
                                v-model="user_crea"
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


