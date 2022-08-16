<template>
  <section id="usersSection" class="p-5" v-if="admin">
    <div v-if="user">
      <div v-if="users">
        <div class="container-fluid">
          <div class="container text-center">
            <h2 class="text-black">User: {{ user.firstname }}</h2>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">User Name</th>
                  <th scope="col">User Title</th>
                  <th scope="col">User Email Address</th>
                  <!-- <th scope="col">
                <a data-bs-toggle="modal" data-bs-target="#addnew" class="btn">
                  <i class="fa-regular fa-square-plus"></i>
                </a>
              </th> -->
                </tr>
              </thead>
              <tr v-for="user in users" :key="user">
                <td>{{ user.id }}</td>
                <td>{{ user.firstname }}</td>
                <td>{{ user.usertype }}</td>
                <td>{{ user.email }}</td>

                <!-- icons -->
                <td>
                  <!-- Update -->
                  <a
                    type="button"
                    class="btn"
                    data-bs-toggle="modal"
                    :data-bs-target="'#update' + user.id"
                    ><i class="fa-solid fa-pen-to-square"></i
                  ></a>

                  <!-- Delete -->
                  <a
                    class="btn"
                    id="delete"
                    @click="$store.dispatch('deleteuser', user.id)"
                    ><i class="fa-solid fa-trash-can"></i
                  ></a>
                </td>
                <UpdateUserModal :user="user" />
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!--  -->
      <CreateModal />
      <!--  -->
    </div>
  </section>

  <div id="else" v-else class="text-center d-flex flex-column">
    <h1>
      Uhm... This is awkward, Only Admins are supposed to be here... but idk
      <!-- <i class="fa-regular fa-face-thinking"></i> -->
      <i class="fa-regular fa-face-meh"></i>
      <i class="fa-regular fa-face-grin-beam-sweat"></i>
    </h1>

    <router-link :to="{name: 'home'}" class="btn btn-warning p-3 nav-link">
    <h2>Begone Th...</h2></router-link>
  </div>
</template>

<script>
import CreateModal from "@/components/createModal.vue";
import UpdateUserModal from "@/components/updateUserModal.vue";

export default {
  components: { CreateModal, UpdateUserModal },
  mounted() {
    this.$store.dispatch("getusers");
  },
  computed: {
    users() {
      return this.$store.state.users;
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
.container-fluid {
  min-height: 100vh;
}
th {
  color: black;
}
i {
  color: black;
}
#else {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
