<script setup>
import Nav from '../components/Nav.vue';
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';

const valor = ref(false)
import Swal from 'sweetalert2'
import router from '../router/index'
import {useRoute } from 'vue-router'

//SELECT CON DATA
const medicionget = ref()
const articuloget = ref()
const tipoartget = ref()
const tamanoget = ref()
const modeloget = ref()
const marcaget = ref()
const route = useRoute()
const param = ref()
const codSapget = ref() 
const Sm = ref() 

const id = ref('')
id.value = route.params.key 

const idDos = ref('')
idDos.value = route.params.keyDos

// INPUT QUE SE MULTIPLICAN
const precioAnterior = ref()
const cant = ref(1)
const precio = ref()
const multiplicationResult = ref(0);

watch([cant, precio], () => {
    multiplicationResult.value = cant.value * precio.value;
});

// watch(precio, () => {
//   if (precio.value === '') {
//     precioAnterior.value = 0
//   }
// })

// INPUTS
const id_medicion = ref(idDos)
const id_art = ref()
const id_tipo = ref()
const id_tam_cap = ref()
const id_modelo = ref()
const id_marca = ref()
const descrip = ref('')
const cod_sim_daka = ref()
const sub_total = ref(multiplicationResult)
const user_crea = ref(localStorage.usuario)


async function ultimoPrecio() {
    await axios.post('https://teelspay.com:3001/api/v1/ultimoPrecio', 
    {modelo: id_modelo.value, idInvest: id.value, idMedicion: idDos.value}) 
        .then(function (response) {
            if(response.data.length != 0){
                precioAnterior.value =  response.data[0].precio
            }else{
                precioAnterior.value = 0
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// BUSCADOR
async function searchModel() {
    await axios.post('https://teelspay.com:3001/api/v1/searchModelInvestProduct', {model: data.value.searchModelInput.title})
        .then(function (response) {

            if(response.data.length != 0){

                id_art.value =  response.data[0].Articulo
                id_tipo.value =  response.data[0].TipoArt
                id_tam_cap.value =  response.data[0].TamañoCap
                id_modelo.value =  response.data[0].id_Modelo
                id_marca.value =  response.data[0].Marca
                cod_sim_daka.value =  response.data[0].Codigo_sap
                descrip.value =  response.data[0].Descripcion
                
            } else {
                Swal.fire({
                    title: "El modelo no existe!",
                    text: "Desea crea un nuevo modelo?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Crear",
                    background: '#3A3B3C',
                    color: '#fff'
                    }).then((result) => {
                    if (result.isConfirmed) {
                         router.push(`/modeloClientes/${id.value}/${idDos.value}`);

                    }
                });
            }


        })
        .catch(function (error) {
            console.log(error);
        });

         // ultimoPrecio
        if(id_modelo.value){
            await ultimoPrecio()
        }
}

const data = ref({

    id_medicion: "",
    id_art: "",
    id_tipo: "",
    id_tam_cap: "",
    id_modelo: "",
    id_marca: "",
    descrip: "",
    cant: "",
    precio: "",
    sub_total: 10,
    user_crea: localStorage.usuario,
    user_mod: localStorage.usuario

});

// DATA
async function getCodSap(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/codSapAll`);
        codSapget.value = response.data[0].map(cod => ({
            title: cod.nombre,
            value: cod.id
        }));

    } catch(error){
        console.log(error)
    }
}

// DATA
async function getMediciones(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/medicionAll`);
        medicionget.value = response.data.map(medi => ({
            title: medi.id,
            value: medi.id,
        }));

    } catch(error){
        console.log(error)
    }
}

async function getArticulo(){


    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/articuloAll`);

        articuloget.value = response.data.map(art => ({
            title: art.nombre,
            value: art.id,
        }));

    } catch(error){
        console.log(error)
    }
}

async function getTipoArt(){

   const valorSeleccionado = id_art.value?.value


   let RUTA = ''

    if(param.value === 'new'){
        RUTA = `https://teelspay.com:3001/api/v1/tipoArticuloFilterDos/${valorSeleccionado}`
    }
    else{
        RUTA = 'https://teelspay.com:3001/api/v1/tipoArticuloAll'
    }

   try{
        const response = await axios.get(RUTA);
        tipoartget.value =  response.data.map(tipoArt => ({
            title: tipoArt.nombre,
            value: tipoArt.id,
        }));


    } catch(error){
        console.log(error)
    }
}

async function getTamano(){

    const valorSeleccionado = id_tipo.value?.value
    let RUTA = ''

    if(param.value === 'new'){
        RUTA = `https://teelspay.com:3001/api/v1/tamCapFilterSelect/${valorSeleccionado}`
    }
    else{
        RUTA = 'https://teelspay.com:3001/api/v1/tamCapAll'
    }
    try{
        const response = await axios.get(RUTA);

        tamanoget.value =  response.data.map(tamCap => ({
            title: tamCap.nombre,
            value: tamCap.id,
        }));


    } catch(error){
        console.log(error)
    }
}

async function getModelo(){

    // const valorSeleccionado = id_tam_cap.value?.value
    let RUTA = ''

    if(param.value === 'new'){
        RUTA = `https://teelspay.com:3001/api/v1/modeloAll`
    }
    else{
        RUTA = 'https://teelspay.com:3001/api/v1/modeloAll'
    }

    try{
        const response = await axios.get(RUTA);
        modeloget.value =  response.data.map(modelo => ({
            title: modelo.nombre,
            value: modelo.id,
            id_marca: modelo.id_marca
        }));

    } catch(error){
        console.log(error)
    }
}

async function getMarca(){
    const valorSeleccionado = id_modelo.value?.id_marca
    console.log(valorSeleccionado)
    let RUTA = ''

    if(param.value === 'new'){
        RUTA = `https://teelspay.com:3001/api/v1/marcasAll`
    }
    else{
        RUTA = 'https://teelspay.com:3001/api/v1/marcasAll'
    }


    try{
        const response = await axios.get('https://teelspay.com:3001/api/v1/marcasAll');
        marcaget.value =  response.data.map(marca => ({
            title: marca.nombre,
            value: marca.id,
        }));

    } catch(error){
        console.log(error)
    }
}

// CREAR INVESTIGACION PROD
async function crearInvestPro(dataJson){

    try{
        await axios.post('https://teelspay.com:3001/api/v1/invesProductCreated', dataJson)
        
    } catch(error){
        console.log(error)
    }          
        
        
}

async function seachModelo(){

try{
    const response = await axios.get('https://teelspay.com:3001/api/v1/modeloAll');
    Sm.value =  response.data.map(modelo => ({
        title: modelo.nombre
    }));

} catch(error){
    console.log(error)
}
}

onMounted( async () => {

    await getMediciones();
    await getArticulo();
    await seachModelo();
    await getTipoArt();
    await getTamano();
    await getModelo();
    await getMarca();
    await getCodSap();

   // ultimoPrecio

});

function crearDataInvest(){
    const dataJson = {
        id_medicion:id_medicion.value,
        id_art: param.value === 'new' ? id_art.value.value : id_art.value,
        id_tipo:param.value === 'new' ? id_tipo.value.value : id_tipo.value,
        id_tam_cap: param.value === 'new' ? id_tam_cap.value.value : id_tam_cap.value,
        id_modelo: param.value === 'new' ? id_modelo.value.value : id_modelo.value, 
        id_marca:id_marca.value ,
        descrip:descrip.value,
        cant:cant.value ,
        precio:precio.value ,
        sub_total:sub_total.value ,
        cod_sim_daka:cod_sim_daka.value ,
        user_crea:user_crea.value
    }

    // FUNCTION PARA CREAR
    Swal.fire({
        title: "Alerta",
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
                crearInvestPro(dataJson)
                Swal.fire({
                title: "Creado!",
                text: "Data creada con exito!!!",
                icon: "success",
                background: '#3A3B3C',
                color: '#fff'
                }).then((result) => {
                if (result.isConfirmed) {
                    router.push(`/medicion/${id.value}/${idDos.value}`); 
                    }
                });
            }
        });
}

