<script setup>
import Nav from '../components/Nav.vue'
import Swal from 'sweetalert2'

import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const lineaEdit = ref([]);
const usuario = localStorage.usuario

const nombre = ref('')
const cod_sap = ref('')
const user_crea = ref('')
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 

async function getFilterLinea(){
    
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/lineasFilter/${id.value}`)
        lineaEdit.value =  response.data

    } catch(error){
        console.log(error)

    }
}

async function postLinea(jsonM, id){
    
    try{
        await axios.put(`https://teelspay.com:3001/api/v1/lineasUpdate/${id.value}`, jsonM)
        
    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
    
await getFilterLinea();      
    
    nombre.value = lineaEdit.value.nombre
    cod_sap.value = lineaEdit.value.cod_sap
    user_crea.value = lineaEdit.value.user_crea
    user_mod.value = usuario
});

function UpdateData(){

    const jsonM = {
        nombre:nombre.value,
        cod_sap:cod_sap.value, 
        user_crea:user_crea.value ,
        user_mod:user_mod.value
    }

    // FUNCTION PARA CREAR
    Swal.fire({
            title: "Alerta!",
            text: "¿Desea editar estos datos?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, Editar!",
            background: '#3A3B3C',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                postLinea(jsonM, id)
                Swal.fire({
                title: "Guardado!",
                text: "Datos editados con exito!!!",
                icon: "success",
                background: '#3A3B3C',
                color: '#fff'
                }).then((result) => {
                if (result.isConfirmed) {
                        router.push('/lineas');
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
                    <span class="text">Editar linea</span>
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
                            @submit="UpdateData"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de Linea"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre de linea.'
                                    }"
                            />
                            <FormKit
                                type="text"
                                label="Codigo de Linea"
                                validation="required"
                                v-model="cod_sap"
                                :validation-messages="{  
                                    required: 'debe colocar una Linea.'
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
                                name="modificadoPor"
                                placeholder="Creado Por"
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


