<script setup> 
// COMPONENTES
import Nav from '../components/Nav.vue'

// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// VARIABLES
const rol = localStorage.rol;
const route = useRoute()
const router = useRouter()
const valor = ref(false);
const info = ref([]);
const loadingInfo = ref(false);
const search = ref('')

// URL
const id = ref('')
id.value = route.params.key 

const usuario = ref('')
usuario.value = localStorage.usuario;

// NOMBRE DE COLUMNAS DE LA TABLAS
const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'id',},
  {title: 'Fecha', align: 'start', sortable: false, key: 'fecha',},
  {title: 'Tienda', align: 'start', sortable: false, key: 'id_tienda',},
  { title: 'Motivo', key: 'motivo' },
  { title: 'Investigador', key: 'user_crea' },
  { title: 'Ver', key: 'ver', sortable: false },
  { title: 'Editar', key: 'editar', sortable: false },
  { title: 'Eliminar', key: 'eliminar', sortable: false },
]

// FUNCTION PARA LLENAR TABLE
async function getInvestigacion(){
    loadingInfo.value = true
        try{

            if(rol === 'admin'){
                const response = await axios.get(`http://149.50.131.95:3001/api/v1/investigacionAll`);
                info.value =  response.data
            }else{
                const response = await axios.post(`http://149.50.131.95:3001/api/v1/dataUSerFilter`, {valor: usuario.value});
                info.value =  response.data
            }

        } catch(error){

            console.log(error)
        }
    loadingInfo.value = false
}

async function eliminarInvestigacion(id){
          
          try{
              await axios.delete(`http://149.50.131.95:3001/api/v1/investigacionDelete/${id}`);
      
          } catch(error){
              console.log(error)
          }
      
      }

onMounted( async () => {

   await getInvestigacion();

});

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
            eliminarInvestigacion(id)
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
    <Nav :class="{ close: valor }" />
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
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li v-if="rol == 'inves'">
                                <router-link to="/invesAccion-create">
                                    <button class="topi" >
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'admin'">
                                <router-link to="/invesAccion-create">
                                    <button class="topi" >
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'admaster'">
                                <router-link to="/invesAccion-create">
                                    <button class="topi" >
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            <li v-if="rol == 'rrss'">
                                <router-link to="/investigacionRrss">
                                    <button class="topi" >
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                            
                        </ul>
                    </div>

                   
                    </div>

                    <!-- DATATABLE -->
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
                          <router-link :to="{path:'investigacion/'+item.id}"> 
                            <v-icon size="x-large" class="me-4" color="blue-darken-3">
                            mdi-eye
                          </v-icon>
                          </router-link>
                        </template>

                        <!-- BOTONES ELIMINAR Y EDITAR -->
                        <template v-slot:item.editar="{ item }">
                          <router-link :to="{path:'invesAccion-edit/'+item.id}"> 
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
                </div>

            </div>
            
        </div>
    </section>
    
</template>


