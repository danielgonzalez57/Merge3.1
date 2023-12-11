<script setup> 
import Nav from '../components/Nav.vue'


import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
// URL
const id = ref('')
id.value = route.params.key 

const info = ref();

const fecha = ref('')
const id_tienda = ref([])
const motivo = ref('')
const investigador = ref('')
const user_crea = ref(usuario)
const user_mod = ref('')




async function getTienda(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/maestroTiendaAll`);
        info.value = response.data.map(maestro => ({
            title: maestro.nombre,
            value: maestro.id,
        }));
    } catch(error){
        console.log(error)
    }
}

async function investigacionCreated(jsonInves){
    
    try{
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/investigacionCreated`, jsonInves)
        
        if(response.data.status === 'ok'){

            Swal.fire({

                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas guardar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Guardar',

            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                
                Swal.fire({
                    title: "Creado!",
                    text: "Data creada con exito!!!",
                    icon: "success",
                    background: '#3A3B3C',
                    color: '#fff'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.push('/invesAccion');
                            }
                        });

                }
            })

            }
        

    } catch(error){
        console.log(error)

    }
}

onMounted( async () => {
await getTienda();
});

function crearData(){

const jsonInves = {

    fecha:fecha.value, 
    id_tienda:id_tienda.value, 
    motivo:motivo.value,
    investigador:investigador.value,
    user_crea:user_crea.value ,
    user_mod:user_mod.value

}
investigacionCreated(jsonInves)

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

                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="crearData"
                            submit-label="Registrar"
                        >

                            <FormKit
                                type="date"
                                label="Fecha de creacion"
                                validation="required"
                                v-model="fecha"
                                :validation-messages="{  
                                    required: 'debe colocar una fecha.'
                                    }"
                            />
                            
                            <label class="label_filter" for="">Tienda</label>
                            <v-combobox
                                required
                                clearable
                                chips
                                name="id_tienda"
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
                                label="Investigador"
                                name="investigador"
                                placeholder="Nombre del investigador"
                                validation="required"
                                v-model="investigador"
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del investigador.'
                                }"
                            />
                            <FormKit
                                type="text"
                                label="Creado por"
                                name="user_crea"
                                placeholder="Nombre del investigador"
                                validation="required"
                                disabled
                                v-model="user_crea"
                                :validation-messages="{
                                    required: 'Debes colocar el nombre del user.'
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
    .v-combobox{
    width: 50%;
    }
    @media (max-width: 1000px) {
  .v-combobox{
    width: 61%;
  }
}
    @media (max-width: 900px) {
  .v-combobox{
    width: 75%;
  }
}
    @media (max-width: 700px) {
  .v-combobox{
    width: 100%;
  }
}
 
</style>


