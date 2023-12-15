<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const TamCapEdit = ref([]);
const tamCap = ref([]);


const id_tipo = ref('')
const nombre = ref('')
const user_mod = ref('')
const user_crea = ref('')

// URL
const id = ref('')
id.value = route.params.key 


async function getFilterTamCap(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapFilter/${id.value}`)

        TamCapEdit.value =  response.data

    } catch(error){

        console.log(error)

    }
}

async function UpdateTamCap(jsonTC, id){
    
    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/temCapUpdate/${id.value}`, jsonTC)
        
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getTipo(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tipoArticuloAll`);
        tamCap.value = response.data.map(linea => ({
            label: linea.nombre,
            value: linea.id
        }));

        console.log(articulos.value)

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
    
    await getFilterTamCap();
    await getTipo();
    

    id_tipo.value = TamCapEdit.value.id_tipo
    nombre.value = TamCapEdit.value.nombre
    user_crea.value = TamCapEdit.value.user_crea
    user_mod.value = usuario

});

function UpdateData(){

    const jsonTC = {
        id_tipo:id_tipo.value, 
        nombre:nombre.value,
        user_mod:user_mod.value,
        user_crea:user_crea.value
    }

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
            UpdateTamCap(jsonTC, id)
            Swal.fire({
            title: "Guardado!",
            text: "Datos editado con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) { 
                    router.push('/tamCap');
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
                    <span class="text">Editar Tamaño Capacidad</span>
                </div>

                <router-link to="/tamCap">
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
                                label="Tamaño"
                                placeholder="Tamaño"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el nombre de la tienda.'
                                }"
                            />

                            <FormKit
                                type="select"
                                label="Tipo Articulo"
                                name="id_tipo"
                                class="formKitt"
                                v-model="id_tipo"
                                placeholder="Escoge un articulo"
                                :options="tamCap"
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


