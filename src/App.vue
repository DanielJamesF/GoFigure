<template>
  <Navbar />
  <router-view />
  <Footer />
</template>
<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
export default {
  components: { Navbar, Footer }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

button:not(.swal2-container) {
  background: rgb(0,172,238);
  background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none; 
}

button span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
button:before,
button:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
button:before {
  height: 0%;
  width: 2px;
}
button:after {
  width: 0%;
  height: 2px;
}
button:hover{
   background: transparent;
  box-shadow: none;
}
button:hover:before {
  height: 100%;
}
button:hover:after {
  width: 100%;
}
button span:hover{
   color: rgba(2,126,251,1);
}
button span:before,
button span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
button span:before {
  width: 2px;
  height: 0%;
}
button span:after {
  width: 0%;
  height: 2px;
}
button span:hover:before {
  height: 100%;
}
button span:hover:after {
  width: 100%;
}

</style>
