import { createStore } from "vuex";
import { router } from "@/router/index.js";
import bcrypt from "bcryptjs";
import { getDoc, getTable, setData } from "./firebase_conn/queries";

export default createStore({
  state: {
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
      // console.log(newCart)
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
        console.log(user.usertype);
        if (user.usertype === "Admin") {
          context.state.admin = true;
        }
        // context.dispatch("getCart");
      }
    },
    // retrieves all products
    getProducts: async (context) => {
      let i = await getDoc('Products');
      // console.log(i.id);
      console.log(i);
      let products = await getTable("Products");
      // console.log(products);

      context.commit("setproducts", products);
    },
    // getProducts: async (context) => {
    //   // fetch("http://localhost:3000/products")
    //   fetch("https://node-eomp-api.herokuapp.com/products")
    //     .then((res) => res.json())
    //     .then((data) => context.commit("setproducts", data.results));
    // },
    // retrieves single
    getProduct: async (context, id) => {
      // fetch("http://localhost:3000/products/" + id)
      fetch("https://node-eomp-api.herokuapp.com/products/" + id)
        .then((res) => res.json())
        .then((data) => context.commit("setproduct", data.results));
    },

    addProduct: async (context, payload) => {
      let table = await getTable("Products");

      const ids = table.map((id) => {
        return id.id;
      });

      let id = Math.max(...ids);
      console.log(id++);
      payload.id = id
      payload.userid = context.state.user.id;
      console.log(payload);
      setData("Products", payload);
      context.dispatch('getProducts')
    },
    // addProduct: async (context, payload) => {
    //   const { prodname, prodimg, category, stock, price } = payload;
    //   // fetch("http://localhost:3000/products", {
    //   fetch("https://node-eomp-api.herokuapp.com/products", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       prodname: prodname,
    //       prodimg: prodimg,
    //       category: category,
    //       stock: stock,
    //       price: price,
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       "x-auth-token": context.state.token,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       alert(data.msg);
    //       context.dispatch("getProducts");
    //     });
    // },

    // updates list
    updateProduct: async (context, doc, product) => {
      
    },
    // 
    // updates list
    // updateProduct: async (context, product) => {
    //   // fetch("http://localhost:3000/products/" + product.id, {
    //   fetch("https://node-eomp-api.herokuapp.com/products/" + product.id, {
    //     method: "PUT",
    //     body: JSON.stringify(product),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       "x-auth-token": context.state.token,
    //     },
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       alert(data.msg);
    //       context.dispatch("getProducts");
    //     });
    // },
    // Deletes Item from db
    deleteProduct: async (context, id) => {
      // fetch("http://localhost:3000/products/" + id, {
      fetch("https://node-eomp-api.herokuapp.com/products/" + id, {
        method: "DELETE",
        headers: {
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then(() => context.dispatch("getProducts"));
    },

    register: async (context, payload) => {
      // let load = await setData('Users')
      let data = await getTable("Users");
      console.log(payload);
      // console.log(load);

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

    // adds user to db
    // register: async (context, payload) => {
    //   const {
    //     firstname,
    //     lastname,
    //     email,
    //     usertype,
    //     contact,
    //     address,
    //     password,
    //   } = payload;
    //   // firstname, lastname, email, usertype, contact, address, password, joindate, cart
    //   // fetch("http://localhost:3000/users", {
    //   fetch("https://node-eomp-api.herokuapp.com/users", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       firstname: firstname,
    //       lastname: lastname,
    //       email: email,
    //       usertype: usertype,
    //       contact: contact,
    //       address: address,
    //       password: password,
    //     }),
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       "x-auth-token": context.state.token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.msg === "Registration Successful") {
    //         alert(data.msg);
    //         context.dispatch("login", payload);
    //       } else {
    //         alert(data.msg);
    //         document.getElementById("register").reset();
    //       }
    //     });
    // },

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
              console.log(data[i]);
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

    // logs user in
    // login: async (context, payload) => {
    //   const {
    //     email,
    //     password
    //   } = payload;
    //   // fetch("http://localhost:3000/users", {
    //   fetch("https://node-eomp-api.herokuapp.com/users", {
    //       method: "PATCH",
    //       body: JSON.stringify({
    //         email: email,
    //         password: password,
    //       }),
    //       headers: {
    //         "Content-type": "application/json; charset=UTF-8",
    //         "x-auth-token": await context.state.token,
    //       },
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (data.msg === "Login Successful") {
    //         alert(data.msg);
    //         let user = data.user;
    //         let token = data.token;
    //         let cart = data.user.cart;
    //         context.commit("setuser", user);
    //         context.commit("setToken", token);
    //         context.commit("setcart", cart);
    //         if (user.usertype === "Admin") {
    //           context.state.admin = true
    //         }
    //         router.push({
    //           name: "products"
    //         })
    //       } else {
    //         alert(data.msg)
    //       }
    //     });
    // },

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

    // getuser : async (context) => {
    //   fetch("http://localhost:3000/verify")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     context.commit("setuser", data.user)
    //   })
    // },

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
    getCart: async (context, id) => {
      id = context.state.user.id;
      // fetch("http://localhost:3000/users/" + id + "/cart", {
      fetch("https://node-eomp-api.herokuapp.com/users/" + id + "/cart", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let cart = JSON.stringify(data);
          context.commit("setcart", cart);
        });
    },

    //delete one cart item
    removeOne: async (context, id, userid) => {
      userid = context.state.user.id;
      fetch(
        "https://node-eomp-api.herokuapp.com/users/" + userid + "/cart/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-auth-token": context.state.token,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          context.state.cart = null;
          context.dispatch("getCart");
        });
    },

    // delete all cart items
    deleteCart: async (context, userid) => {
      userid = context.state.user.id;
      fetch("https://node-eomp-api.herokuapp.com/users/" + userid + "/cart", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.msg);
          context.state.cart = [];
          context.dispatch("getCart");
        });
    },

    addToCart: async (context, id, userid) => {
      if (context.state.user === null) {
        alert("Please login");
      } else {
        userid = context.state.user.id;
        // fetch("http://localhost:3000/users/" + id +"/cart",{
        fetch("https://node-eomp-api.herokuapp.com/users/" + userid + "/cart", {
          method: "POST",
          body: JSON.stringify(id),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "x-auth-token": context.state.token,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.msg);
            context.dispatch("getCart");
          });
      }
    },

    getdata: async (context) => {},
  },
  modules: {},
});
