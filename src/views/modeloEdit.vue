<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const modeloEdit = ref([]);
const tamCap = ref([])


const id_tam_cap = ref('')
const nombre = ref('')
const user_mod = ref('')
const user_crea = ref('')

// URL
const id = ref('')
id.value = route.params.key 


const jsonModelo = ref({

id_tam_cap:'',
nombre:'', 
user_mod: '',
user_crea: ''

});

async function getFiltermodelo(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/modeloFilter/${id.value}`)

        modeloEdit.value =  response.data

    } catch(error){

        console.log(error)

    }
}

async function Updatemodelo(jsonM, id){
    
    try{
        const response = await axios.put(`http://149.50.131.95:3001/api/v1/modeloUpdate/${id.value}`, jsonM)
        
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
                router.push('/modelo');

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getTamCap(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapAll`);
        tamCap.value = response.data.map(linea => ({
            label: linea.nombre,
            value: linea.id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
    
    await getFiltermodelo();
    await getTamCap();
    

    id_tam_cap.value = modeloEdit.value.id_tam_cap
    nombre.value = modeloEdit.value.nombre
    user_crea.value = modeloEdit.value.user_crea
    user_mod.value = usuario

});

function UpdateData(){

    const jsonM = {
        id_tam_cap:id_tam_cap.value, 
        nombre:nombre.value,
        user_mod:user_mod.value,
        user_crea:user_crea.value
    }
    
    Updatemodelo(jsonM, id)

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
                    <span class="text">Editar Modelo</span>
                </div>

                <router-link to="/modelo">
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
                            submit-label="Registrar Maestro"
                        >

                        <FormKit
                                type="text"
                                label="Modelo"
                                placeholder="Modelo"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el modelo.'
                                }"
                            />

                            <FormKit
                                type="select"
                                label="Tamaño Capacidad"
                                name="id_tam_cap"
                                class="formKitt"
                                v-model="id_tam_cap"
                                placeholder="Escoge un articulo"
                                :options="tamCap"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes Escoger un tamaño.',
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
                            
                            <FormKit
                                type="text"
                                label="Modificado por"
                                name="user_mod"
                                v-model="user_mod"
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


