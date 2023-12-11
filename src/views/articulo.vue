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

// URL
const id = ref('')
id.value = route.params.key 

// NOMBRE DE COLUMNAS DE LA TABLAS
const headers = [
  {title: 'Id', align: 'start', sortable: false, key: 'id',},
  {title: 'Articulo', align: 'start', sortable: false, key: 'nombre',},
  { title: 'Linea', key: 'id_linea' },
  { title: 'Editar', key: 'editar', sortable: false },
  { title: 'Eliminar', key: 'eliminar', sortable: false },
]

// FUNCTION PARA LLENAR TABLE
async function getArticulo(){
    loadingInfo.value = true
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/articuloAll`);
        info.value =  response.data

    } catch(error){
        console.log(error)
    }
    loadingInfo.value = false
}

async function eliminarArticulo(id){
          
          try{
              await axios.delete(`http://149.50.131.95:3001/api/v1/articuloDelete/${id}`);
      
          } catch(error){
              console.log(error)
          }
      
      }
      

onMounted( async () => {

   await getArticulo();

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
            eliminarArticulo(id)
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
                    <span class="text">Maestro de Articulo</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/articuloCreate">
                                    <button class="topi">
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

                        <!-- BOTONES ELIMINAR Y EDITAR -->
                        <template v-slot:item.editar="{ item }">
                          <router-link :to="{path:'articuloEdit/'+item.id}"> 
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

<style scoped>
    .delete{
        color: #000;
        font-size: 21px;
        background-color: #d00000;
        padding: 7px 8px;
        border-radius: 3px;
        transition: 0.3s all ease;
        border: none;
    }
    .edit{
        color: #000;
        font-size: 21px;
        background-color: #faa307;
        padding: 4px 8px;
        border-radius: 3px;
        transition: 0.3s all ease;
    }
    .delete:hover{
        background-color: #a70000;
        cursor: pointer;
    }
    .edit:hover{
        background-color: #e99700;
    }
</style>


