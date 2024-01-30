<script setup>
import Nav from '../components/Nav.vue';

import axios from 'axios';
//import { ref } from 'vue';
import Swal from 'sweetalert2'

import {  useRoute, useRouter } from 'vue-router'
const router = useRouter()

// LIBRERIAS
import { ref, onMounted } from 'vue';
const route = useRoute()

// URL
const id = ref('')
id.value = route.params.key 

const nombre = ref('')
const email = ref('')
const password = ref('')
const password2 = ref('')
const rol = ref('')



async function getUser() {
    try {
        // CONSULTAR LA TABLA DE USUARIOS
        const response = await axios.get(`https://teelspay.com:3001/api/v1/getUser/${id.value}`);
        id.value = response.data[0].id;
        nombre.value = response.data[0].nombre;
        email.value = response.data[0].email;
        password.value = response.data[0].password;
        rol.value = response.data[0].rol;

    } catch (error) {
        alert("Error no controlado.!");
    }
}

onMounted(async () => {
    await getUser();
});

async function UpdateTUser(jsonTA, id){
    
    try{
        await axios.put(`https://teelspay.com:3001/api/v1/update/user/${id.value}`, jsonTA)
        
    } catch(error){
        console.log(error)

    }
}

const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
}

function UpdateData(){

    const jsonTA = {
        nombre:nombre.value, 
        email:email.value,
        password:password.value, 
        password2:password2.value, 
        rol:rol.value 
    }

    Swal.fire({
            title: "Alerta!",
            text: "¿Desea editar estos datos?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancelar",
            confirmButtonText: "Si, Editar!",
            background: '#3A3B3C',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                UpdateTUser(jsonTA, id)
                Swal.fire({
                title: "Guardado!",
                text: "Datos editados con exito!!!",
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
                <input type="text" id="searchField" placeholder="Buscar (Ctrl + k)" disabled>
            </div>

            <img src="../assets/profile3.png" alt="imagen de perfil">
        </div>

        <div class="dash-content">

            <div class="overview">
                <!-- NAVBAR -->
                <div class="title">
                    <i class="ri-pie-chart-box-line icono-dash"></i>
                    <span class="text">Editar usuario</span>
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
                            @submit="UpdateData" 
                            submit-label="Editar" 
                            method="post"
                        >

                            <FormKit 
                                v-model="nombre" 
                                type="text" 
                                label="Nombre" 
                                prefix-icon="text"
                                placeholder="Nombre y apellido" 
                                help="Ingresa tu nombre completo." 
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
                                }" 
                                help="Ingresa tu correo electronico." 
                            />

                            <FormKit v-model="password" 
                                type="password" 
                                label="Contraseña" 
                                name="password"
                                prefix-icon="password" 
                                placeholder="Ej. Daka2023*" 
                                validation="required"
                                :validation-messages="{
                                    required: 'Debes colocar una contraseña.',
                                }" @suffix-icon-click="handleIconClick" 
                                help="Ingresa tu contraseña."
                                suffix-icon="eyeClosed" 
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

