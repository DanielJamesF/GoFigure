<template>
  <nav class="navbar navbar-expand-md sticky-top" style="background-color: #e3f2fd">
    <div class="container-fluid">
      <div id="div" class="nav-item">
        <router-link :to="{ name: 'home' }">
          <img class="img-fluid" src="https://i.postimg.cc/SR1CkbHM/figure1.png" alt="">
        </router-link>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <div class="navbar-nav">
          <div v-if="user" class="d-md-flex">
            <router-link to="/">
              <a class="nav-link">Home</a>
            </router-link>
            <router-link to="/products">
              <a class="nav-link">Products</a>
            </router-link>
            <router-link to="/contact">
              <a class="nav-link">Contact</a>
            </router-link>

            <router-link to="/cart">
              <button class="btn rounded-pill">
                <i class="fs-4 fa-solid fa-cart-shopping">{{ num }}</i>
              </button>
            </router-link>
          </div>

          <div v-if="admin" class="d-md-flex">
            <router-link to="/admin">
              <a class="nav-link">Admin</a>
            </router-link>
            <router-link to="/users">
              <a class="nav-link">Users</a>
            </router-link>
          </div>

          <div v-if="user">
            <button class="btn" @click="logout">Logout</button>
          </div>

          <div v-else class="d-md-flex">
            <router-link to="/login">
              <a class="nav-link">Login</a>
            </router-link>
            <router-link to="/register">
              <a class="nav-link">Register</a>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router';
import Swal from 'sweetalert2';

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.$store.dispatch("setAdmin")
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.admin;
    },
    num: function () {
      let Cnum = this.$store.state.cart;
      if ((Cnum === null) || (Cnum === undefined)) {
        Cnum = 0;
        return Cnum;
      } else {
        // Cnum.length
        let i = Cnum.length
        return i;
      }
    },
  },
  methods: {
    logout() {
      Swal.fire({
        title: 'Are you sure you want to logout?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Yes',
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.$store.state.user = null;
          this.$store.state.cart = null;
          this.$store.state.token = null;
          this.$store.state.admin = false;
          localStorage.removeItem('GoFigureToken');
          localStorage.removeItem('GoFigureUser');
          router.push('/')
        } else if (result.isDenied) {

        }
      })
    },
  },
};
</script>

<style scoped>
img {
  right: 0;
  height: 5em;
  padding: 2px;
}

#div span {
  padding: 3px;
}

@media (max-width: 365px) {
  #go {
    height: 20px;
  }

  #I {

    height: 30px;
  }
}

@media (max-width: 224px) {
  #div {
    display: none;
  }
}

nav a {
  font-size: 17px;
  color: black;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: blue !important;
}


nav a:hover {
  color: lightslategrey;
}
</style>