</script>
<template >
    <Nav :class="{ close: valor }" />
    <section class="dashboard">

        <div class="top">
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
                    <span class="text">Investición de producto</span>
                </div>

                <router-link :to="{path:'/medicion/'+id+'/'+idDos}"> 
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>

            </div>
            <br>
            <div class="activity">
                <section class="container_form1">

                        <label class="label_filter" for="">Buscador de articulo por modelo</label>
                        <div>
                            <v-col cols="12 sm:4">
                                <v-combobox
                                    class="input-auto"
                                    clearable
                                    v-model="data.searchModelInput"
                                    placeholder="Busca el modelo"
                                    :items="Sm"
                                    variant="outlined"
                                ></v-combobox>
                                <v-btn color="green-accent-4" text @click="searchModel">
                                    Buscar
                                </v-btn>
                                </v-col>
                        </div>
                        <br>

                        <div class="formulario-cont">
                            <form @submit.prevent="crearDataInvest">

                                <label class="label_filter" for="id_medicion">Id Medicion</label>
                                <v-combobox
                                    class="input-auto"
                                    id="id_medicion"
                                    readonly  
                                    required
                                    chips
                                    v-model="id_medicion"
                                    name="id_medicion"
                                    placeholder="Selecciona el id investigacion"
                                    :items="info"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="art">Articulo</label>
                                <v-combobox
                                    class="input-auto"
                                    id="art"
                                    readonly
                                    required
                                    chips
                                    v-model="id_art"
                                    name="id_art"
                                    @update:modelValue="getTipoArt"
                                    placeholder="Selecciona el articulo"
                                    :items="articuloget"
                                    variant="outlined"
                                    :return-object="true"
                                ></v-combobox>

                                <label class="label_filter" for="tipo">Tipo Articulo</label>
                                <v-combobox
                                    class="input-auto"
                                    id="tipo"
                                    readonly  
                                    required
                                    chips
                                    v-model="id_tipo"
                                    @update:modelValue="getTamano"
                                    name="id_tipo"
                                    placeholder="Selecciona el tipo articulo"
                                    :items="tipoartget"
                                    variant="outlined"
                                    :return-object="true"
                                ></v-combobox>

                                <label class="label_filter" for="tc">Tamaño Capacidad</label>
                                <v-combobox
                                    class="input-auto"
                                    id="tc"
                                    readonly 
                                    required
                                    chips
                                    v-model="id_tam_cap"
                                    name="id_tam_cap"
                                    @update:modelValue="getModelo"
                                    placeholder="Selecciona el tamaño capacidad"
                                    :items="tamanoget"
                                    variant="outlined"
                                ></v-combobox>

                                <label class="label_filter" for="modelo">Modelo</label>
                                <v-combobox
                                    class="input-auto"
                                    id="modelo"
                                    readonly 
                                    required
                                    chips
                                    v-model="id_modelo"
                                    @update:modelValue="getMarca"
                                    name="id_modelo"
                                    placeholder="Selecciona el modelo"
                                    :items="modeloget"
                                    variant="outlined"
                                ></v-combobox>

                                <label class="label_filter" for="marca">Marca</label>
                                <v-combobox
                                    class="input-auto"
                                    id="marca"
                                    readonly 
                                    required
                                    chips
                                    v-model="id_marca"
                                    name="id_marca"
                                    placeholder="Selecciona una marca"
                                    :items="marcaget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="descrip">Descripción</label>
                                <v-text-field
                                    type="text"
                                    id="descrip"
                                    v-model="descrip"
                                    placeholder="Numero de visitantes"
                                    :rules="[v => !!v || 'La descripcion es requerida']"
                                    variant="outlined"
                                    :counter="10"
                                ></v-text-field>

                                <label class="label_filter" for="sap">Codigo Similar Propio</label>
                                <v-autocomplete
                                    class="input-auto"
                                    id="sap"
                                    chips
                                    v-model="cod_sim_daka"
                                    name="cod_sim_daka"
                                    placeholder="Selecciona un codigo similar"
                                    :items="codSapget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-autocomplete>

                                <label class="label_filter" for="cant">Cantidad</label>
                                <v-text-field
                                    type="number"
                                    readonly
                                    id="cant"
                                    v-model="cant"
                                    placeholder="Numero de visitantes"
                                    :rules="[v => !!v && v >= 0 || 'La cantidad es requerida']"
                                    variant="outlined"
                                ></v-text-field>
                                
                                <label class="label_filter" for="precio">Precio</label>
                                <v-text-field
                                    type="number"
                                    id="precio"
                                    v-model="precio"
                                    placeholder="Precio"
                                    :rules="[v => !!v && v >= 0]"
                                    variant="outlined"
                                ></v-text-field>
                                <p v-if="precioAnterior && precioAnterior > 0" class="precioAnt">Precio: ${{ precioAnterior }}</p>


                                <label class="label_filter" for="sub_total">Subtotal</label>
                                <v-text-field
                                    readonly
                                    type="number"
                                    id="sub_total"
                                    v-model="sub_total"
                                    placeholder="Cantidad"
                                    :rules="[v => !!v && v >= 0 || 'El sub total es requerido']"
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
                                    :disabled="!id_medicion || !id_art  || !id_tipo || !id_tam_cap  || !id_modelo || !id_marca || !descrip || !cant || !precio">
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


