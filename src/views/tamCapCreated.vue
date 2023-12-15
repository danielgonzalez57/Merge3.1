<script setup> 
import Nav from '../components/Nav.vue'
import '@formkit/themes/genesis'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const tamCap = ref([]);

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
// URL
const id = ref('')
id.value = route.params.key 

const id_tipo = ref('')
const nombre = ref('')
const user_crea = ref(usuario)

const jsonTamCap = ref({

id_tipo:'',
nombre:'', 
user_crea: `${usuario}`,

});

async function tamCapCreated(jsonTC){
    
    try{
        await axios.post(`http://149.50.131.95:3001/api/v1/tamCapCreated`, jsonTC)
        
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

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
   await getTipo();
});

function createData(){

    const jsonTC = {
        id_tipo:id_tipo.value, 
        nombre:nombre.value,
        user_crea:user_crea.value
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
            tamCapCreated(jsonTC)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
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
                    <span class="text">Tamaño Capacidad</span>
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
                            @submit="createData"
                            submit-label="Registrar Maestro"
                        >

                            <FormKit
                                type="text"
                                label="Tamaño"
                                placeholder="Tamaño"
                                validation="required"
                                v-model="nombre"
                                :validation-messages="{  
                                    required: 'Debe colocar el Tamaño.'
                                }"
                                
                            />

                            <FormKit
                                type="select"
                                label="Tipo Articulo"
                                name="id_tipo"
                                class="formKitt"
                                v-model="id_tipo"
                                placeholder="Escoge un tipo articulo"
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
                                placeholder="creado por"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar el creador.'
                                }"
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

    .red{
        background-color: aqua;
    }

    [data-multiple] .formkit-inner {
  border-color: red;
  box-shadow: 0 0 0 1px red;
}
</style>


