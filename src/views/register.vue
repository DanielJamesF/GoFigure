<template>
  <div class="container-fluid text-center">
    <div class="row d-flex justify-content-center align-content-center">
      <form id="register" class="form-control mx-auto p-5 text-black" @submit.prevent="register">
        <h2 class="text-light">Register</h2>
        <div class="form-group m-3">
          <div class="row">
            <div class="col-md-6">
              <!-- firstName -->
              <label for="name"></label>
              <input id="name" v-model="name" class="form-control my-3" type="text" placeholder="Enter Name" required />

              <!-- lastname -->
              <label for="lastname"></label>
              <input id="lastname" v-model="lastname" class="form-control my-3" type="text" placeholder="Enter Lastname"
                required />

          <!-- email -->
          <label for="email"></label>
          <input
            id="email"
            v-model="email"
            class="form-control my-3"
            type="email"
            placeholder="Enter Email Address"
            required
          />

          <!-- Contact -->
          <label for="contact"></label>
          <input
            id="contact"
            v-model="contact"
            class="form-control my-3"
            type="tel"
            minlength="10" maxlength="10"
            placeholder="Add Contact Number"
            required
          />

              <!-- Address -->
              <label for="address"></label>
              <input id="address" v-model="address" class="form-control my-3" type="text" placeholder="Enter Address"
                required />

              <!-- password -->
              <label for="password"></label>
              <input id="password" v-model="password" class="form-control my-3" type="password" maxlength="15"
                placeholder="Choose password" required />
            </div>
          </div>
        </div>

        <button type="submit"><span> Register</span></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      lastname: "",
      email: "",
      usertype: "",
      contact: "",
      address: "",
      password: "",
    };
  },
  methods: {
    register() {
      // Fetches register function in store and passes values to it
      return this.$store.dispatch("register", {
        firstname: this.name,
        lastname: this.lastname,
        email: this.email,
        usertype: "user",
        contact: this.contact,
        address: this.address,
        password: this.password,
      });
    },
  },

  computed: {
    // returns value from store
    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
  background-image: url('../assets/wow.gif');
  background-blend-mode: multiply;
  background-color: red;
  padding-top: 95px;
}

form {
  background-image: url('../assets/wall.jpg');
  background-position: center;
  width: 70%;
}

@media (max-width: 426px) {
  form {
    width: 100%;
  }
}
</style>
