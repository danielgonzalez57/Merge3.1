import axios from 'axios'
import { defineStore } from 'pinia'
import router from '../router/index'
import Swal from 'sweetalert2'

export const useAuthStore = defineStore('auth', {
  state: () => ({ 
    authUser: null, 
    authToken: null,
    authRol: null} 
  ),
  getters: {
    user:(state) => state.authUser, 
    token:(state) => state.authToken,
    rol:(state) => state.authRol

  },
  actions:{
      async login(json){
          await axios.post(`http://149.50.131.95:3001/api/v1/auth`, json).then( 
            (res) => {
              
              if(res.data.status === 'ok' ){

              this.authToken = res.data.token;
              this.authRol = res.data.rol;
              this.authUser = res.data.usuario;
              localStorage.token = this.authToken;
              localStorage.rol = this.authRol;
              localStorage.usuario = this.authUser;

              // SPINNER DE INICIO DE SESION
              let timerInterval;
              Swal.fire({
                title: "Iniciando Sesion!",
                html: "Se cerrara en <b></b> millisegundos.",
                background: '#3A3B3C',
                color: '#fff',
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const timer = Swal.getPopup().querySelector("b");
                  timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                  }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                  router.push('/dashboard');
                }
              }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                  console.log("I was closed by the timer");
                }
              });
              }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: 'usuario o contraseña incorrectas!',
                  background: '#3A3B3C',
                  color: '#fff'
                })
                
              }
         
          }).catch(
            (errors)=>{
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error de sistema' ,
                background: '#3A3B3C',
                color: '#fff'
              })
            }
          )
     },
      async logout(){
          const token = sessionStorage.token;
          localStorage.removeItem('token');
          localStorage.removeItem('usuario');
          router.push('/');
      }
  },
  // AYUDA A QUE LA SESSION NO SE PIERDA CUANDO SE REFRESQUE LA PAGINA 
  persist:true
})