<style >
[data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 lid  red;
}

.input-modelo{
    padding: 7px;
    border-radius: 3px;
    border: 1px solid  ;
}

.formkit-inner {
   width: 100%;
}
.formkit-form{

    width: 80%;

}

.filtrador{
    margin-bottom: 1rem;
}

.filtrador .filter-medicion{
    padding: 1rem;
}

.label_filter{
    font-weight: 600;
    font-size: 14px;
}

.input-container {
  position: relative;
  display: flex;
  height: 2.8rem;
  width: 100%;
  min-width: 200px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 20px 20px 30px rgba(0, 0, 0, .05);
}

.input-container input {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  border: 1px solid  rgb(176 190 197);
  background-color: transparent;
  padding: 0.625rem 70px 0.625rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: rgb(69 90 100);
  outline: none;
  transition: all .15s cubic-bezier(0.4, 0, 0.2, 1);
}

.input-container input:focus {
  border: 1px solid #00aa3c;
}

.invite-btn {
  position: absolute;
  width: 65px;
  right: 4px;
  top: 4px;
  bottom: 4px;
  z-index: 10;
  border-radius: 4px;
  background-color: #00aa3c;
  color: #fff;
  padding-top: .25rem;
  padding-bottom: .25rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  text-align: center;
  vertical-align: middle;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  border: none;
  transition: .6s ease;
}

.invite-btn:hover {
  right: 2px;
  top: 2px;
  bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
}

.input-container input:placeholder-shown ~ .invite-btn {
  pointer-events: none;
  background-color: gray;
  opacity: 0.5;
}

.v-autocomplete, .v-combobox{
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
}
</style>



