<template>
  <section id="single" class="p-5">
    <div class="container" v-if="product">
      <div class="row mx-auto">
        <div class="text-start">
          <router-link to="/products">
            <button v-bind:onclick="back"><span> back</span></button>
          </router-link>
        </div>
        <div class="col-md-6 mx-auto">
          <img :src="product.prodimg" class="mx-auto img-fluid" alt="" />
        </div>
        <div class="col-md-6 d-flex flex-column justify-content-around text-start">
          <h2>{{ product.prodname }}</h2>
          <h2>{{ product.category }}</h2>
          <h2 class="fw-bolder">Price: R{{ product.price }}.00</h2>
          <h2>{{ product.stock }}</h2>
          <button @click="add"><span> Add to cart</span></button>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Loading ...</h2>
    </div>
  </section>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
    };
  },

  mounted() {
    // Call function created in store
    this.$store.dispatch("getProduct", this.id);
  },
  computed: {
    // returns item from function that was called
    product() {
      return this.$store.state.product;
    },
  },

  methods: {
    add() {
      this.$store.dispatch("addToCart", this.id);
    },
    back() {
      this.$store.state.product = null;
    },
  },
};
</script>

<style scoped>
#single {
  min-height: fit-content;
}
</style>
