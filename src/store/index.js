import { createStore } from "vuex";
import { router } from "@/router/index.js";
import bcrypt from "bcryptjs";
import {
  clearCart,
  deleteData,
  getDoc,
  getSingle,
  getTable,
  removeItem,
  setData,
  updateCart,
  updateData,
} from "./firebase_conn/queries";

export default createStore({
  state: {
    creators: [
      {
        name: "Abdus-Samad Charles",
        bio: "Yo, I am an aspiring Web Developer with interest in Web Design and Software Development.",
        linkedin: "https://www.linkedin.com/in/abdus-samad-charles-51bba5227/",
        github: "https://github.com/A-SCharles",
        image: "https://i.postimg.cc/fLBvCyGX/1638605458244.jpg",
      },
      {
        name: "Daniel Fredericks",
        bio: "Hi I am Daniel Fredericks I am an aspiring Web Developer with interest in Web Design and Software Development.",
        linkedin: "https://www.linkedin.com/in/daniel-fredericks-85744023a/",
        github: "https://github.com/DanielJamesF",
        image: "https://i.postimg.cc/DZCFdbkH/Daniel-3.jpg",
      },
    ],
    products: null,
    product: null,
    token: null || localStorage.getItem("token"),
    // user: {
    //   firstname: "Boi"
    // },
    user: null || JSON.parse(localStorage.getItem("user")),
    admin: false,
    users: null,
    cart: null,
    asc: true,
  },
  getters: {},
  mutations: {
    setproducts: (state, products) => {
      state.products = products;
      // console.log(products)
    },
    setproduct: (state, product) => {
      state.product = product;
    },
    setuser: (state, user) => {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
      console.log(user);
    },
    setcart: (state, cart) => {
      let newCart = JSON.parse(cart);
      state.cart = newCart;
      console.log(newCart);
    },
    setusers: (state, users) => {
      state.users = users;
    },
    setToken: (state, token) => {
      state.token = token;
      localStorage.setItem("token", token);
      // console.log(typeof(token))
      // console.log((token))
    },
  },
  actions: {
    setAdmin: async (context) => {
      let user = context.state.user;
      if (user != null) {
        // console.log(user.usertype);
        if (user.usertype === "Admin") {
          context.state.admin = true;
        }
        context.dispatch("getuser");
      }
    },
    // retrieves all products
    getProducts: async (context) => {
      let products = await getTable("Products");
      context.commit("setproducts", products);
    },

    // retrieves single
    getProduct: async (context, id) => {
      let product = await getSingle("Products", id);
      product = product.data();
      context.commit("setproduct", product);
    },

    addProduct: async (context, payload) => {
      let table = await getTable("Products");

      const ids = table.map((id) => {
        return id.id;
      });

      let id = Math.max(...ids);
      console.log(id++);
      payload.id = id;
      payload.userid = context.state.user.id;
      setData("Products", payload);
      context.dispatch("getProducts");
    },

    // updates list
    updateProduct: async (context, product) => {
      updateData("Products", product);
      context.dispatch("getProducts");
    },
    //

    // Deletes Item from db
    deleteProduct: async (context, product) => {
      console.log(product);
      deleteData("Products", product);
      context.dispatch("getProducts");
    },

    register: async (context, payload) => {
      // let load = await setData('Users')
      let data = await getTable("Users");

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === payload.email) {
            console.log("email exists");
          } else {
            // console.log("Incorrect Email");
            payload.password = await bcrypt.hash(payload.password, 10);
            setData("Users", payload);
          }
        }
      }
    },

    login: async (context, payload) => {
      let data = await getTable("Users");

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].email === payload.email) {
            console.log("email verified");
            let match = await bcrypt.compare(
              payload.password,
              data[i].password
            );
            if (!match) {
              console.log("incorrect password");
            } else {
              console.log("correct password");
              // router.push({
              //   name: "products",
              // });
              let user = data[i];
              context.commit("setuser", user);
              context.dispatch("setAdmin");
            }
          } else {
            console.log("Incorrect Email");
          }
        }
      }
    },

    // Deletes user from db
    deleteuser: async (context, id) => {
      // fetch("http://localhost:3000/users/" + id, {
      fetch("https://node-eomp-api.herokuapp.com/users/" + id, {
        method: "DELETE",
        headers: {
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then(() => context.dispatch("getusers"));
    },

    // update user infor
    updateUser: async (context, user) => {
      // fetch("http://localhost:3000/users/" + user.id, {
      fetch("https://node-eomp-api.herokuapp.com/users/" + user.id, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          context.dispatch("getusers");
        });
    },

    getuser: async (context) => {
      let userid = context.state.user.docid;
      let data = await getSingle("Users", userid);
      data = data.data();
      context.commit("setuser", data);
      context.dispatch("getCart");
    },

    // retrieves all users
    getusers: async (context) => {
      // fetch("http://localhost:3000/users", {
      fetch("https://node-eomp-api.herokuapp.com/users", {
        headers: {
          "x-auth-token": await context.state.token,
        },
      })
        // fetch("https://picknpay-apitest.herokuapp.com/products")
        .then((res) => res.json())
        .then((data) => {
          context.commit("setusers", data.results);
        });
    },

    // get cart
    getCart: async (context) => {
      let products = context.state.user.cart;
      context.commit("setcart", products);
    },

    //delete one cart item
    removeOne: async (context, id, userid) => {
      userid = context.state.user.docid;
      await removeItem('Users', userid, id)
      context.dispatch("getuser");
        // context.state.cart = null;
    },

    // delete all cart items
    deleteCart: async (context, userid) => {
      userid = context.state.user.docid;
      await clearCart("Users", userid);
      context.dispatch('getuser')
    },

    addToCart: async (context, id, userid) => {
      if (context.state.user === null) {
        alert("Please login");
      } else {
        userid = context.state.user.docid;

        // product data
        let data = await getSingle("Products", id);
        data = data.data();
        // add data to cart field
        await updateCart("Users", userid, data);

        // updates user
        context.dispatch("getuser");
      }
    },
  },
  modules: {},
});
