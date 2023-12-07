<script setup>

import { useAuthStore } from '../stores/counter.js';
import { useDark, useToggle } from "@vueuse/core";


const isDark = useDark({
    selector: "body"
});

const toggleDark = useToggle(isDark);

const authStore = useAuthStore();

const rol = localStorage.rol;
const cerrar = localStorage.class;

const claseNav = () => {
    if(cerrar === 'close'){
        return true;
    }
}

</script>

<template>
   <nav :class="[claseNav ? '' : 'close']">
        <router-link to="/dashboard">
            <div class="logo-name">
                <div class="logo-image">
                    <img src="../assets/mezcla.png" alt="Logo merge">
                </div>

                <span class="logo_name">MERGE</span>
            </div>
        </router-link>

        <div class="menu-items">
            <ul class="nav-links" v-if="rol == 'inves'">

                <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/dashboard">
                        <i class="ri-home-2-line"></i>
                        <span class="link-name">Dashboard</span>
                    </router-link>
                </li>

                  <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/invesAccion">
                        <i class="ri-attachment-line"></i>
                        <span class="link-name">Investigaciones</span>
                    </router-link>
                </li>
            </ul>

            <ul class="nav-links" v-if="rol == 'rrss'">

                <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/dashboard">
                        <i class="ri-home-2-line"></i>
                        <span class="link-name">Dashboard</span>
                    </router-link>
                </li>

                  <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/InvesAccion">
                        <i class="ri-attachment-line"></i>
                        <span class="link-name">Investigaciones</span>
                    </router-link>
                </li>

            </ul>

            <ul class="nav-links" v-if="rol == 'admin'">

                <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/dashboard">
                        <i class="ri-home-2-line"></i>
                        <span class="link-name">Dashboard</span>
                    </router-link>
                </li>

                  <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/invesAccion">
                        <i class="ri-attachment-line"></i>
                        <span class="link-name">Investigaciones</span>
                    </router-link>
                </li>

            </ul>

            <ul class="nav-links" v-if="rol == 'admaster'">

                <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/dashboard">
                        <i class="ri-home-2-line"></i>
                        <span class="link-name">Dashboard</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li>
                    <router-link class="black" to="/maestroTiendas">
                        <i class="ri-store-line"></i>
                        <span class="link-name">Maestro de tiendas</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li>
                    <router-link to="/articulo">
                        <i class="ri-gamepad-line"></i>
                        <span class="link-name">Articulos</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li>
                    <router-link to="/tipoArticulo">
                        <i class="ri-pantone-line"></i>
                        <span class="link-name">Tipo de Articulo</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li >
                    <router-link to="/tamCap">
                        <i class="ri-ruler-2-line"></i>
                        <span class="link-name">Tamaño Capacidad</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li >
                    <router-link to="/marcas">
                        <i class="ri-markup-line"></i>
                        <span class="link-name">Marcas</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li >
                    <router-link to="/modelo">
                        <i class="ri-computer-line"></i>
                        <span class="link-name">Modelo</span>
                    </router-link>
                </li>

                <!-- OPCIONES -->
                <li>
                    <router-link to="/lineas">
                        <i class="ri-git-repository-line"></i>
                        <span class="link-name">Lineas</span>
                    </router-link>
                </li>

                 <!-- OPCIONES -->
                 <li>
                    <router-link to="/usuario">
                        <i class="ri-user-settings-line"></i>
                        <span class="link-name">Usuarios</span>
                    </router-link>
                </li>
            </ul>

            <ul class="logout-mode">
                <!-- LOGOUT -->
                <li>
                    <router-link class="black" to="/" @click="authStore.logout()">
                        <i class="ri-logout-box-line"></i>
                        <span class="link-name">Logout</span>
                    </router-link>
                </li>
                <!-- DARK MODE -->
                <li class="mode">
                    <router-link class="black" to="#" >
                        <i class="ri-moon-line"></i>
                        <span class="link-name">Dark mode</span>
                    </router-link>

                    <div class="mode-toggle" @click="toggleDark()">
                        <span class="switch"></span>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

</template>

<style >
::-webkit-scrollbar{
  width: .3rem;
  border-radius: .5rem;
  background-color:transparent;
}
::-webkit-scrollbar-thumb{
  border-radius: .5rem;
  background-color: transparent;
}
::-webkit-scrollbar-thumb:hover{
  background-color: transparent;
}

.nav-links{
  height: 900px;
  overflow-y: auto;
}

.black{
    color: aliceblue;
}


</style>


