<script setup> 
import Nav from '../components/Nav.vue'
import { MedicionCrud } from '../stores/mediciones.js';


import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const medicionEdit = ref([]);
const info = ref([]);
const usuario = localStorage.usuario;

const mediciones = MedicionCrud();

const id_invest = ref('')
const hora = ref('')
const user_crea = ref('')
const user_mod = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')

// URL
const id = ref('')
id.value = route.params.key 




async function getFilterMedicion(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/medicionFilter/${id.value}`)
        medicionEdit.value =  response.data
    } catch(error){
        console.log(error)
    }
}

async function getInvestigacion(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/investigacionAll`);
        info.value = response.data.map(invest => ({
            title: invest.id,
            value: invest.id,
        }));
    } catch(error){
        console.log(error)
    }
}

onMounted( async () => {

   await getFilterMedicion();
   await getInvestigacion();
   
   
   id_invest.value = medicionEdit.value.id_invest
   hora.value = medicionEdit.value.hora
   user_crea.value = medicionEdit.value.user_crea
   user_mod.value = usuario
   nro_visitantes.value = medicionEdit.value.nro_visitantes
   nro_facturas.value = medicionEdit.value.nro_facturas

});


function addData(){

const jsonE = {
    id_invest:id_invest.value, 
    hora:hora.value,
    user_crea:user_crea.value,
    user_mod:user_mod.value ,
    nro_visitantes:nro_visitantes.value
    }

    mediciones.medicionEditar(id, jsonE)

}



</script>

<template>
    <Nav :class="{ close: valor }"/>

    <section class="dashboard">

        <div class="top">
            <button id="sidebarToggle" class="boton_burguer" @click="valor = !valor"> 
                <i class="ri-menu-line sidebar-toggle"></i> 
            </button> 

            <div class="search-box">
                <i class="ri-search-2-line"></i>
                <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)" disabled>
            </div>

            <img src="../assets/profile3.png" alt="imagen de perfil">
        </div>

        <div class="dash-content">

            <div class="overview"> 
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Editar Mediciones</span>
                </div>

                <router-link :to="{path:'/prueba/'+id_invest}" > 
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>
            </div>
            <br>

            <div class="activity">
                <section class="container_form1">
                   <!-- <form class="form" @:submit.prevent="$event => mediciones.medicionEditar(id, jsonE)">  -->
                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="addData"
                            submit-label="Actualizar"
                        >

                            <label class="label_filter" for="">Id investigacion</label>
                            <v-combobox
                                clearable
                                required
                                chips
                                v-model="id_invest"
                                name="id_invest"
                                placeholder="Selecciona tu tienda"
                                :items="info"
                                variant="outlined"
                                :return-object="false"
                            ></v-combobox>

                            <FormKit
                                type="select"
                                label="Corte horario"
                                name="hora"
                                class="formKitt"
                                v-model="hora"
                                placeholder="Escoge un corte"
                                :options="['MAÑANA', 'TARDE', 'TODO EL DIA']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes escoger el corte horario.',
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="user_crea"
                                v-model="user_crea"
                                disabled
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar el '
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Modifica por"
                                name="user_mod"
                                placeholder="user_mod"
                                v-model="user_mod"
                                disabled
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar el user_mod'
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Numero de visitantes"
                                name="nro_visitantes"
                                placeholder="nro_visitantes"
                                validation="required"
                                v-model="nro_visitantes"
                                :validation-messages="{
                                    required: 'Debes colocar el nro_visitantes.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Numero de facturas"
                                name="nro_facturas"
                                placeholder="Nombre del nro_facturas"
                                validation="required"
                                v-model="nro_facturas"
                                :validation-messages="{
                                    required: 'Debes colocar el nro_facturas.'
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





