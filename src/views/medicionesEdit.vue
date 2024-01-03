<script setup> 
import Nav from '../components/Nav.vue'
import { ref, onMounted} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const medicionEdit = ref([]);
const info = ref([]);
const usuario = localStorage.usuario;


const id_invest = ref('')
const hora = ref('')
const user_crea = ref('')
const user_mod = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')

// URL
const id = ref('')
id.value = route.params.key 

const idDos = ref('')
idDos.value = route.params.keyDos 

async function getFilterMedicion(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/medicionFilter/${idDos.value}`)
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

async function medicionEditar(jsonMedicion){
    
    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/medicionUpdate/${idDos.value}`, jsonMedicion);
    
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

    const jsonMedicion = {
        id_invest:id_invest.value, 
        hora:hora.value,
        user_crea:user_crea.value,
        user_mod:user_mod.value ,
        nro_visitantes:nro_visitantes.value,
        nro_facturas:nro_facturas.value
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
            medicionEditar(jsonMedicion, idDos)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push(`/investigacion/${id.value}`);
                }
            });
    
        }
    });

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

                <router-link :to="{path:`/investigacion/${id}`}" >
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>
            </div>
            <br>

            <div class="activity">
                <section class="container_form1">

                    <div class="formulario-cont">
                        <form @submit.prevent="addData">
                            <label class="label_filter" for="modelo">Id investigacion</label>
                            <v-combobox
                                class="input-auto"
                                id="modelo"
                                readonly  
                                required8
                                chips
                                v-model="id_invest"
                                name="id_invest"
                                placeholder="Selecciona el id investigacion"
                                :items="info"
                                variant="outlined"
                                :return-object="false"
                            ></v-combobox>

                            <label class="label_filter" for="corte">Corte Horario</label>
                            <v-select
                                id="corte"
                                v-model="hora"
                                required
                                clearable
                                chips
                                placeholder="Escoge un corte"
                                :items="['MAÑANA', 'TARDE', 'TODO EL DIA']"
                                :rules="[v => !!v || 'El Corte de horario es requerido']"
                                variant="outlined"
                            ></v-select>

                            <label class="label_filter" for="nro_visitantes">Numero de Visitantes</label>
                            <v-text-field
                                type="number"
                                id="nro_visitantes"
                                v-model="nro_visitantes"
                                placeholder="Numero de visitantes"
                                :rules="[v => !!v && v >= 0 || 'El Numero de visitante es requerido']"
                                variant="outlined"
                            ></v-text-field>

                            <label class="label_filter" for="nro_facturas">Numero de Factura</label>
                            <v-text-field
                                type="number"
                                id="nro_facturas"
                                v-model="nro_facturas"
                                placeholder="Numero de visitantes"
                                :rules="[v => !!v && v >= 0 || 'El Numero de factura es requerido']"
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
                                :disabled="!hora || !nro_visitantes  || !nro_facturas">
                                Registrar
                            </v-btn>
                        </form>
                    </div>

                    <!-- <div class="container">
                        <FormKit
                            type="form"
                            @submit="addData"
                            submit-label="Actualizar"
                        >

                            <label class="label_filter" for="">Id investigacion</label>
                            <v-combobox
                                clearable
                                chips
                                v-model="id_invest"
                                name="id_invest"
                                placeholder="Selecciona el id"
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
                                type="number"
                                label="Numero de visitantes"
                                name="nro_visitantes"
                                placeholder="Numero de visitantes"
                                validation="required|between:0,1000000000000000000000000"
                                v-model="nro_visitantes"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de visitantes.',
                                    between: 'No se pueden colocar numeros negativos.'
                                }"
                            />

                            <FormKit
                                type="number"
                                label="Numero de facturas"
                                name="nro_facturas"
                                placeholder="Numero de facturas"
                                validation="required|between:0,1000000000000000000000000"
                                v-model="nro_facturas"
                                :validation-messages="{
                                    required: 'Debes colocar el numero de factura.',
                                    between: 'No se pueden colocar numeros negativos.'
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
                        </FormKit>
                    </div> -->

                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>





