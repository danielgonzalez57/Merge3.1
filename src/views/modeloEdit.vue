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
const codSapget = ref() 


const id_tam_cap = ref()
const nombre = ref('')
const id_marca = ref()
const user_mod = ref('')
const user_crea = ref('')
const cod_sap = ref()
const descrip = ref('')

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
        const response = await axios.get(`https://teelspay.com:3001/api/v1/modeloFilter/${id.value}`)

        modeloEdit.value =  response.data

    } catch(error){

        console.log(error)

    }
}

async function Updatemodelo(jsonM, id){
    
    try{
        await axios.put(`https://teelspay.com:3001/api/v1/modeloUpdate/${id.value}`, jsonM)
        
    } catch(error){
        console.log(error)

    }
}

async function getCodSap(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/codSapAll`);
        codSapget.value = response.data[0].map(cod => ({ 
            value: cod.id,
            title: cod.nombre
        }));

    } catch(error){
        console.log(error)
    }
}

// FUNCTION PARA LLENAR SELECT
async function getTamCap(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/tamCapAll`);
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
        const response = await axios.get(`https://teelspay.com:3001/api/v1/marcasAll`);
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
    await getCodSap();

    id_tam_cap.value = modeloEdit.value.id_tam_cap
    nombre.value = modeloEdit.value.nombre
    id_marca.value = modeloEdit.value.id_marca
    user_crea.value = modeloEdit.value.user_crea
    user_mod.value = usuario
    cod_sap.value = modeloEdit.value.cod_sap
    descrip.value = modeloEdit.value.descrip

});

function UpdateData(){

    const jsonM = {
        id_tam_cap:id_tam_cap.value, 
        nombre:nombre.value,
        id_marca:id_marca.value,
        user_mod:user_mod.value,
        user_crea:user_crea.value,
        cod_sap:cod_sap.value,
        descrip:descrip.value
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

                    <div class="formulario-cont">
                        <form @submit.prevent="UpdateData">
                            <label class="label_filter" for="modelo">Modelo</label>
                            <v-text-field
                                type="text"
                                v-model="nombre"
                                id="modelo"
                                :rules="[v => !!v || 'El nombre del modelo es requerida']"
                                placeholder="Nombre del modelo"
                                required
                                variant="outlined"
                            ></v-text-field>

                            <label class="label_filter" for="id_tienda">Tamaño Capacidad</label>
                            <v-autocomplete
                                class="input-auto"
                                clearable
                                chips
                                id="id_tienda"
                                v-model="id_tam_cap"
                                :items="tamCap"
                                :rules="[v => !!v || 'El tamaño es requerido']"
                                placeholder="Escoge un tamaño"
                                variant="outlined"
                                :return-object="false"
                            ></v-autocomplete>

                            <label class="label_filter" for="id_tienda">Marca</label>
                            <v-autocomplete
                                class="input-auto"
                                clearable
                                chips
                                id="id_tienda"
                                v-model="id_marca"
                                :items="marca"
                                :rules="[v => !!v || 'La marca es requerida']"
                                placeholder="Escoge una marca"
                                variant="outlined"
                                :return-object="false"
                            ></v-autocomplete>

                            <label class="label_filter" for="descrip">Descripción</label>
                            <v-text-field
                                v-model="descrip"
                                id="descrip"
                                placeholder="Coloca una descripcion al modelo"
                                variant="outlined"
                            ></v-text-field>

                            <label class="label_filter" for="sap">Codigo Similar Propio</label>
                            <v-autocomplete
                                class="input-auto"
                                id="sap"
                                chips
                                v-model="cod_sap"
                                name="cod_sap"
                                placeholder="Selecciona un codigo similar"
                                :items="codSapget"
                                variant="outlined"
                                :return-object="false"
                            ></v-autocomplete>

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
                                :disabled="!id_marca || !nombre  || !id_tam_cap">
                                Registrar
                            </v-btn>
                        </form>
                    </div>

                    <!-- <div class="container">
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
                        </FormKit>
                    </div>
                     -->
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


