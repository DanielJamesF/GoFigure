import { createStore } from "vuex";
import { router } from "@/router/index.js";
import sweet from "sweetalert2";

// const sweet = require('sweetalert2')
const api = "https://gofigure-api.onrender.com";

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
    token: null || localStorage.getItem("GoFigureToken"),
    // user: {
    //   firstname: "Boi"
    // },
    user: null || JSON.parse(localStorage.getItem("GoFigureUser")),
    admin: false,
    users: null,
    cart: null,
    asc: true,
  },
  getters: {},
  mutations: {
    setproducts: (state, products) => {
      state.products = products;
      console.log(products);
    },
    setproduct: (state, product) => {
      state.product = product;
    },
    setuser: (state, user) => {
      state.user = user;
      localStorage.setItem("GoFigureUser", JSON.stringify(user));
      // console.log(user);
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
      localStorage.setItem("GoFigureToken", token);
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
        context.dispatch("getCart");
      }
    },
    // retrieves all products
    getProducts: async (context) => {
      // fetch("http://localhost:3000/products")
      fetch(api + "/products")
        .then((res) => res.json())
        .then((data) => context.commit("setproducts", data.results));
    },

    // retrieves single
    getProduct: async (context, id) => {
      // fetch("http://localhost:3000/products/" + id)
      fetch(api + "/products/" + id)
        .then((res) => res.json())
        .then((data) => context.commit("setproduct", data.results));
    },

    addProduct: async (context, payload) => {
      const { prodname, prodimg, category, stock, price } = payload;
      // fetch("http://localhost:3000/products", {
      fetch(api + "/products", {
        method: "POST",
        body: JSON.stringify({
          prodname: prodname,
          prodimg: prodimg,
          category: category,
          stock: stock,
          price: price,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sweet.fire({
            icon: "success",
            title: "Success",
            text: data.msg,
            timer: 2000,
          });
          context.dispatch("getProducts");
        });
    },

    // updates list
    updateProduct: async (context, product) => {
      // fetch("http://localhost:3000/products/" + product.id, {
      fetch(api + "/products/" + product.id, {
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sweet.fire({
            icon: "success",
            title: "Success",
            text: data.msg,
            timer: 2000,
          });
          context.dispatch("getProducts");
        });
    },
    //

    // Deletes Item from db
    deleteProduct: async (context, id) => {
      sweet
        .fire({
          title: "Are you sure you want to delete a product?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            fetch(api + "/products/" + id, {
              method: "DELETE",
              headers: {
                "x-auth-token": context.state.token,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                context.dispatch("getProducts");
                sweet.fire({
                  icon: "success",
                  title: "Success",
                  text: data.msg,
                  timer: 2000,
                });
              });
          } else if (result.isDenied) {
          }
        });
      // fetch("http://localhost:3000/products/" + id, {
    },

    register: async (context, payload) => {
      const {
        firstname,
        lastname,
        email,
        usertype,
        contact,
        address,
        password,
      } = payload;
      // firstname, lastname, email, usertype, contact, address, password, joindate, cart
      // fetch("http://localhost:3000/users", {
      fetch(api + "/users", {
        method: "POST",
        body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          usertype: usertype,
          contact: contact,
          address: address,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "Registration Successful") {
            alert(data.msg);
            context.dispatch("login", payload);
          } else {
            // console.log("Incorrect Email");
            payload.password = await bcrypt.hash(payload.password, 10);
            setData("Users", payload);
          }
        }
      }
    },

    login: async (context, payload) => {
      const { email, password } = payload;
      // fetch("http://localhost:3000/users", {
      fetch(api + "/users", {
        method: "PATCH",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": await context.state.token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.msg === "Login Successful") {
            sweet.fire({
              icon: "success",
              title: "Success",
              text: data.msg,
              timer: 2000,
            });
            let user = data.user;
            let token = data.token;
            let cart = data.user.cart;
            context.commit("setuser", user);
            context.commit("setToken", token);
            context.commit("setcart", cart);
            if (user.usertype === "Admin") {
              context.state.admin = true;
            }
            router.push({
              name: "products",
            });
          } else {
            sweet.fire({
              icon: "error",
              title: "Error",
              text: data.msg,
              timer: 2000,
            });
          }
        }
      }
    },

    // Deletes user from db
    deleteuser: async (context, id) => {
      sweet
        .fire({
          title: "Are you sure you want to remove a user?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // fetch("http://localhost:3000/users/" + id, {
            fetch(api + "/users/" + id, {
              method: "DELETE",
              headers: {
                "x-auth-token": context.state.token,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                context.dispatch("getusers");
                sweet.fire({
                  icon: "success",
                  title: "Success",
                  text: data.msg,
                  timer: 2000,
                });
              });
          } else if (result.isDenied) {
          }
        });
    },

    // update user infor
    updateUser: async (context, user) => {
      // fetch("http://localhost:3000/users/" + user.id, {
      fetch(api + "/users/" + user.id, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          sweet.fire({
            icon: "success",
            title: "Success",
            text: data.msg,
            timer: 2000,
          });
          context.dispatch("getusers");
        });
    },

    // verifyUser : async (context) => {
    //   // fetch("http://localhost:3000/verify")
    //   fetch(api + "/verify", {
    //     method: "GET",
    //     headers: {
    //       "Content-type": "application/json; charset=UTF-8",
    //       "x-auth-token": context.state.token,
    //     },
    //   })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     context.commit("setuser", data.user)
    //   })
    // },

    // retrieves all users
    getusers: async (context) => {
      // fetch("http://localhost:3000/users", {
      fetch(api + "/users", {
        headers: {
          "x-auth-token": await context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          context.commit("setusers", data.results);
        });
    },

    // get cart
    getCart: async (context, id) => {
      id = context.state.user.id;
      // fetch("http://localhost:3000/users/" + id + "/cart", {
      fetch(api + "/users/" + id + "/cart", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": context.state.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          let cart = JSON.stringify(data);
          console.log(cart);
          context.commit("setcart", cart);
        });
    },

    //delete one cart item
    removeOne: async (context, id, userid) => {
      userid = context.state.user.id;
      sweet
        .fire({
          title: "Are you sure you want to remove an item from your cart?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            fetch(api + "/users/" + userid + "/cart/" + id, {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-auth-token": context.state.token,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                context.state.cart = null;
                context.dispatch("getCart");
                sweet.fire({
                  icon: "success",
                  title: "Success",
                  text: data.msg,
                  timer: 2000,
                });
              });
          } else if (result.isDenied) {
          }
        });
    },

    // delete all cart items
    deleteCart: async (context, userid) => {
      userid = context.state.user.id;
      sweet
        .fire({
          title: "Are you sure you want to clear your cart?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: `No`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            fetch(api + "/users/" + userid + "/cart", {
              method: "DELETE",
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                "x-auth-token": context.state.token,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                sweet.fire({
                  icon: "success",
                  title: "Success",
                  text: data.msg,
                  timer: 2000,
                });
                context.state.cart = null;
                context.dispatch("getCart");
              });
          } else if (result.isDenied) {
          }
        });
    },

    addToCart: async (context, id, userid) => {
      if (context.state.user === null) {
        sweet.fire({
          icon: "error",
          title: "Error",
          text: "Please Login",
        });
      } else {
        userid = context.state.user.id;
        sweet
          .fire({
            title: "Are you sure you want to this product to your cart?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Yes",
            denyButtonText: `No`,
          })
          .then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // fetch("http://localhost:3000/users/" + id +"/cart",{
              fetch(api + "/users/" + userid + "/cart", {
                method: "POST",
                body: JSON.stringify(id),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  "x-auth-token": context.state.token,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  sweet.fire({
                    icon: "success",
                    title: "Success",
                    text: data.msg,
                    timer: 2000,
                  });
                  context.dispatch("getCart");
                });
            } else if (result.isDenied) {
            }
          });
      }
    },
  },
  modules: {},
});
