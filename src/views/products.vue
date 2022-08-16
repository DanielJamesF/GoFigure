<template>
  <section id="products" class="p-5">
    <div class="container-fluid">
      <div id="bars" class="row p-3 mx-auto">
        <div class="col-md-3 mx-auto">
          <input
            type="text"
            class="form-control"
            v-model="search"
            placeholder="Search By Name ..."
          />
        </div>
        <div class="col-md-3 mx-auto">
          <select class="form-select" v-model="category">
            <!-- <option value="Anime" disabled selected hidden></option> -->
            <option value="All">Filter by Anime</option>
            <option value="Bleach">Bleach</option>
            <option value="Demon Slayer">Demon Slayer</option>
            <option value="Dragon Ball">Dragon Ball</option>
            <option value="Jujutsu Kaisen">Jujutsu Kaisen</option>
            <option value="My Hero Academia">My Hero Academia</option>
            <option value="Naruto Shippuden">Naruto</option>
          </select>
        </div>

        <div class="col-md-3 mx-auto">
          <select class="form-select" id="price" @change="sortPrice">
            <option value="All">Sort By Price</option>
            <option value="asc">Lowest To Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
        </div>
      </div>
      <div v-if="user">
        <h2 class="text-white" id="welcome">Welcome {{ user.firstname }}</h2>
      </div>
      <div id="products" v-if="products">
        <div id="row" class="row mx-auto">
          <h2 class="text-white">All Products</h2>
          <div
            v-for="product in products"
            :key="product"
            class="card p-3 m-auto"
            style="width: 18rem; height: fit-content"
          >
            <div class="my-auto">
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
              >
                <img :src="product.prodimg" class="card-img-top" alt="" />
              </router-link>
              <p class="card-text" id="name">{{ product.prodname }}</p>
              <p class="card-text" id="name">Price: R{{ product.price }}.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      category: "All",
      asc:true
    };
  },
  methods: {
    sortPrice() {
      let up = document.getElementById("price").value
      if (up === "asc") {
      this.$store.state.products.sort((a, b) => {
        return a.price - b.price;
      });
      }
      else {
        this.$store.state.products.sort((a, b) => {
        return b.price - a.price;
      });
    }
  },
  },
  computed: {
    // filter attempt: worked after about an hour of me sukkeling
    products() {
      return this.$store.state.products?.filter((product) => {
        let isMatch = true;
        if (!product.prodname.toLowerCase().includes(this.search)) {
          isMatch = false;
        }
        if (this.category !== "All" && this.category !== product.category) {
          isMatch = false;
        }
        return isMatch;
      });
    },
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    this.$store.dispatch("getProducts");
  },
  
};
</script>

<style scoped>
#products {
  background-image: url("../assets/wow.gif");
  background-blend-mode: multiply;
  background-color: red;
  min-height: 100vh;
}

#row {
  gap: 20px;
}

#name {
  text-align: center;
}
.card{
  background-color: transparent;
  color: grey;
}
.card-img-top {
  aspect-ratio: 1;
/* <<<<<<< HEAD */
  background-color: white;
}
.card:hover{
  background-color: black;
  color: white;
  border: solid 1px white;
}

@media (max-width: 425px) {
  #row{
    margin: 1px;
  }
/* =======
>>>>>>> bfa3f2806d495dea1451ee8b955f5d00d8e852f7 */
}
</style>
