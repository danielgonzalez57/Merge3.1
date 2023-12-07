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
origen:'',
user_crea:`${usuario}`

});

async function marcasCreated(){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/marcasCreated`, jsonMarca.value)
        
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
                
                router.push('/marcas');

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
                    <span class="text">Marcas</span>
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
                            @submit="marcasCreated"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="text"
                                label="Nombre del Articulo"
                                placeholder="Nombre del Articulo"
                                validation="required"
                                v-model="jsonMarca.nombre"
                                :validation-messages="{  
                                    required: 'debe colocar un nombre.'
                                    }"
                            />
                            <FormKit
                                type="select"
                               label="Origen del Articulo"
                                name="origen"
                                class="formKitt"
                                v-model="jsonMarca.origen"
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


