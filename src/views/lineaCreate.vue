<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario

const nombre = ref('')
const cod_sap = ref('')
const user_crea = ref(usuario)

// URL
const id = ref('')
id.value = route.params.key 


async function lineasCreated(jsonM){
    
    try{
        await axios.post(`http://149.50.131.95:3001/api/v1/lineasCreated`, jsonM)
        
    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
   
  
});

function createData(){

    const jsonM = {
        nombre:nombre.value,
        cod_sap:cod_sap.value, 
        user_crea:user_crea.value
    }

 // FUNCTION PARA CREAR
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
            lineasCreated(jsonM)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/linea');
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
                    <span class="text">Lineas</span>
                </div>

                <router-link to="/lineas">
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
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de Linea"
                                validation="required"
                                v-model="nombre"
                                placeholder="Nombre de la linea"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre.'
                                    }"
                            />
                            <FormKit
                                type="text"
                                label="Codigo SAP"
                                validation="required"
                                v-model="cod_sap"
                                placeholder="Codigo SAP"
                                :validation-messages="{  
                                    required: 'debe colocar un Codigo SAP.'
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


