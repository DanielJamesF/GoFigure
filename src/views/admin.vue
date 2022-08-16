<template>
<section id="admin" class="p-5" v-if="admin">
  <div v-if="user">
    <div v-if="products">
      <div class="container text-center">
        <h2 class="text-black">User: {{ user.firstname }}</h2>
        <table class="table ">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Product Name</th>
              <th scope="col">Product Price</th>
              <th scope="col">Product Stock</th>
              <th scope="col">User ID</th>
              <th scope="col">
                <a data-bs-toggle="modal" data-bs-target="#addnew" class="btn">
                  <i class="fa-regular fa-square-plus"></i>
                </a>
              </th>
            </tr>
          </thead>
          <tr v-for="product in products" :key="product">
            <td>{{ product.id }}</td>
            <td>{{ product.prodname }}</td>
            <td>R{{ product.price }}.00</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.userid }}</td>

            <!-- icons -->
            <td>
              <!-- Update -->
              <a
                type="button"
                class="btn"
                data-bs-toggle="modal"
                :data-bs-target="'#update' + product.id"
                ><i class="fa-solid fa-pen-to-square"></i
              ></a>

              <!-- Delete -->
              <a
                class="btn"
                id="delete"
                @click="$store.dispatch('deleteProduct', product.id)"
                ><i class="fa-solid fa-trash-can"></i
              ></a>
            </td>
            <UpdateModal :product="product" />
          </tr>
        </table>
      </div>
    </div>
  </div>

  <!--  -->
  <CreateModal />
  <!--  -->
</section>
  <div id="else" v-else class="text-center d-flex flex-column">
    <h1>
      Uhm... This is awkward, Only Admins are supposed to be here... but idk
      <i class="fa-regular fa-face-meh"></i>
      <i class="fa-regular fa-face-grin-beam-sweat"></i>
    </h1>

    <router-link :to="{name: 'home'}" class="btn btn-warning p-3 nav-link">
    <h2>Begone Th...</h2></router-link>
  </div>
</template>

<script>
import CreateModal from "@/components/createModal.vue";
import UpdateModal from "@/components/updateModal.vue";

export default {
  components: { CreateModal, UpdateModal },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    // returns value from store
    user() {
      return this.$store.state.user;
    },
    admin() {
      return this.$store.state.admin;
    },
  },
};
</script>

<style scoped>
.container {
  min-height: 100vh;
}
#else {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
th {
  color: black;
}
i {
  color: black;
}
</style>
