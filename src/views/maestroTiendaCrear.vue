<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const ciudades = ref([]);


// URL
const id = ref('')
id.value = route.params.key 

const nombre = ref('')
const id_ciudad = ref()
const latitud = ref('')
const longitud = ref('')
const direccion = ref('')
const user_crea = ref(usuario)
const user_mod = ref('')
const tipo_tienda = ref()


// FUNCTION PARA LLENAR TABLE
async function getCiudades(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/getCiudades`);
        ciudades.value = response.data[0].map(ciudad => ({
            title: ciudad.nombre,
            value: ciudad.Id
        }));

    } catch(error){

        console.log(error)
    }
}

async function maestroTiendaCreated(jsonTiendas){
    
    try{
        await axios.post(`http://149.50.131.95:3001/api/v1/maestroTiendaCreated`, jsonTiendas)
    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
   
  await getCiudades();
});

function addDataC(){

    const jsonTiendas = {
        nombre: nombre.value, 
        id_ciudad: id_ciudad.value,
        latitud: latitud.value,
        longitud: longitud.value,
        tipo_tienda: tipo_tienda.value,
        direccion: direccion.value,
        user_crea: user_crea.value,
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
            maestroTiendaCreated(jsonTiendas)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
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

        <div class="top" >
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
                    <span class="text">Maestro de tienda</span>
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
                    <div class="formulario-cont">
                        <form @submit.prevent="addDataC">
                            <label class="label_filter" for="tienda">Nombre de la Tienda</label>
                            <v-text-field
                                type="text"
                                v-model="nombre"
                                id="tienda"
                                :rules="[v => !!v || 'El nombre de la tienda es requerido']"
                                placeholder="Nombre de la tienda"
                                required
                                variant="outlined"
                            ></v-text-field>

                            <label class="label_filter" for="ciudad">Ciudad</label>
                            <v-autocomplete
                                class="input-auto"
                                clearable
                                chips
                                id="ciudad"
                                v-model="id_ciudad"
                                :items="ciudades"
                                :rules="[v => !!v || 'La ciudad es requerida']"
                                placeholder="Escoge una ciudad"
                                variant="outlined"
                                :return-object="false"
                            ></v-autocomplete> 
                            
                            <label class="label_filter" for="sucursal">Sucursal</label>
                            <v-text-field
                                v-model="longitud"
                                id="sucursal"
                                placeholder="Sucursal"
                                :rules="[v => !!v || 'La sucursal de la tienda es requerida']"
                                variant="outlined"
                            ></v-text-field>
                            
                            <label class="label_filter" for="latitud">Latitud y Longitud</label>
                            <v-text-field
                                v-model="latitud"
                                id="latitud"
                                placeholder="Latitud y Longitud"
                                :rules="[v => !!v || 'La latitud y longitud de la tienda es requerida']"
                                variant="outlined"
                            ></v-text-field>
                            
                            <label class="label_filter" for="tipo_tienda">Tipo de Tienda</label>
                            <v-select
                                id="tipo_tienda"
                                v-model="tipo_tienda"
                                required
                                clearable
                                chips
                                placeholder="Escoge el tipo de tienda"
                                :items="['C', 'P']"
                                :rules="[v => !!v || 'El tipo de tienda es requerido']"
                                variant="outlined"
                            ></v-select>

                            <label class="label_filter" for="direccion">Dirección de la Tienda</label>
                            <v-text-field
                                v-model="direccion"
                                id="direccion"
                                placeholder="Dirección de la Tienda"
                                :rules="[v => !!v || 'La dirección de la tienda es requerida']"
                                variant="outlined"
                            ></v-text-field>

                            <label class="label_filter" for="user_crea">Creado Por</label>
                            <v-text-field
                                readonly
                                v-model="user_crea"
                                id="user_crea"
                                placeholder="Escoge un Creador"
                                variant="outlined"
                            ></v-text-field>

                            <v-btn color="green-accent-4"
                                class="mt-4"
                                width="300"
                                type="submit"
                                :disabled="!nombre || !id_ciudad  || !longitud  || !latitud || !tipo_tienda || !direccion">
                                Registrar
                            </v-btn>
                        </form>
                    </div>
                    <!-- <div class="container">
                        <FormKit
                            type="form"
                            @submit="addDataC"
                            submit-label="Registrar Maestro"
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
                                name="Sucursal"
                                placeholder="Sucursal"
                                v-model="longitud"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar la sucursal.'
                                }"
                            />
                            
                            <FormKit
                                type="text"
                                label="Latitud y Longitud"
                                name="longitud"
                                placeholder="Latitud y Longitud"
                                validation="required"
                                v-model="latitud"
                                :validation-messages="{
                                    required: 'Debes colocar la longitud.'
                                }"
                            />
                            <FormKit
                                type="select" 
                                label="Tipo de Tienda"
                                name="tipo_tienda"
                                class="formKitt"
                                v-model="tipo_tienda"
                                placeholder="Escoge el tipo"
                                :options="['C', 'P']"
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
                                placeholder="creado por"
                                validation="required"
                                disabled
                                v-model="user_crea"
                                :validation-messages="{
                                    required: 'Debes colocar el user crea.'
                                }"
                            />

                        </FormKit>
                    </div> -->
                    
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


