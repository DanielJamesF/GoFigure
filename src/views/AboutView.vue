<template>
  <section id="about" class="p-5">
    <div class="container">
      <div class="row">
        <h2>About</h2>
        <p class="w-25 mx-auto">
          A Anime figurine website where a user can purchase anime figures.
          
        </p>
        <div v-if="creators" class="row">
          <h2>The Creators</h2>
          <div v-for="creator in creators" :key="creator" class="col-md-6">
            <div class="card w-50 mx-auto m-5 rounded-5 border-0">
              <!-- <div
                class="banner"
                :style="'background-image: url(' + creator.banner + ')'"
              ></div> -->
              <div class="card-body rounded-5">
                <img
                  class="rounded-5 img-fluid mx-auto m-5"
                  :src="creator.image"
                  :alt="creator.image"
                />
                <div class="info">
                  <p class="fs-4">{{ creator.name }}</p>
                  <p>{{ creator.bio }}</p>
                  <a
                    :href="creator.github"
                    target="_blank"
                    class="btn text-black fs-3"
                    ><i class="fa fa-github" aria-hidden="true"></i
                  ></a>
                  <a
                    :href="creator.linkedin"
                    target="_blank"
                    class="btn text-black fs-3"
                    ><i class="fa fa-linkedin" aria-hidden="true"></i
                  ></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  computed: {
    creators() {
      return this.$store.state.creators;
    },
  },
};
</script>

<style scoped>
#about {
  /* background-image: url("https://i.postimg.cc/7hZP4mYC/wallpaperbetter-com-1920x1200-2.jpg"); */
  /* background-image: url("https://i.postimg.cc/hjF7SFHX/wallpaperbetter-com-1920x1200-1.jpg"); */
  /* background-image: url("https://i.postimg.cc/ncfT3grc/wallpaperbetter-com-1920x1200.jpg"); */
  background-repeat: no-repeat;
  /* background-position: center; */
  background-size: cover;
  /* min-height: 90vh; */
}

.banner {
  height: 100px;
  background-color: aqua;
  background-repeat: no-repeat;
  background-size: cover;
}

.card {
  /* height: 500px; */
  box-shadow: 10px 10px 30px rgba(128, 128, 128, 0.3);
}

.card img {
  /* margin-top: -80px; */
  /* width: 55%; */
  aspect-ratio: 1;
  object-fit: contain;
  
}

.card-body .info {
}

.card-body {

}
</style>
