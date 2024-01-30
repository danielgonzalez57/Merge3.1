<script setup> 
// COMPONENTES
import Navv from '../components/Nav.vue'
// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// VARIABLES
const route = useRoute()
const router = useRouter()
const valor = ref(false);
const info = ref([]);
const loadingInfo = ref(false);
const search = ref('')
const medicionEdit = ref([]);
const rol = localStorage.rol;

const idMedicion = ref('')
const idInvest = ref('')
const hora = ref('')
const nro_visitantes = ref('')
const nro_facturas = ref('')
const investigador = ref('')

// URL
const id = ref('')
id.value = route.params.key 

const idDos = ref('')
idDos.value = route.params.keyDos 

const usuario = ref('')
usuario.value = localStorage.usuario;

// FUNCTION PARA LLENAR TABLE
async function getInvestProd(){
    loadingInfo.value = true
    try{
      //const response = await axios.post(`https://teelspay.com:3001/api/v1/dataInvProdFilterDos`, {valor: usuario.value, valorDos: idDos.value});
      // const response = await axios.get(`https://teelspay.com:3001/api/v1/dataInvProdFilterDos/${idDos.value}`, {valor: usuari+o.value, valorDos: id.value});
      const response = await axios.get(`https://teelspay.com:3001/api/v1/dataInvProdFilterDos/${idDos.value}`);
      info.value =  response.data[0]
    
    } catch(error){

      console.log(error)

    }
    loadingInfo.value = false
}

async function getFilterMedicion(){
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/medicionFilter/${idDos.value}`)
        medicionEdit.value =  response.data
    } catch(error){
        console.log(error)
    }
}

async function eliminarInvestigacionPro(id) {
    try {
        await axios.delete(`https://teelspay.com:3001/api/v1/investProducts/delete/${id}`);
    } catch (error) {
        console.log(error)
    }
}

onMounted( async () => {

await getFilterMedicion();
await getInvestProd();


    idInvest.value = medicionEdit.value.id_invest
    hora.value = medicionEdit.value.hora
    nro_visitantes.value = medicionEdit.value.nro_visitantes
    nro_facturas.value = medicionEdit.value.nro_facturas
});

// NOMBRE DE COLUMNAS DE LA TABLAS
const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'Id',},
  {title: 'Id medicion', align: 'start', sortable: false, key: 'id_medicion',},
  {title: 'Articulo', key: 'id_art'},
  {title: 'Marca', key: 'id_marca'},
  {title: 'Modelo', key: 'id_modelo', sortable: false},
  {title: 'Descri.', key: 'descrip', sortable: false},
  {title: 'Precio', key: 'precio', sortable: false},
  {title: 'Sub total.', key: 'sub_total', sortable: false},
  {title: 'Editar', key: 'editar', sortable: false},
  {title: 'Eliminar', key: 'eliminar', sortable: false},
]

function eliminardata(id){
    Swal.fire({
        title: "¿Desea eliminar este dato?",
        text: "No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Si, Eliminar!",
        background: '#3A3B3C',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarInvestigacionPro(id)
            Swal.fire({
            title: "Eliminado!",
            text: "Data eliminada con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) {
                    
                    location.reload();
                }
            });
    
        }
    });
}
</script>

<template>
    <Navv :class="{ close: valor }" />
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
                  <i class="ri-dashboard-2-line"></i>
                  <span class="text">Medicion</span>
              </div>
              <router-link :to="{path:`/investigacion/${id}`}"> 
                  <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                      Volver
                  </v-btn>
              </router-link>
          </div>
          <br>
          <div class="activity">
            <v-form>
            <v-container>
              <v-row>
                <!-- INPUT -->
                <v-col cols="12" md="4">
                  <label class="label_filter" for="">Id medicion</label>
                  
                  <v-text-field
                    readonly
                    v-model="idDos"
                    variant="outlined"
                    :counter="10"
                    placeholder="placeholder"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    
                  <label class="label_filter" for="">Id investigacion</label>
                  <v-text-field
                    readonly
                    v-model="idInvest"
                    variant="outlined"
                    :counter="10"
                    placeholder="placeholder"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                 <!-- INPUT -->
                 <v-col cols="12" md="4">
                  <label class="label_filter" for="">Hora</label>
                  <v-text-field
                    readonly
                    v-model="hora"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <!-- INPUT -->
                <v-col cols="12" md="4">
                  <label class="label_filter" for="">Numero de visitantes</label>
                  <v-text-field
                    readonly
                    v-model="nro_visitantes"
                    variant="outlined"
                    :counter="10"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                <!-- INPUT -->
                <v-col cols="12" md="4">
                  <label class="label_filter" for="">Numeros de Facturas</label>
                  <v-text-field
                    readonly
                    v-model="nro_facturas"
                    :counter="10"
                    hide-details
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

              </v-row>
            </v-container>
            </v-form>

            <div class="title">
                <span class="text">Investigacion producto asociadas</span>
            </div>

            <div class="datatable-container">
              <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li v-if="rol == 'inves'">
                                <router-link :to="{path:'/investProductsCreate/'+id+'/'+idDos}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'admin'">
                                <router-link :to="{path:'/investProductsCreate/'+id+'/'+idDos}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li  v-if="rol == 'admaster'">
                                <router-link :to="{path:'/investProductsCreate/'+id+'/'+idDos}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li  v-if="rol == 'rrss'">
                                <router-link :to="{path:'/investigacionProdRrss/'+id+'/'+idDos}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    </div>
                    <!-- DATATABLE -->
                    <v-divider></v-divider>
                    <v-data-table 
                            
                            v-model:search="search"
                            :loading="loadingInfo"
                            :headers="headers"
                            :items="info"
                            :sort-by="[{ key: 'id', order: 'asc' }]"
                          >
                            <template v-slot:top >
                              
                              <v-card-title class="d-flex align-center pe-2">

                                  <v-icon icon="mdi-video-input-component"></v-icon> &nbsp;
                              
                                  <v-spacer></v-spacer>

                                  <!-- BUSCADOR -->
                                  <v-text-field
                                    v-model="search"
                                    prepend-inner-icon="mdi-magnify"
                                    density="compact"
                                    label="Buscar"
                                    single-line
                                    flat
                                    hide-details
                                    variant="solo-filled"
                                  ></v-text-field>

                              </v-card-title>
                              
                            </template>
                            <template v-slot:item.ver="{ item }">
                                <router-link :to="{path:'medicionesEdit/'+item.id}"> 
                                  <v-icon size="x-large" class="me-4" color="blue-darken-3">
                                  mdi-eye
                                </v-icon>
                                </router-link>
                              </template>

                              <!-- BOTONES ELIMINAR Y EDITAR -->
                              <template v-slot:item.editar="{ item }">
                                <router-link :to="{path:`/invesProductsEdit/${id}/${idDos}/`+item.Id}"> 
                                  <v-icon size="x-large" class="me-4" color="amber">
                                  mdi-pencil
                                </v-icon>
                                </router-link>
                              </template>

                              <template v-slot:item.eliminar="{ item }">
                                  <v-icon size="x-large"  color="red-darken-3" @click="eliminardata(item.Id)">
                                    mdi-delete
                                  </v-icon>
                              </template>

                    </v-data-table>
                  <br>
            </div>
            
                    
          </div>
        </div>
        
    </section>
</template>
<style>

nav.v-pagination{
    display: none;
}

</style>

