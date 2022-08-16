<template>
  <div class="container-fluid">
    <div class="row">
      <div id="logo" class="col flex-wrap">
    <div id="row1" class="row">
      <h2 class="display-1 text-black">Welcome to</h2>
      <div id="logo" class="col ">
        <img class="img-fluid" src="https://i.postimg.cc/SR1CkbHM/figure1.png" alt="">
      </div>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
  /* background-image: url("https://i.postimg.cc/Hn3N4nR7/animesher-com-tumblr-autumn-backgrounds-tumblr-fall-1923587.gif"); */
  background-image: url("https://i.postimg.cc/3RkjbRkv/6aeeea24e8fd4023a349e354eefa33ed.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
span {
  font-size: 60px;
}
a {
  text-decoration: none;
  font-size: 60px;
  border-radius: 50px;
  padding: 5px;
  font-size: 25px;
}
#go {
  padding: 22px;
}
#login {
  border: solid white 1px;
  color: white;
  background-color: blue;
}
#login:hover {
  border: solid blue 1px;
  color: blue;
  background-color: white;
}
#register {
  border: solid blue 1px;
  color: blue;
  background-color: white;
}
#register:hover {
  border: solid white 1px;
  color: white;
  background-color: blue;
}
span {
  font-size: 50px;
  padding: 20px;
}
#logo {
  border-radius: 180px;
}

#loginregister{
  padding: 10px;
}
@media (min-width: 775px) and (max-width: 886px) {
  span{
    font-size: unset;
  }
}
@media (min-width: 369px) and (max-width: 775px){
  #go{
    height: 50px;
    padding: 10px;
  }
  #I{
    height: 30px;
  }
  span{
    font-size: unset;
    padding: 0;
  }
}
@media (max-width: 369px) {
  #go{
    height: 30px;
    padding: 5px;
  }
  #I{
    height: 20px;
  }
  span{
    font-size: unset;
    padding: 5px;
  }
}
</style>