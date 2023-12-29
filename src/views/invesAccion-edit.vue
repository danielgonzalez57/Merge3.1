<script setup>
import Nav from '../components/Nav.vue'
import Swal from 'sweetalert2'

import { ref, onMounted} from 'vue';
import moment from "moment"
import {  useRoute, useRouter } from 'vue-router'
const usuario = localStorage.usuario;

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const investigacionEdit = ref([]);
const info = ref([]);
const dataFecha = ref();


const fecha = ref('')
const id_tienda = ref('')
const motivo = ref('')
const investigador = ref('')
const user_crea = ref('')
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key 


async function getTienda(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/maestroTiendaAllConcat`);
        
         info.value = response.data[0].map(maestro => ({
            title: maestro.nombre,
            value: maestro.id,
        }));
        
    } catch(error){
        console.log(error)
    }
}

async function getFilterInvestigacion(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/InvestigacionFilter/${id.value}`)
        investigacionEdit.value =  response.data
    } catch(error){
        console.log(error)

    }
}

async function postInvestigacion(jsonInves, id){

    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/investigacionUpdate/${id.value}`, jsonInves)
        
    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
    
    await getFilterInvestigacion();
    await getTienda();

    dataFecha.value = moment(investigacionEdit.value.fecha).add(1, "days").format("DD/MM/YYYY") ; 
    fecha.value = dataFecha.value
    id_tienda.value = investigacionEdit.value.id_tienda
    motivo.value = investigacionEdit.value.motivo
    investigador.value = investigacionEdit.value.investigador
    user_crea.value = investigacionEdit.value.user_crea
    user_mod.value = usuario

    
});

console.log(fecha.value)




function UpdateData(){

    const jsonInves = {
        id_tienda:id_tienda.value, 
        motivo:motivo.value,
        investigador:investigador.value,
        user_crea:user_crea.value ,
        user_mod:user_mod.value
    }

    Swal.fire({
        title: "Alerta!",
        text: "¿Desea Editar estos datos?",
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
            postInvestigacion(jsonInves, id)
            Swal.fire({
            title: "Guardado!",
            text: "Datos editados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    router.push('/invesAccion');
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
                    <span class="text">Investigacion</span>
                </div>
                <router-link to="/invesAccion">
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
                        <label class="label_filter" for="fecha">Fecha Creacion</label>
                        <v-text-field
                            type="text"
                            readonly
                            v-model="fecha"
                            id="fecha"
                            :rules="[v => !!v || 'La fecha es requerida']"
                            placeholder="Fecha creacion"
                            required
                            variant="outlined"
                        ></v-text-field>

                        <label class="label_filter" for="id_tienda">Tienda</label>
                        <v-autocomplete
                            class="input-auto"
                            clearable
                            chips
                            id="id_tienda"
                            v-model="id_tienda"
                            :items="info"
                            :rules="[v => !!v || 'La tienda es requerida']"
                            placeholder="Escoge una tienda"
                            variant="outlined"
                            :return-object="false"
                        ></v-autocomplete>

                        <label class="label_filter" for="motivo">Motivo</label>
                        <v-text-field
                            readonly
                            id="motivo"
                            v-model="motivo"
                            required
                            placeholder="Escoge un Motivo"
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
                            :disabled="!id_tienda ">
                            Actualizar
                        </v-btn>
                    </form>
                </div>

                <!-- <div class="container">
                            
                        <FormKit
                            type="form"
                            @submit="UpdateData"
                            submit-label="Actualizar"
                        >

                            <FormKit
                                type="text"
                                label="Fecha de creacion"
                                validation="required"
                                readonly
                                v-model="fecha"
                                :validation-messages="{  
                                    required: 'debe colocar una fecha.'
                                    }"
                            />

                            <label class="label_filter" for="">Tienda</label>
                            <v-combobox
                                clearable
                                chips
                                v-model="id_tienda"
                                placeholder="Selecciona tu tienda"
                                :items="info"
                                variant="outlined"
                                :return-object="false"
                            ></v-combobox>
                            
                            
                            <FormKit
                                type="select"
                                label="Motivo"
                                name="motivo"
                                class="formKitt"
                                v-model="motivo"
                                placeholder="Escoge un motivo"
                                :options="['RUTINA', 'INAUGURACION', 'RRSS']"
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar el motivo de la investigacion.',
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Creado por"
                                name="investigador"
                                placeholder="Nombre "
                                validation="required"
                                disabled
                                v-model="user_crea"
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del user.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Modificado por"
                                name="user_mod"
                                placeholder="Nombre del investigador"
                                validation="required"
                                v-model="user_mod"
                                disabled
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del user.'
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
.input-auto{
        width: 100%;
    }
</style>


