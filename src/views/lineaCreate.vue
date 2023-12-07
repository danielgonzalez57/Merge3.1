<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario

// URL
const id = ref('')
id.value = route.params.key 


const jsonMarca = ref({

nombre:'', 
cod_sap:'',
user_crea:`${usuario}`

});

async function lineasCreated(){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/lineasCreated`, jsonMarca.value)
        
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
                
                router.push('/lineas');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
   
  
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
                            @submit="lineasCreated"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de Linea"
                                validation="required"
                                v-model="jsonMarca.nombre"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre.'
                                    }"
                            />
                            <FormKit
                                type="text"
                                label="Codigo SAP"
                                validation="required"
                                v-model="jsonMarca.cod_sap"
                                :validation-messages="{  
                                    required: 'debe colocar un Codigo SAP.'
                                    }"
                            />
                            <!-- <FormKit
                                type="select"
                                label="Linea Asociada"
                                name="id_tienda"
                                class="formKitt"
                                v-model="jsonMarca.id_linea"
                                placeholder="Escoge una Linea"
                                :options="[ 
                                    { label: 'LINEA BLANCA', value: 1 },
                                    { label: 'LINEA CASA', value: 2 },
                                    { label: 'LINEA DIGITAL', value: 3 },
                                    { label: 'LINEA FERRETERIA', value: 4 },
                                    { label: 'LINEA MARRON', value: 5 }]"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger una Linea.',
                                }"
                            /> -->

                            <FormKit
                                disabled 
                                type="text"
                                label="Creado Por"
                                name="CreadoPor"
                                placeholder="Creado Por"
                                v-model="jsonMarca.user_crea"
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


