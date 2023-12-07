<script setup>
import Nav from '../components/Nav.vue'
import Swal from 'sweetalert2'

import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const marcaEdit = ref([]);
const usuario = localStorage.usuario


const nombre = ref('')
const origen = ref('')
const user_crea = ref('')
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 
console.log(id.value)

const jsonLarcaEdit = ref({

nombre:'', 
origen:'',
user_crea:`${usuario}`//,
//user_mod:''

});

async function getFilterMarca(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/marcasFilter/${id.value}`)
        console.log(response)

        marcaEdit.value =  response.data
        // console.log(marcaEdit.value)
    } catch(error){
        console.log(error)

    }
}

async function postMarca(jsonL, id){
    
    try{
        const response = await axios.put(`http://149.50.131.95:3001/api/v1/marcaUpdate/${id.value}`, jsonL)
        
        if(response.data.status === 'ok'){

            Swal.fire({

                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas editar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Editar',

            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                router.push('/marcas');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
    
await getFilterMarca();      
    
    nombre.value = marcaEdit.value.nombre
    origen.value = marcaEdit.value.origen
    user_crea.value = marcaEdit.value.user_crea
   user_mod.value = usuario
});

function UpdateData(){

const jsonL = {


    nombre:nombre.value,
    origen:origen.value, 
    user_crea:user_crea.value ,
    user_mod:user_mod.value

}

    postMarca(jsonL, id)

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
                    <span class="text">Editar marca</span>
                </div>
                <router-link to="/marcas">
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
                                label="Nombre de Marca"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre.'
                                    }"
                            />
                            <FormKit
                                type="select"
                               label="Origen del Articulo"
                                name="origen"
                                class="formKitt"
                                v-model="origen"
                                placeholder="Escoge el Origen"
                                :options="['NACIONAL', 'IMPORTADO']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger el origen de la marca.',
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
                            <FormKit
                                disabled 
                                type="text"
                                label="Modificado Por"
                                name="CreadoPor"
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


