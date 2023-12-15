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
const marca = ref([])
const tamCap = ref([])


const id_tam_cap = ref('')
const nombre = ref('')
const id_marca = ref()
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
        await axios.put(`http://149.50.131.95:3001/api/v1/modeloUpdate/${id.value}`, jsonM)
        
    } catch(error){
        console.log(error)

    }
}

// FUNCTION PARA LLENAR SELECT
async function getTamCap(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapAll`);
        tamCap.value = response.data.map(tamCap => ({
        title: tamCap.nombre,
        value: tamCap.id,
    }));

    } catch(error){

        console.log(error)
    }
}

async function getMarca(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/marcasAll`);
        marca.value = response.data.map(marca => ({
            title: marca.nombre,
            value: marca.id
        }));

    } catch(error){

        console.log(error)
    }
}

onMounted( async () => {
    
    await getFiltermodelo();
    await getTamCap();
    await getMarca();

    id_tam_cap.value = modeloEdit.value.id_tam_cap
    nombre.value = modeloEdit.value.nombre
    id_marca.value = modeloEdit.value.id_marca
    user_crea.value = modeloEdit.value.user_crea
    user_mod.value = usuario

});

function UpdateData(){

    const jsonM = {
        id_tam_cap:id_tam_cap.value, 
        nombre:nombre.value,
        id_marca:id_marca.value,
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
            Updatemodelo(jsonM, id)
            Swal.fire({
            title: "Guardado!",
            text: "Datos editados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/modelo');
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

                            <label class="label_filter" for="">Tamaño Capacidad</label>
                            <v-combobox
                                clearable
                                required
                                chips
                                v-model="id_tam_cap"
                                name="id_invest"
                                placeholder="Selecciona el tamaño capacidad"
                                :items="tamCap"
                                variant="outlined"
                                style="width: 50%;"
                                :return-object="false"
                            ></v-combobox>

                            <label class="label_filter" for="">Marca</label>
                            <v-combobox
                                clearable
                                required
                                chips
                                v-model="id_marca"
                                name="id_marca"
                                placeholder="Selecciona la marca"
                                :items="marca"
                                variant="outlined"
                                style="width: 50%;"
                                :return-object="false"
                            ></v-combobox>

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


