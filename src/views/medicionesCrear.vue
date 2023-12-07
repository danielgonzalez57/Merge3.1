<script setup>
import { MedicionCrud } from '../stores/mediciones.js';
import { ref, onMounted } from 'vue';
import {  useRoute, useRouter } from 'vue-router'
const usuario = localStorage.usuario;
const valor = ref();

const route = useRoute()
const mediciones = MedicionCrud();
const info = ref();


const json = ref({
    id_invest:'', 
    hora:'',
    user_crea:`${usuario}`,
    user_mod:'',
    nro_visitantes:'',
    nro_facturas:'',
});
// URL
const id = ref('')
id.value = route.params.key 


const id_invest = ref(id.value)
const hora = ref('')
const user_crea = ref(usuario)
const user_mod = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')


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
await getInvestigacion();
});


function addDataC(){

const jsonE = {
    id_invest:id_invest.value, 
    hora:hora.value,
    user_crea:user_crea.value,
    user_mod:user_mod.value ,
    nro_visitantes:nro_visitantes.value,
    nro_facturas:nro_facturas.value
    }
    mediciones.medicionCreate(jsonE, id.value)

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
                    <span class="text">Crear Mediciones</span>
                </div>

                <router-link :to="{path:'/investigacion/'+id}" > 
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
                            @submit="addDataC"
                            submit-label="Registrar"
                        >

                        <label class="label_filter" for="">Id investigacion</label>
                            <v-combobox
                                readonly  
                                required
                                chips
                                v-model="id_invest"
                                name="id_invest"
                                placeholder="Selecciona el id investigacion"
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
                                validation="required"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar el user_crea'
                                }"
                            />

                            <FormKit
                                type="number"
                                label="Numero de visitantes"
                                name="nro_visitantes"
                                placeholder="Numero de visitantes"
                                validation="required"
                                v-model="nro_visitantes"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de visitantes.'
                                }"
                            />
                            <FormKit
                                type="number"
                                label="Numero de facturas"
                                name="nro_facturas"
                                placeholder="Numero de facturas"
                                validation="required"
                                v-model="nro_facturas"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de facturas.'
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

<script> 
import Nav from '../components/Nav.vue'

import router from '../router/index'
export default {
        components: {
            Nav,
            // Top
        }
    } 
</script>


