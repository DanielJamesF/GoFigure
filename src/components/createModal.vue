<template>
  <div
    class="modal fade"
    id="addnew"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ><span></span></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12 mx-auto">
              <!-- name -->
              <div class="mb-3">
                <label for="addName" class="form-label">Product Name:</label>
                <input
                  class="form-control"
                  type="text"
                  v-model="prodname"
                  name="addName"
                  id="addName"
                  placeholder="Enter Product Name:"
                  required
                />
              </div>

              <!-- image -->
              <div class="mb-3">
                <label for="addImage" class="form-label">Product Image</label>
                <input
                  class="form-control"
                  type="text"
                  name="addImage"
                  id="addType"
                  v-model="prodimg"
                  placeholder="Add image url"
                />
              </div>
              
              <!-- category -->
              <div class="mb-3">
                <label for="addImage" class="form-label">Product Category</label>
                <input
                  class="form-control"
                  type="text"
                  name="addImage"
                  id="addType"
                  v-model="category"
                  placeholder="Add Category"
                />
              </div>

              <!-- Quantity -->
              <div class="mb-3">
                <label for="addQuantity" class="form-label">Stock</label>
                <input
                  class="form-control"
                  type="number"
                  name="addQuantity"
                  id="addQuantity"
                  v-model="stock"
                  placeholder="Stock"
                />
              </div>

              <!-- Price -->
              <div class="mb-3">
                <label for="addPrice" class="form-label">Price</label>
                <input
                  class="form-control"
                  type="number"
                  name="addPrice"
                  id="addPrice"
                  v-model="price"
                  placeholder="Add Price"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            @click="add"
          ><span>

            Add Product
          </span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      prodname: "",
      prodimg: "https://i.postimg.cc/QtgJDH83/default-product-image.png",
      category: "",
      stock: 1,
      price: "",
    };
  }, 
  methods: {
    add() {
      return this.$store.dispatch("addProduct", {
        prodname: this.prodname,
        category: this.category,
        prodimg: this.prodimg,
        stock: this.stock,
        price: this.price,
      });
    },
  },
};
</script>

<style></style>
