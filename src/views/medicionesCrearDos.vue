<script setup>
import Nav from '../components/Nav.vue'
import { ref, onMounted } from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const usuario = localStorage.usuario;
const valor = ref();
const route = useRoute()
const router = useRouter()
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

const id_invest = ref(info)
const hora = ref()
const user_crea = ref(usuario)
const user_mod = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')


async function getInvestigacion(){
    
    try{
        const response = await axios.post(`https://teelspay.com:3001/api/v1/investigacionFilterTrue`, {valorDos: usuario});
        info.value = response.data.map(invest => ({
            title: invest.id,
            value: invest.id
        }));

    } catch(error){
        console.log(error)
    }
    
    
}

async function medicionCreate(dataJson){
    
    try{
        await axios.post(`https://teelspay.com:3001/api/v1/medicionDiaria`, dataJson)
        
    } catch(error){
        console.log(error)
        
    }
}

onMounted( async () => {
    await getInvestigacion();
});

function addDataC(){

    const jsonE = {
        id_invest:id_invest.value[0].value, 
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
            medicionCreate(jsonE)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push(`/medicionTrue`);
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
                    <span class="text">Crear Mediciones</span>
                </div>

                <router-link :to="{path:'invesAccion'}" > 
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
                                    required: 'Debes colocar el numero de facturas.',
                                    between: 'No se pueden colocar numeros negativos.'
                                }"
                            />

                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="Creado por"
                                v-model="user_crea"
                                validation="required"
                                disabled
                                :validation-messages="{
                                    required: 'Creado por?'
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



