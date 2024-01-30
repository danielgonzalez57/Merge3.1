<script setup> 
// COMPONENTES
import Nav from '../components/Nav.vue'

// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

// VARIABLES
const route = useRoute()
const valor = ref(false);
const info = ref([]);
const loadingInfo = ref(false);
const search = ref('')
const rol = localStorage.rol;

// URL
const id = ref('')
id.value = route.params.key 

// NOMBRE DE COLUMNAS DE LA TABLAS
const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'id',},
  {title: 'Tienda', align: 'start', sortable: false, key: 'nombre',},
  {title: 'Latitud y longitud', key: 'latitud'},
  {title: 'Sucursal', key: 'longitud'},
  {title: 'Direccion', key: 'direccion'},
  {title: 'Editar', key: 'editar', sortable: false},
  {title: 'Eliminar', key: 'eliminar', sortable: false},
]

// FUNCTION PARA LLENAR TABLE
async function getMaestroTienda(){
    loadingInfo.value = true
    try{
        const response = await axios.get(`https://teelspay.com:3001/api/v1/maestroTiendaAll`);
        info.value =  response.data
    } catch(error){
        console.log(error)
    }
    loadingInfo.value = false
}

async function eliminarMaestroTienda(id){
          
          try{
              await axios.delete(`https://teelspay.com:3001/api/v1/maestroTiendaDelete/${id}`);
      
          } catch(error){
      
              console.log(error)
      
          }
      
      }

onMounted( async () => {

   await getMaestroTienda();

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
            eliminarMaestroTienda(id)
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
                    <span class="text">Maestro de Tiendas</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/maestroTiendasCreated">
                                    <button class="topi">
                                        Crear
                                    </button>
                                </router-link>
                            </li>
                        </ul>
                    </div>

                   
                    </div>

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

                        <!-- BOTONES ELIMINAR Y EDITAR -->
                        <template v-slot:item.editar="{ item }">
                          <router-link :to="{path:'maestroTiendasEdit/'+item.id}"> 
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


