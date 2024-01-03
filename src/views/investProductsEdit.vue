<script setup>
import Nav from '../components/Nav.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { ref, onMounted, computed, watch  } from 'vue';
import {  useRoute, useRouter } from 'vue-router'

const usuario = localStorage.usuario;
const medicionget = ref()
const articuloget = ref()
const tipoartget = ref()
const tamanoget = ref()
const modeloget = ref()
const codSapget = ref() 
const marcaget = ref()

const cant = ref()
const precio = ref()
const multiplicationResult = ref(0);
const route = useRoute()
const router = useRouter()
const valor = ref(false)
const investigacionProEdit = ref([]);

const id_medicion = ref('')
const id_art = ref('')
const id_tipo = ref('')
const id_tam_cap = ref('')
const id_modelo = ref('')
const id_marca = ref('')
const descrip = ref('')
const cod_sim_daka = ref()
const sub_total = ref(multiplicationResult)
const user_crea = ref(localStorage.usuario)
const user_mod = ref('')

// URL
const id = ref('')
id.value = route.params.key

const idDos = ref('')
idDos.value = route.params.keyDos

const idTres = ref('')
idTres.value = route.params.keyTres
console.log(id.value)

watch([cant, precio], () => {
      multiplicationResult.value = cant.value * precio.value;
    });

async function getFilterInvestigacionPro(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/investProducts/${idTres.value}`)
        investigacionProEdit.value =  response.data
    } catch(error){
        console.log(error)

    }
}

async function postInvestigacionProductpro(jsonInvesPro, id){
    
    try{
        await axios.put(`http://149.50.131.95:3001/api/v1/investProductUpdate/${idTres.value}`, jsonInvesPro)

    } catch(error){
        console.log(error)
        
    }
}

// DATA
async function getCodSap(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/codSapAll`);
        codSapget.value = response.data[0].map(cod => ({
            title: cod.nombre,
            value: cod.id
        }));

    } catch(error){
        console.log(error)
    }
}

// SELCCIONAR DATOS -------------------------------------------------------------------------- //
async function getMediciones(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/medicionAll`);
        
        medicionget.value =  response.data.map(medi => ({
            title: medi.id,
            value: medi.id,
        }));
        
        
    } catch(error){
        console.log(error)
    }
}

async function getArticulo(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/articuloAll`);
        
        articuloget.value =  response.data.map(art => ({
            title: art.nombre,
            value: art.id,
        }));
        
    } catch(error){
        console.log(error)
    }
}

async function getTipoArt(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tipoArticuloAll`);
        
        tipoartget.value =  response.data.map(tipoArt => ({
            title: tipoArt.nombre,
            value: tipoArt.id,
        }));
        
        
    } catch(error){
        console.log(error)
    }
}

async function getTamano(){
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/tamCapAll`);
        
        tamanoget.value =  response.data.map(tamCap => ({
            title: tamCap.nombre,
            value: tamCap.id,
        }));
        
        
    } catch(error){
        console.log(error)
    }
}

async function getModelo(){ 
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/modeloAll`);
        
        modeloget.value =  response.data.map(modelo => ({
            title: modelo.nombre,
            value: modelo.id,
        }));
        
        
    } catch(error){
        console.log(error)
    }
}

