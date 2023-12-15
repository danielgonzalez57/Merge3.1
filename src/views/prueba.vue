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
const investigacionEdit = ref([]);
const rol = localStorage.rol;

const idInvest = ref('')
const fecha = ref('')
const id_tienda = ref('')
const motivo = ref('')
const user_crea = ref('')

// URL
const id = ref('')
id.value = route.params.key 

const usuario = ref('')
usuario.value = localStorage.usuario;

// FUNCTION PARA LLENAR TABLE
async function getMedicion(){
    loadingInfo.value = true
    try{
      const response = await axios.get(`http://149.50.131.95:3001/api/v1/dataMedicionFilterDos/${id.value}`);
      info.value =  response.data
    
    } catch(error){

      console.log(error)

    }
    loadingInfo.value = false
}

async function getFilterInvestigacion(){
    
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/InvestigacionFilter/${id.value}`)
        investigacionEdit.value =  response.data
    } catch(error){
        console.log(error)

    }
}

async function eliminarMedicion(id){    
    try{
        await axios.delete(`http://149.50.131.95:3001/api/v1/mediciondelete/${id}`);
    } catch(error){
        console.log(error)
    }
      
}

onMounted( async () => {

await getFilterInvestigacion();
await getMedicion();

    idInvest.value = investigacionEdit.value.id
    fecha.value = investigacionEdit.value.fecha
    id_tienda.value = investigacionEdit.value.id_tienda
    motivo.value = investigacionEdit.value.motivo
    user_crea.value = investigacionEdit.value.user_crea
});

// NOMBRE DE COLUMNAS DE LA TABLAS
const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'id',},
  {title: 'Id investigacion', align: 'start', sortable: false, key: 'id_invest',},
  {title: 'Hora', key: 'hora'},
  {title: 'Numero visitantes', key: 'nro_visitantes'},
  {title: 'Numero facturas', key: 'nro_facturas'},
  {title: 'Ver', key: 'ver', sortable: false},
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
            eliminarMedicion(id)
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
                  <span class="text">Investigacion</span>
              </div>
              <router-link to="/InvesAccion">
                  <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                      Volver
                  </v-btn>
              </router-link>
          </div>
          <br>
          <div class="activity">
            <v-form v-model="valid">
            <v-container>
              <v-row>
                <!-- INPUT -->
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
                  <label class="label_filter" for="">Fecha</label>
                  <v-text-field
                    readonly
                    v-model="fecha"
                    :counter="10"
                    hide-details
                    variant="outlined"
                    required
                  ></v-text-field>
                </v-col>

                 <!-- INPUT -->
                 <v-col cols="12" md="4">
                  <label class="label_filter" for="">Tienda</label>
                  <v-text-field
                    readonly
                    v-model="id_tienda"
                    variant="outlined"
                    hide-details
                    required
                  ></v-text-field>
                </v-col>
                <!-- INPUT -->
                <v-col cols="12" md="4">
                  <label class="label_filter" for="">Motivo</label>
                  <v-text-field
                    readonly
                    v-model="motivo"
                    variant="outlined"
                    :counter="10"
                    required
                    hide-details
                  ></v-text-field>
                </v-col>

                <!-- INPUT -->
                <v-col cols="12" md="4">
                  <label class="label_filter" for="">Investigador</label>
                  <v-text-field
                    readonly
                    v-model="user_crea"
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
                <span class="text">Mediciones Asociadas</span>
            </div>

            <div class="datatable-container">
              <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li v-if="rol == 'inves'">
                                <router-link :to="{path:'medicionesCreate/'+id}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'admin'">
                                <router-link :to="{path:'medicionesCreate/'+id}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'admaster'">
                                <router-link :to="{path:'medicionesCreate/'+id}"> 
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>

                            <li  v-if="rol == 'rrss'">
                                <router-link :to="{path:'medicionesCreateRrss/'+id}"> 
                                    <button class="topi">
                                        Crear RRSS
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
                                <router-link :to="{path:`/medicion/${id}/`+item.id}"> 
                                  <v-icon size="x-large" class="me-4" color="blue-darken-3">
                                  mdi-eye
                                </v-icon>
                                </router-link>
                              </template>

                              <!-- BOTONES ELIMINAR Y EDITAR -->
                              <template v-slot:item.editar="{ item }">
                                <router-link :to="{path:`/medicionesEdit/${id}/`+item.id}"> 
                                  <v-icon size="x-large" class="me-4" color="amber">
                                  mdi-pencil
                                </v-icon>
                                </router-link>
                              </template>

                              <template v-slot:item.eliminar="{ item }">
                                  <v-icon size="x-large"  color="red-darken-3" @click="eliminardata(item.id)">
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

