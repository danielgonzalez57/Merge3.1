import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Dashboard from '../views/Dashboard.vue'
import User from '../views/user.vue'
import userCreate from '../views/userCreate.vue'
import InvesAccion from '../views/invesAccion.vue'
import InvesAccionCreate from '../views/invesAccion-create.vue'
import InvesAccionEdit from '../views/invesAccion-edit.vue'
import InvesAccionDelete from '../views/invesAccion-delete.vue'
import Mediciones from '../views/mediciones.vue'
import MedicionesCreate from '../views/medicionesCrear.vue'
import MedicionesCreateDos from '../views/medicionesCrearDos.vue'
import MedicionesCreateDosRrss from '../views/medicionesCrearDosRrss.vue'
import MedicionesCreateRrss from '../views/medicionesCrearRrss.vue'
import MedicionesEdit from '../views/medicionesEdit.vue'
import MaestroTienda from '../views/maestroTienda.vue'
import MaestroTiendaCreated from '../views/maestroTiendaCrear.vue'
import MaestroTiendaEdit from '../views/maestroTiendaEdit.vue'
import MaestroTiendaDelete from '../views/maestroTiendaDelete.vue'
import TipoArticulo from '../views/tipoArticulo.vue'
import TipoArticuloCreated from '../views/tipoArticuloCrear.vue'
import TipoArticuloUpdate from '../views/tipoArticuloEdit.vue'
import TipoArticuloDelete from '../views/tipoArticuloDelete.vue'
import TamCap from '../views/tamCap.vue'
import TamCapCreated from '../views/tamCapCreated.vue'
import TamCapEdit from '../views/tamCapEdit.vue'
import TamCapDelete from '../views/tamCapDelete.vue'
import Modelo from '../views/modelo.vue'
import ModeloCreated from '../views/modeloCreated.vue'
import ModeloEdit from '../views/modeloEdit.vue'
import ModeloDelete from '../views/modeloDelete.vue'
import Articulo from '../views/articulo.vue'
import ArticuloCreate from '../views/articulo.Create.vue'
import ArticuloEdit from '../views/articuloEdit.vue'
import ArticuloDelete from '../views/articuloDelete.vue'
import Marcas from '../views/marcas.vue'
import MarcasCreate from '../views/marcaCreate.vue'
import MarcaEdit from '../views/marcaEdit.vue'
import MarcaDelete from '../views/marcaEliminar.vue'
import Linea from '../views/lineas.vue'
import LineaCreate from '../views/lineaCreate.vue'
import LineaDelete from '../views/lineaDelete.vue'
import LineaEdit from '../views/lineaEdit.vue'
import userEdit from '../views/userEdit.vue'
import userDelete from '../views/userDelete.vue'
import InvesProducts from '../views/invesProducts.vue'
import InvestProductsCreate from '../views/InvestProductsCreate2.vue'
import InvesProductsDelete from '../views/InvesProductsDelete.vue'
import InvestProductsEdit from '../views/investProductsEdit.vue'
import prueba from '../views/prueba.vue'
import pruebaDos from '../views/pruebaDos.vue'
import investigacionProdRrss from '../views/investigacionProdRrss.vue'
import investigacionRrss from '../views/investigacionRrss.vue'
import modeloClientes from '../views/modeloClientes.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/usuario',
      name: 'User',
      component: User
    },
    {
      path: '/userCreate',
      name: 'userCreate',
      component: userCreate
    },
    {
      path: '/userEdit/:key',
      name: 'userEdit',
      component: userEdit
    },
    {
      path: '/userDelete/:key',
      name: 'userDelete',
      component: userDelete
    },
    {
      path: '/invesAccion',
      name: 'InvesAccion',
      component: InvesAccion
    },
    {
      path: '/invesAccion-create',
      name: 'InvesAccionCreate',
      component: InvesAccionCreate
    },
    {
      path: '/invesAccion-edit/:key',
      name: 'InvesAccionEdit',
      component: InvesAccionEdit
    },
    {
      path: '/invesAccion-delete/:key',
      name: 'InvesAccionDelete',
      component: InvesAccionDelete
    },
    {
      path: '/mediciones',
      name: 'Mediciones',
      component: Mediciones
    },
    {
      path: '/investigacion/medicionesCreate/:key',
      name: 'MedicionesCreate',
      component: MedicionesCreate
    },
    {
      path: '/medicionesCreateDos',
      name: 'MedicionesCreateDos',
      component: MedicionesCreateDos
    },
    {
      path: '/medicionesCreateDosRrss',
      name: 'MedicionesCreateDosRrss',
      component: MedicionesCreateDosRrss
    },
    {
      path: '/investigacion/medicionesCreateRrss/:key',
      name: 'MedicionesCreateRrss',
      component: MedicionesCreateRrss
    },
    {
      path: '/medicionesEdit/:key/:keyDos',
      name: 'MedicionesEdit',
      component: MedicionesEdit
    },
    {
      path: '/maestroTiendas',
      name: 'MaestroTiendas',
      component: MaestroTienda
    },
    {
      path: '/maestroTiendasCreated',
      name: 'MaestroTiendasCreated',
      component: MaestroTiendaCreated
    },
    {
      path: '/maestroTiendasEdit/:key',
      name: 'MaestroTiendasEdit',
      component: MaestroTiendaEdit
    },
    {
      path: '/maestroTiendaDelete/:key',
      name: 'MaestroTiendaDelete',
      component: MaestroTiendaDelete
    },
    {
      path: '/tipoArticulo',
      name: 'TipoArticulo',
      component: TipoArticulo
    },
    {
      path: '/tipoArticuloCreated',
      name: 'TipoArticuloCreated',
      component: TipoArticuloCreated
    },
    {
      path: '/tipoArticuloUpdate/:key',
      name: 'TipoArticuloUpdate',
      component: TipoArticuloUpdate
    },
    {
      path: '/tipoArticuloDelete/:key',
      name: 'TipoArticuloDelete',
      component: TipoArticuloDelete
    },
    {
      path: '/tamCap',
      name: 'TamCap',
      component: TamCap
    },
    {
      path: '/tamCapCreated',
      name: 'TamCapCreated',
      component: TamCapCreated
    },
    {
      path: '/tamCapEdit/:key',
      name: 'TamCapEdit',
      component: TamCapEdit
    },
    {
      path: '/tamCapDelete/:key',
      name: 'TamCapDelete',
      component: TamCapDelete
    },
    {
      path: '/modelo',
      name: 'Modelo',
      component: Modelo
    },
    {
      path: '/modeloCreated',
      name: 'ModeloCreated',
      component: ModeloCreated
    },
    {
      path: '/modeloEdit/:key',
      name: 'ModeloEdit',
      component: ModeloEdit
    },
    {
      path: '/modeloDelete/:key',
      name: 'ModeloDelete',
      component: ModeloDelete
    },
    // CHRISTIAN
    {
      path: '/articulo',
      name: 'Articulo',
      component: Articulo
    },

    {
      path: '/articuloCreate',
      name: 'ArticuloCreate',
      component: ArticuloCreate
    },
    
    {
      path: '/articuloEdit/:key',
      name: 'ArticuloEdit',
      component: ArticuloEdit
    },

    {
      path: '/articuloDelete/:key',
      name: 'ArticuloDelete',
      component: ArticuloDelete
    },

    {
      path: '/marcas',
      name: 'Marcas',
      component: Marcas
    },

    {
      path: '/marcasCreate',
      name: 'MarcasCreate',
      component: MarcasCreate
    },

    {
      path: '/marcaEdit/:key',
      name: 'MarcaEdit',
      component: MarcaEdit
    },
   
    {
      path: '/marcaDelete/:key',
      name: 'MarcaDelete',
      component: MarcaDelete
    },
    
    {
      path: '/lineas',
      name: 'Linea',
      component: Linea
    },
    
    {
      path: '/lineaCreate',
      name: 'LineaCreate',
      component: LineaCreate
    },

    {
      path: '/lineaDelete/:key',
      name: 'LineaDelete',
      component: LineaDelete
    },
    {
      path: '/lineaEdit/:key',
      name: 'LineaEdit',
      component: LineaEdit
    },

    // DILAN

    {
      path: '/investProductsCreate/:key/:keyDos',
      name: 'InvestProductsCreate',
      component: InvestProductsCreate
    },
    {
      path: '/investProducts',
      name: 'InvesProducts', 
      component: InvesProducts
    },

    {
      path: '/invesProductsDelete/:key',
      name: 'invesProductsDelete', 
      component: InvesProductsDelete
    },
    {
      path: '/invesProductsEdit/:key/:keyDos/:keyTres',
      name: 'InvestProductsEdit', 
      component: InvestProductsEdit
    },
    {
      path: '/investigacion/:key',
      name: 'prueba', 
      component: prueba
    },
    {
      path: '/medicion/:key/:keyDos',
      name: 'pruebaDos', 
      component: pruebaDos
    },
    {
      path: '/investigacionRrss',
      name: 'investigacionRrss', 
      component: investigacionRrss
    },
    {
      path: '/investigacionProdRrss/:key/:keyDos',
      name: 'investigacionProdRrss', 
      component: investigacionProdRrss
    },
    {
      path: '/modeloClientes/:key/:keyDos',
      name: 'modeloClientes', 
      component: modeloClientes
    },
    
  ],
  keepAlive: true
})

router.beforeEach( async (to) => {
  // RUTAS EN EL QUE USUARIO PUEDE ACCEDER SI NO SE A LOGEADO
  const publicPages = ['/'];
  const authRequired =! publicPages.includes(to.path);

  // SI LA VARIABLE token ES NULA 
  if(authRequired && !localStorage.token){ 
    return '/';
  }
})

export default router


