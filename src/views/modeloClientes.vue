<script setup> 
import Nav from '../components/Nav.vue'

import { ref, onMounted, computed} from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const valor = ref(false)
const usuario = localStorage.usuario;
const rol = localStorage.rol;
const tamCap = ref([])
const marca = ref([])
const tipoartget = ref([])
const codSapget = ref() 

const id_art = ref()
const id_tam_cap = ref()
const id_marca = ref()
const nombre = ref()
const user_crea = ref(usuario)
const cod_sap = ref()
const descrip = ref('')

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

    const res = await axios.post(`https://teelspay.com:3001/api/v1/modeloFilterBuscador`, {model: dataJson.nombre})
    if(res.data.status === 'ok'){
        Swal.fire("Ese modelo ya existe!");
        
    }else if(res.data.status === 'Error'){

        const response = await axios.post(`https://teelspay.com:3001/api/v1/modeloCreated`, dataJson)
        if(response.data.status === 'ok'){
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
                });
                Toast.fire({
                icon: "success",
                title: "Modelo creado!",
                background: '#3A3B3C',
                color: '#fff'
                });

                if(rol == 'rrss'){
                    router.push(`/investigacionProdRrss/${id.value}/${idDos.value}`);
                }else{
                    router.push(`/investProductsCreate/${id.value}/${idDos.value}`);
                }
            }
    }else{
        alert('error')
       
        
    }
    
}

async function getTipoArt(){

try{
     const response = await axios.get('https://teelspay.com:3001/api/v1/tipoArticuloAll');
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

let RUTA = `https://teelspay.com:3001/api/v1/tamCapFilterSelect/${valorSeleccionado}`

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
//         const response = await axios.get(`https://teelspay.com:3001/api/v1/tamCapAll`);
//         tamCap.value = response.data.map(linea => ({
//             title: linea.nombre,
//             value: linea.id
//         }));

//     } catch(error){
 
//         console.log(error)
//     }
// }

// DATA
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

function crearDataModel(){
    const dataJson = {
        id_tam_cap:id_tam_cap.value,
        id_marca:id_marca .value,
        nombre:nombre.value,
        cod_sap:cod_sap.value,
        user_crea:user_crea.value,
        descrip:descrip.value,
    }

    // FUNCTION PARA CREAR
    const modelo = nombre.value
    modeloCreated(dataJson, modelo)
}

onMounted( async () => {

await getTipoArt();
await getTamCap();
await getMarca();
await getCodSap();

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

                        <div class="formulario-cont">
                        <form @submit.prevent="crearDataModel">
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

                            <label class="label_filter" for="id_tienda">Tipo de Articulo</label>
                            <v-combobox
                                class="input-auto"
                                clearable
                                required
                                chips
                                name="id_art"
                                v-model="id_art"
                                @update:modelValue="getTamCap"
                                :items="tipoartget"
                                placeholder="Selecciona el tipo articulo"
                                variant="outlined"
                                :return-object="true"
                            ></v-combobox>

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
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style>
    .container-combobox{
        width: 40%;
        min-width: 100%;
    }
    .comboInput{
        padding: 14px;
        border-radius: 5px;
        color: #999;
    }

    /* .v-autocomplete, .v-combobox{
    width: 50%;
    }
    @media (max-width: 1000px) {
  .v-autocomplete, .v-combobox{
    width: 61%;
  }
}
    @media (max-width: 900px) {
  .v-autocomplete, .v-combobox{
    width: 75%;
  }
}
    @media (max-width: 700px) {
  .v-autocomplete, .v-combobox{
    width: 100%;
  }
} */

.input-auto{
        width: 100%;
    }
 
</style>


