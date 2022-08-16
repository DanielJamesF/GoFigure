<template>
  <div class="container-fluid">
    <form
      id="form"
      action="https://formspree.io/f/xdobpjrz"
      method="post"
      class="form-control "
    >
    <h1>Get in touch...</h1>
      <label for="name">Name</label>
      <input type="text" name="name" class="form-control" placeholder="Enter Name" required />
      <br />
      <br />
      <label for="surname">Surname </label>
      <input
        class="form-control"
        name="surname"
        type="text"
        maxlength="15"
        placeholder="Enter Surname"
        required
      />
      <br />
      <br />
      <label for="email">Email</label>
      <input type="text" class="form-control" placeholder="Enter email address" required>
      <br>
      <br>
      <label for="subject">Subject </label>
      <input class="form-control" type="text" maxlength="15" required placeholder="What would you like to talk about?" />
      <br />
      <br />
      <label for="message">Message </label
      ><textarea
        class="form-control"
        name="message"
        id="message"
        cols="30"
        rows="2"
        placeholder="Leave a message &#128512;"
      ></textarea>
      <br />
      <button type="button"><span> Submit</span></button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container-fluid {
  min-height: 100vh;
  padding-top: 95px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url('../assets/wow.gif');
  background-blend-mode: multiply;
  background-color: red;
}
#form {
  text-align: center;
  width: 40%;
  background-image: url('../assets/wall.jpg');
  background-position: center;
  color: white;
}
@media (max-width: 475px){
  #form{
    width: 100%;
  }
}
</style>