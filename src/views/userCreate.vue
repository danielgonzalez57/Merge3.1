<script setup>
import Nav from '../components/Nav.vue';
// import Top from '../components/Top.vue';
import axios from 'axios';
import { ref } from 'vue';
import {  useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const data = ref({
    nombre: "",
    email: "",
    password: "",
    password2: "",
    rol: ""
});

const handleSubmit = async () => {
    // // Usando promesas
    axios.post('http://149.50.131.95:3001/api/v1/create/user', data.value)
        .then(response => {
            let rtaFromMysqlDb = Object.keys(response.data)
            let error = rtaFromMysqlDb.includes("errors");
            if(error){
                // EL DATO HA FALLADO AL CREARSE
                alert(response.data.errors[0].message);
            }else {

                // REGISTRO CREADO EXITOSAMENTE
                Swal.fire({
                icon: 'question',
                title: 'Alerta!',
                text: '¿Deseas guardar los datos?',
                background: '#3A3B3C',  
                color: '#fff',
                confirmButtonText: 'Guardar',
            }).then((result) => {
                if (result.isConfirmed) {

                // REDIRECCIONA AL TABLE PRINCIPAL
                router.push('/usuario');

                }
            })

            }
        
        })
        .catch(error => {
            // Hacer algo con el error
            //console.log(error);
            alert('Error no controlado.')
        });
}

const handleIconClick = (node, e) => {
    node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
    node.props.type = node.props.type === 'password' ? 'text' : 'password'
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

                        <FormKit type="form" 
                        #default="{ value }" 
                        @submit="handleSubmit" 
                        :value="data"
                        submit-label="Registrar" 
                        method="post" 
                        action="/ta_relacion_laboral">

                            <FormKit v-model="data.nombre" 
                            type="text" 
                            label="Nombre de usuario" 
                            value="nombre" 
                            prefix-icon="text"
                            placeholder="Nombre de usuario"
                            help="Ingresa tu nombre de usuario."/>

                            <FormKit v-model="data.email" 
                            type="text" 
                            label="Correo electronico" 
                            name="email"
                            prefix-icon="email" 
                            placeholder="email@tiendasdaka.com" 
                            validation="required|email"
                            :validation-messages="{
                                required: 'Debes colocar un correo electronico.',
                                email: 'Debe tener @ y .com'
                            }" help="Ingresa tu correo electronico." />

                            <FormKit v-model="data.password" 
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
                            suffix-icon="eyeClosed" />

                            <FormKit v-model="data.password2" 
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
                            help="Confirma tu contraseña." />

                            <FormKit 
                            v-model="data.rol" 
                            type="select" 
                            label="Tipo de rol:" 
                            name="favorite_food"
                            placeholder="Permiso de usuario" prefix-icon="select" :options="[
                                { label: 'Administrador de usuarios', value: 'admin' },
                                { label: 'Administrsdor de maestros', value: 'admaster' },
                                { label: 'Investigador', value: 'inves' },
                                { label: 'Redes sociales', value: 'rrss' }
                            ]" 
                            validation="required" 
                            :validation-messages="{
                                required: 'Debes escoger un rol.',
                            }" help="Asigna los permisos a este usuario." />

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

