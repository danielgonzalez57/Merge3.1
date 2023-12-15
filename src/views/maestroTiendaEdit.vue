<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const maestroTiendaEdit = ref([]);
const usuario = localStorage.usuario;
const ciudades = ref([]);


const nombre = ref('')
const id_ciudad = ref('')
const latitud = ref('')
const longitud = ref('')
const direccion = ref('')
const user_crea = ref('')
const user_mod = ref('')
const tipo_tienda = ref('')

// URL
const id = ref('')
id.value = route.params.key 


async function getFilterMaestroTienda(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/maestroTiendaFilter/${id.value}`)
        console.log(response.data)

        maestroTiendaEdit.value =  response.data

    } catch(error){
        console.log(error)

    }
}

async function updateMaestroTienda(jsonMaestroTienda, id){
    
    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/maestroTiendaUpdate/${id.value}`, jsonMaestroTienda)
        
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR TABLE
async function getCiudades(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getCiudades`);
        ciudades.value = response.data[0].map(ciudad => ({
            label: ciudad.nombre,
            value: ciudad.Id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {

    await getFilterMaestroTienda();
    await getCiudades();
    
    nombre.value = maestroTiendaEdit.value.nombre
    id_ciudad.value = maestroTiendaEdit.value.id_ciudad
    latitud.value = maestroTiendaEdit.value.latitud
    longitud.value = maestroTiendaEdit.value.longitud
    tipo_tienda.value = maestroTiendaEdit.value.tipo_tienda
    direccion.value = maestroTiendaEdit.value.direccion
    user_crea.value = maestroTiendaEdit.value.user_crea 
    user_mod.value = usuario

  
});

function UpdateDataMaestroT(){

    const jsonMaestroTienda = {

        nombre: nombre.value, 
        id_ciudad: id_ciudad.value,
        latitud: latitud.value,
        longitud: longitud.value,
        tipo_tienda: tipo_tienda.value,
        direccion: direccion.value,
        user_crea: user_crea.value,
        user_mod: user_mod.value
    }

    Swal.fire({
        title: "Alerta!",
        text: "¿Desea editar estos datos?",
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
            updateMaestroTienda(jsonMaestroTienda, id);
            Swal.fire({
            title: "Guardado!",
            text: "Datos editados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/maestroTiendas');
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
                    <span class="text">Editar Maestro de Tiendas</span>
                </div>

                <router-link to="/maestroTiendas">
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
                            @submit="UpdateDataMaestroT"
                            submit-label="Editar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Nombre de la Tienda"
                                placeholder="Nombre de la tienda"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el nombre de la tienda.'
                                    }"
                            />

                            <FormKit
                                type="select"
                                label="Ciudad"
                                name="id_tienda"
                                class="formKitt"
                                v-model="id_ciudad"
                                placeholder="Escoge una ciudad"
                                :options="ciudades"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger una ciudad.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Sucursal"
                                name="sucursal"
                                placeholder="sucursal"
                                v-model="longitud"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar la sucursal.'
                                }"
                            />
                            
                            <FormKit
                                type="text"
                                label="Latitud y longitud"
                                name="latitud"
                                placeholder="latitud"
                                validation="required"
                                v-model="latitud"
                                :validation-messages="{
                                    required: 'Debes colocar la latitud y longitud.'
                                }"
                            />
                            <FormKit
                                type="select"
                                label="Tipo de Tienda"
                                name="tipo_tienda"
                                class="formKitt"
                                v-model="tipo_tienda"
                                placeholder="Escoge el tipo"
                                :options="['c', 'p']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger el tipo de tienda.',
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Dirección de la Tienda"
                                name="direccion"
                                placeholder="Direccion"
                                validation="required"
                                v-model="direccion"
                                :validation-messages="{
                                    required: 'Debes colocar la dirección.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="Creado por"
                                validation="required"
                                disabled
                                v-model="user_crea"
                            />
                            <FormKit
                                type="text"
                                label="Modificado por"
                                name="user_mod"
                                placeholder="Modificado por"
                                validation="required"
                                disabled
                                v-model="user_mod"
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


