<script setup> 

// COMPONENTES
import Nav from '../components/Nav.vue'

// LIBRERIAS
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
 
DataTable.use(DataTablesCore);
 
// VARIABLES
const route = useRoute()
const router = useRouter()
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
  {title: 'Linea', align: 'start', sortable: false, key: 'nombre',},
  {title: 'Codigo sap', key: 'cod_sap'},
  {title: 'Editar', key: 'editar', sortable: false},
  {title: 'Eliminar', key: 'eliminar', sortable: false},
]

// FUNCTION PARA LLENAR TABLE
async function getLinea(){
    loadingInfo.value = true
    try{
        const response = await axios.get(`http://149.50.131.95:3001/api/v1/lineasAll`);
        info.value =  response.data

    } catch(error){
        console.log(error)

    }
    loadingInfo.value = false
}

onMounted( async () => {

   await getLinea();

});
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
                    <span class="text">Maestro de Lineas</span>

                </div>
            </div>
            
            <div class="activity">

                <div class="datatable-container">
                    <div class="header-tools">
                    <div class="tools">
                        <ul> 
                            <li>
                                <router-link to="/lineaCreate">
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
                          <router-link :to="{path:'lineaEdit/'+item.id}"> 
                            <v-icon size="x-large" class="me-4" color="amber">
                            mdi-pencil
                          </v-icon>
                          </router-link>
                        </template>

                        <template v-slot:item.eliminar="{ item }">
                          <router-link :to="{path:'lineaDelete/'+item.id}"> 
                            <v-icon size="x-large"  color="red-darken-3">
                              mdi-delete
                            </v-icon>
                          </router-link>
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