async function getMarca(){ 
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/marcasAll`);
        
        marcaget.value =  response.data.map(marca => ({
            title: marca.nombre,
            value: marca.id,
        }));
        
        
    } catch(error){
        console.log(error)
    }
}

onMounted( async () => {
    
    await getFilterInvestigacionPro();
    await getMediciones();
    await getArticulo();
    await getTipoArt();
    await getTamano();
    await getModelo();
    await getMarca();
    await getCodSap();
    
    id_medicion.value = investigacionProEdit.value.id_medicion
    id_art.value = investigacionProEdit.value.id_art
    id_tipo.value = investigacionProEdit.value.id_tipo
    id_tam_cap.value = investigacionProEdit.value.id_tam_cap
    id_modelo.value = investigacionProEdit.value.id_modelo
    id_marca.value = investigacionProEdit.value.id_marca
    descrip.value = investigacionProEdit.value.descrip
    cant.value = investigacionProEdit.value.cant
    precio.value = investigacionProEdit.value.precio
    cod_sim_daka.value = investigacionProEdit.value.cod_sim_daka
    sub_total.value = investigacionProEdit.value.sub_total
    user_crea.value = investigacionProEdit.value.user_crea
    user_mod.value = usuario
    
});

function UpdateData(){
    
    const jsonInvesPro = {
        id_medicion:id_medicion.value, 
        id_art:id_art.value,
        id_tipo:id_tipo.value,
        id_tam_cap:id_tam_cap.value ,
        id_modelo:id_modelo.value ,
        id_marca:id_marca.value ,
        descrip:descrip.value ,
        cant:cant.value ,
        precio:precio.value ,
        sub_total:sub_total.value ,
        user_crea:user_crea.value ,
        cod_sim_daka:cod_sim_daka.value ,
        user_mod:user_mod.value, 
        
    }

    Swal.fire({
        title: "Alerta!",
        text: "¿Desea editar estos datos?",
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
            postInvestigacionProductpro(jsonInvesPro, id)
            Swal.fire({
            title: "Guardado!",
            text: "Datos editados con exito!!!",
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
<template>
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
                    <span class="text">Editar Investigacion de productos</span>
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

                    <div class="formulario-cont">
                        <form @submit.prevent="UpdateData">

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
                                :rules="[v => !!v && v >= 0 || 'El precio es requerido']"
                                variant="outlined"
                            ></v-text-field>

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
                    <!-- <div class="container_form">

                        <FormKit 
                            type="form"  
                            @submit="UpdateData" 
                            submit-label="Registrar" 
                            method="post">

                           <label class="label_filter" for="">Id medicion</label>
                           <v-combobox
                                required
                                readonly
                                chips
                                v-model="id_medicion"
                                name="id_medicion"
                                placeholder="Selecciona el id medicion"
                                :items="medicionget"
                                variant="outlined"
                                :return-object="true"
                            ></v-combobox>

                            <label class="label_filter" for="">Articulo</label>
                                <v-combobox
                                    required="true"
                                    chips
                                    v-model="id_art"
                                    name="id_art"
                                    placeholder="Selecciona el articulo"
                                    :items="articuloget"
                                    variant="outlined"
                                    :return-object="true"
                                ></v-combobox>

                                <label class="label_filter" for="">Tipo articulo</label>
                                <v-combobox
                                    clearable
                                    chips
                                    v-model="id_tipo"
                                    name="id_tipo"
                                    placeholder="Selecciona el tipo articulo"
                                    :items="tipoartget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Tamaño Capacidad</label>
                                <v-combobox
                                    clearable
                                    chips
                                    v-model="id_tam_cap"
                                    name="id_tam_cap"
                                    placeholder="Selecciona el tamaño capacidad"
                                    :items="tamanoget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Modelo</label>
                                <v-combobox
                                    clearable
                                    chips
                                    v-model="id_modelo"
                                    name="id_modelo"
                                    placeholder="Selecciona el modelo"
                                    :items="modeloget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>

                                <label class="label_filter" for="">Marca</label>
                                <v-combobox
                                    clearable
                                    chips
                                    v-model="id_marca"
                                    name="id_marca"
                                    placeholder="Selecciona una marca"
                                    :items="marcaget"
                                    variant="outlined"
                                    :return-object="false"
                                ></v-combobox>
                    

                            <FormKit v-model="descrip" type="text" label="Descripción" value="descrip"
                                 placeholder="Descripción" maxlength="99" minlength="10"
                                validation="required" :validation-messages="{
                                    required: 'Escriba una descripción',
                                }" help="" />

                            <label class="label_filter" for="">Codigo Similar Propio</label>
                            <v-combobox
                                clearable
                                chips
                                v-model="cod_sim_daka"
                                name="cod_sim_daka"
                                placeholder="Selecciona un codigo similar"
                                :items="codSapget"
                                variant="outlined"
                                :return-object="false"
                            ></v-combobox>

                            <FormKit v-model="cant" type="number" label="Cantidad" value="cant" 
                                 validation="required" :validation-messages="{
                                    required: 'Ingrese la cantidad',
                                }" help="" />

                            <FormKit v-model="precio" type="number" step="0.01" label="Precio" value="precio"
                                 placeholder="Precio" validation="required" :validation-messages="{
                                    required: 'Ingre el precio',
                                }" help="" />

                            <FormKit v-model="sub_total" type="number" step="0.01 " label="SubTotal" value="sub_total"
                                 placeholder="SubTotal" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />

                            <FormKit v-model="user_crea" type="text" label="Creado por" value="user_crea"
                                 placeholder="" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />

                            <FormKit v-model="user_mod" type="text" label="Modificado por" value="user_mod"
                                 placeholder="" validation="required" disabled
                                :validation-messages="{
                                    required: '',
                                }" help="" />
                           
                        </FormKit>

                    </div> -->
                </section>
            </div>
        </div>
        <br>
        <br>
    </section>
</template>

<style>
[data-invalid] .formkit-inner {
    border-color: red;
    box-shadow: 0 0 0 1px red;
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
</style> 

