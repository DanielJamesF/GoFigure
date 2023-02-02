<template>
<section id="loginPage">
  <div class="container-fluid text-center">
    <div class="row d-flex justify-content-center align-content-center">
      <form
        id="login"
        class="form-control mx-auto p-5"
        @submit.prevent="login"
      >
        <h2 style="font-size: 3vw" class="text-light">Login</h2>
        <div class="form-group mb-3">
          <input
            type="email"
            class="form-control my-3"
            placeholder="Enter Email Address"
            id="email"
            v-model="email"
          />
          <input
            type="password"
            class="form-control my-3"
            id="password"
            placeholder="Enter Password"
            v-model="password"
          />
        </div>
        <button type="submit"><span> Submit</span></button>
      </form>
      <router-link :to="{ name: 'register' }">
        <a style="font-size: 30px" class="nav-link"> Register</a>
      </router-link>
    </div>
    <div v-if="user">
      <h2>{{ user.firstname }} Login Successful</h2>
    </div>
  </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    
    // checks if user exists in db
    login() {
      return this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
    },
  },

  computed: {
    // returns userData if exists
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
#loginPage{
  min-height: 100vh;
  padding-top: 95px;
  background-image: url('../assets/wow.gif');
  background-color: red;
  background-blend-mode: multiply;
}

form {
  justify-content: center;
  align-items: center;
  background-image: url("../assets/wall.jpg");
  background-position: center;
  width: 70%;
}
.nav-link a{
  text-decoration: none;
  border: solid;
  color: black;
}

@media (max-width: 426px) {
  form {
    width: 100%;
  }
}
</style>
