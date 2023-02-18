<template>
  <section id="cart">
    <div v-if="cart" class="p-4 m-3">
      <div class="modal fade" id="checkout" tabindex="-1" aria-labelledby="checkout" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Checkout</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div v-for="item in cart" :key="item" :item="item" class="row">
                <div class="col-md-7">
                  <p>
                    <span class="">{{ item.prodname }}</span>
                  </p>
                </div>
                <div class="col-md-5">
                  <p>
                    <span>R{{ item.price }}.00</span>
                  </p>
                </div>
              </div>
              <p id="total">
                <span class="fw-bolder">Total:</span>(
                <span>{{ num }} item</span> ) <span>R{{ total }}.00</span>
              </p>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancel
              </button>
              <button @click="checkout" type="button" class="btn btn-primary w-50" data-bs-dismiss="modal">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-auto">
        <button class="btn btn-warning" @click="removeAll">Remove all</button>
        <div class="col-md-7">
          <div v-for="item in cart" :key="item" :item="item" class="card m-3 p-3 mx-auto shadow"
            style="width: fit-content; height: fit-content">
            <div class="row">
              <div class="col-md-3">
                <img :src="item.prodimg" class="img-fluid" />
              </div>
              <div class="col-md-9 my-auto">
                <h4 class="text-start d-lg-flex justify-content-between">
                  <span>{{ item.prodname }}</span>
                  <span class="fw-bolder">R{{ item.price }}.00</span>
                </h4>

                <button id="delete" class="btn btn-warning float-sm-end"
                  @click="$store.dispatch('removeOne', item.prodid)">
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="row">
            <div class="col">
              <div class="card m-3 p-3 shadow">
                <h2 id="total1"><span>Cart Summary</span></h2>
                <div v-for="item in cart" :key="item" :item="item" class="row">
                  <div class="col-md-7">
                    <p>
                      <span class="">{{ item.prodname }}</span>
                    </p>
                  </div>
                  <div class="col-md-5">
                    <p>
                      <span>R{{ item.price }}.00</span>
                    </p>
                  </div>
                </div>
                <p id="total">
                  <span class="fw-bolder">Total:</span>(
                  <span>{{ num }} item</span> ) <span>R{{ total }}.00</span>
                </p>
                <button class="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#checkout">
                  Checkout
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="else" v-else>
      <h2>Cart Empty ...</h2>
    </div>

    <!-- Modal -->
    <div v-if="cart">

    </div>
  </section>
</template>

<script>
import router from '@/router';
export default {
  mounted() {
    // this.$store.dispatch("getuser")
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      let prices = this.$store.state.cart;

      if (prices.length > 0) {
        let sum = prices.reduce((x, cart) => {
          return x + cart.price;
        }, 0);
        return sum;
      }
    },
    num: function () {
      let Cnum = this.$store.state.cart;
      if (Cnum === null || Cnum === undefined) {
        Cnum = 0;
        return Cnum;
      } else {
        let i = Cnum.length;
        return i;
      }
    },
  },
  methods: {
    removeAll() {
      this.$store.dispatch("deleteCart");
    },
    checkout() {
      alert("Thank you for your purchase. Please Come back again soon.")
      this.$store.dispatch("deleteCart");
      router.push({ name: 'home' })
    },
  },
};
</script>

<style scoped>
#cart {
  min-height: 100vh;
}

#else {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  aspect-ratio: 1;
}

#total1 {
  border-bottom: solid 1px black;
}

#total {
  border-top: solid 1px black;
  border-bottom: solid 1px black;
}

/* @media (max-width: 300px){
  .card{

  }

#delete{
    align-self: end;
} */
/* } */
</style>
