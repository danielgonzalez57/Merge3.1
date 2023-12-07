<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const tamCap = ref([])
const marca = ref([])
const tipoartget = ref([])


const id_art = ref()
const id_tam_cap = ref()
const id_marca = ref()
const pan_dulce = ref()
const nombre = ref()
const user_crea = ref(usuario)

const id = ref('')
id.value = route.params.key 

const idDos = ref('')
idDos.value = route.params.keyDos

const jsonMod = ref({
id_tam_cap:'',
pan_dulce:'asdasd',
id_marca:'',
nombre:'', 
user_crea: `${usuario}`,

});

async function modeloCreated(dataJson){
    
    try{
        console.log(jsonMod.value)
        const response = await axios.post(`http://149.50.131.95:3001/api/v1/modeloCreated`, dataJson)
        
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
                router.push(`/investProductsCreate/${id.value}/${idDos.value}`);

                }
            })

            }
    } catch(error){
        console.log(error)

    }
}

async function getTipoArt(){

try{
     const response = await axios.get('http://149.50.131.95:3001/api/v1/tipoArticuloAll');
     tipoartget.value =  response.data.map(tipoArt => ({
         title: tipoArt.nombre,
         value: tipoArt.id,
         tipoArticulo: tipoArt.id,

     }));

 } catch(error){
     console.log(error)
 }
}

async function getTamCap(){

const valorSeleccionado = id_art.value?.value
console.log(valorSeleccionado)

let RUTA = `http://149.50.131.95:3001/api/v1/tamCapFilterSelect/${valorSeleccionado}`

try{
    const response = await axios.get(RUTA);

    tamCap.value =  response.data.map(tamCap => ({
        title: tamCap.nombre,
        value: tamCap.id,
    }));


} catch(error){
    console.log(error)
}
}

// FUNCTION PARA LLENAR SELECT
// async function getTamCap(){
//     try{
//         const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapAll`);
//         tamCap.value = response.data.map(linea => ({
//             title: linea.nombre,
//             value: linea.id
//         }));

//     } catch(error){

//         console.log(error)
//     }
// }
// FUNCTION PARA LLENAR SELECT
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





function crearDataModel(){
    const dataJson = {
        id_tam_cap:id_tam_cap.value ,
        id_marca :id_marca .value ,
        nombre:nombre.value ,
        user_crea:user_crea.value
    }
    // FUNCTION PARA CREAR
    modeloCreated(dataJson)
}
onMounted( async () => {

await getTipoArt();
await getTamCap();
await getMarca();

});


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
                    <span class="text">Crea un modelo</span>
                </div>

            </div>

            <div class="activity">
                <section class="container_form1">

                    <div class="container">
                        <FormKit
                            type="form"
                            @submit="crearDataModel"
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

                            <label class="label_filter" for="">Tipo de articulo</label>
                            <v-combobox
                                clearable
                                required
                                chips
                                name="id_art"
                                v-model="id_art"
                                @update:modelValue="getTamCap"
                                :items="tipoartget"
                                placeholder="Selecciona el tamaño capacidad"
                                variant="outlined"
                                style="width: 50%;"
                                :return-object="true"
                            ></v-combobox>

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


