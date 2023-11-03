<template>
  <div class="container-fluid">
    <br>
    <div class="row">
        <!-- <div id="links2" class="col">
            <h1>Social links</h1>
            <a href="https://www.facebook.com/login"><i class="bi bi-facebook"></i></a>
            <br>
            <a href="https://www.instagram.com/accounts/login/"><i class="bi bi-instagram"></i></a>
            <br>
            <a href="https://www.linkedin.com/login"><i class="bi bi-linkedin"></i></a>
            <br>
            <a href="https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home"><i class="bi bi-github"></i></a>
            <br>
            <a href="https://twitter.com/i/flow/login"><i class="bi bi-twitter"></i></a>
        </div> -->
        <h2>Quick links</h2>
        <div id="links" class="col-md-6 mx-auto d-flex align-content-center justify-content-between">
          <router-link to="/">Home page</router-link>
          <br />
          <router-link to="/about">About us</router-link>
          <br />
          <router-link to="/login">Login page</router-link>
          <br />
          <router-link to="/register">Register page</router-link>
          <br />
          <router-link to="/contact">Contact us</router-link>
        </div>
      <!-- </div> -->
    </div>
    <p>Copyright &copy; All Rights Reserved by GoFigure.</p>
  </div>
</template>

<script>
export default {
  
};
</script>

<style scoped>
.container-fluid {
  background-color: #e3f2fd;
  border-top: solid black 1px;
}
a {
  text-decoration: none;
}
/* #links {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#links2 {
    display: flex;
    flex-direction: column;
    font-size: 15px;
} */
</style>