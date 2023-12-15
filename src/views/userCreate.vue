<script setup>
import Nav from '../components/Nav.vue';
// import Top from '../components/Top.vue';
import axios from 'axios';
import { ref } from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()

const nombre = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const rol = ref('')

const data = ref({
    nombre: "",
    email: "",
    password: "",
    password2: "",
    rol: ""
});

const CrearUsuario = async (jsonTA) => {

    try{
        await axios.post('http://149.50.131.95:3001/api/v1/create/user', jsonTA)
        
    } catch(error){
        console.log(error)

    }
}

const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

function CreateData(){

const jsonTA = {
    nombre:nombre.value, 
    email:email.value,
    password:password.value, 
    password2:password2.value, 
    rol:rol.value 
}

Swal.fire({
        title: "Alerta!",
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
            CrearUsuario(jsonTA)
            Swal.fire({
            title: "Guardado!",
            text: "Datos guardados con exito!!!",
            icon: "success",
            background: '#3A3B3C',
            color: '#fff'
            }).then((result) => {
            if (result.isConfirmed) { 
                    router.push('/usuario');
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
                    <span class="text">Registro de usuario</span>
                </div>
                <router-link to="/usuario">
                    <v-btn prepend-icon="mdi-arrow-left" color="green-accent-4">
                        Volver
                    </v-btn>
                </router-link>
                
            </div>
            <br>

            <div class="activity">
                <section class="container_form1">

                    <div class="container_form">

                        <FormKit 
                            type="form" 
                            #default="{ value }" 
                            @submit="CreateData" 
                            :value="data"
                            submit-label="Registrar" 
                            method="post" 
                        >

                            <FormKit 
                                v-model="nombre" 
                                type="text" 
                                label="Nombre de usuario" 
                                value="nombre" 
                                prefix-icon="text"
                                placeholder="Nombre de usuario"
                                help="Ingresa tu nombre de usuario."
                            />

                            <FormKit 
                                v-model="email" 
                                type="text" 
                                label="Correo electronico" 
                                name="email"
                                prefix-icon="email" 
                                placeholder="email@tiendasdaka.com" 
                                validation="required|email"
                                :validation-messages="{
                                    required: 'Debes colocar un correo electronico.',
                                    email: 'Debe tener @ y .com'
                                }" help="Ingresa tu correo electronico." 
                            />

                            <FormKit 
                                v-model="password" 
                                type="password" 
                                label="Contraseña"
                                name="password"
                                prefix-icon="password" 
                                placeholder="Ej. Daka2023*" 
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar una contraseña.',
                            }" 
                                @suffix-icon-click="handleIconClick" 
                                help="Ingresa tu contraseña."
                                suffix-icon="eyeClosed" 
                            />

                            <FormKit 
                                v-model="password2" 
                                type="password" 
                                label="Confirmar contraseña" 
                                name="password2"
                                prefix-icon="password" 
                                placeholder="Ej. Daka2023*" 
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar una contraseña.',
                                }" 
                                suffix-icon="eyeClosed" 
                                @suffix-icon-click="handleIconClick"
                                help="Confirma tu contraseña." 
                            />

                            <FormKit 
                                v-model="rol" 
                                type="select" 
                                label="Tipo de rol:" 
                                name="favorite_food"
                                placeholder="Permiso de usuario" prefix-icon="select" :options="[
                                    { label: 'Administrador de usuarios', value: 'admin' },
                                    { label: 'Administrador de maestros', value: 'admaster' },
                                    { label: 'Investigador', value: 'inves' },
                                    { label: 'Redes sociales', value: 'rrss' }
                                ]" 
                                validation="required" 
                                :validation-messages="{
                                    required: 'Debes escoger un rol.',
                                }" help="Asigna los permisos a este usuario." 
                            />

                        </FormKit>
                    </div>
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
</style> 

