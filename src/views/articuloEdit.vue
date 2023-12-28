<script setup>
import Nav from '../components/Nav.vue'
import Swal from 'sweetalert2'

import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const articuloEdit = ref([]);
const usuario = localStorage.usuario
const lineasEdit = ref([]);


const nombre = ref('')
const id_linea = ref('')
const user_crea = ref('')
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 

const jsonArtEdit = ref({

nombre:'', 
id_linea:'',
user_crea:`${usuario}`//,
//user_mod:''

});

async function getFilterArticulo(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/articuloFilter/${id.value}`)
        console.log(response)

        articuloEdit.value =  response.data
        // console.log(articuloEdit.value)
    } catch(error){
        console.log(error)

    }
}

async function postArticulo(jsonA, id){
    
    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/articuloUpdate/${id.value}`, jsonA)
        
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getLineas(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getLineas`);
        lineasEdit.value = response.data[0].map(linea => ({
            label: linea.nombre,
            value: linea.Id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
    
await getFilterArticulo();      
await getLineas();      
    
    nombre.value = articuloEdit.value.nombre
    id_linea.value = articuloEdit.value.id_linea
    user_crea.value = articuloEdit.value.user_crea
    user_mod.value = usuario
});

function UpdateData(){

    const jsonA = {

        nombre:nombre.value,
        id_linea:id_linea.value, 
        user_crea:user_crea.value ,
        user_mod:user_mod.value

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
            postArticulo(jsonA, id)
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
            <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)" disabled>
        </div>

        <img src="../assets/profile3.png" alt="imagen de perfil">
    </div>
        <div class="dash-content">

            <div class="overview"> 
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Editar Articulo</span>
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
                            @submit="UpdateData"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de Articulo"
                                validation="required"
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
                                :options="lineasEdit"
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
                                
                            />
                           
                            <FormKit
                                disabled
                                type="text"
                                label="Modificado Por"
                                name="ModificadoPor"
                                placeholder="Modificado Por"
                                v-model="user_mod"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar un usuario.'
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


