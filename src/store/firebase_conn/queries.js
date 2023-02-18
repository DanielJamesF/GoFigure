// SETTING UP DATABASE
// 1st Add a web app to project, use project name for web app name
// register app, don't worry about hosting.
// 2nd add a cloud firestore database to your firebase project
// Click next until popups disapperared.
// Start collection e.g Users (Collection is similiar to a table)
// add a document with auto-id e.g
// add fields to document. (Similiar to JSON keys and values )

// SETTING UP IN VUE
// create firebase folder in store folder
// create sdk.js file and queries.js file in firebase folder
// npm install firebase, bcryptjs, firebase-tools

// IN SDK.JS
// add firebase SDK
// copy the code seen at web app sdk

// IN QUERIES.JS
// Add all database queries

import firebase from "./sdk";
const db = firebase.firestore();

// adds document id to fields, this may be needed if you add data from
// firebase database and not the frontend
export const getDoc = async (qry) => {
  const docs = db.collection(qry);
  const doc = await docs.get();

  doc.forEach((doc) => {
    let prod = doc.data();
    let id = doc.id;
    prod.docid = id;
    let data = db.collection("Products").doc(doc.id).update(prod);
    console.log(data);
  });
};

// gets data from table, collecton
// query = whatever table name you have
export const getTable = async (query) => {
  let data = await db
    .collection(query)
    .get()
    .then((item) => {
      let count = 0;
      let table = [];
      item.forEach((doc) => {
        count++;
        if (count === 0) {
          return false;
        } else {
          table.push(doc.data());
        }
      });
      return table;
    })
    .catch(() => {
      return false;
    });
  return data;
};

export const getSingle = async (qry, docid) => {
  const data = await db.collection(qry).doc(docid).get();
  return data;
};

// adds data to collection
export const setData = async (qry, payload) => {
  const data = await db.collection(qry).add(payload);
  payload.docid = data.id;
  updateData(qry, payload);
  if (data) {
    alert("Successfully Added item");
  } else {
    alert("Error, Product not Added.");
  }
};

// this is obvious
export const updateData = async (qry, payload) => {
  const data = db.collection(qry).doc(payload.docid).update(payload);
  if (data) {
    alert("Successfully updated");
  } else {
    alert("Error, Product not updated.");
  }
};

// this is obvious
export const deleteData = async (qry, payload) => {
  const data = db.collection(qry).doc(payload).delete();
  if (data) {
    alert("Successfully deleted");
  } else {
    alert("Error, Product not deleted.");
  }
};

// Cart Shit
// export const

export const updateCart = async (qry, userid, payload) => {
  let arr;
  let i = await db.collection(qry).doc(userid).get();
  i = i.data();
  i = i.cart;
  if (i === null) {
    console.log("Cart empty");
    arr = [];
  } else {
    console.log("Cart Not Empty");
    arr = JSON.parse(i);
  }
  arr.push(payload);
  arr = JSON.stringify(arr);

  let userCart = db.collection(qry).doc(userid);
  await userCart.update({ cart: arr });
};

export const removeItem = async (qry, userid, docid) => {
  // R
  console.log("userid",  "=>", userid);
  console.log("prodid",  "=>", docid);

  let oldCart = await db.collection(qry).doc(userid).get();
  oldCart = oldCart.data();
  console.log(oldCart);
  oldCart = oldCart.cart;

  // filter out item 
  let newCart = JSON.parse(oldCart).filter((x) => {
    return x.docid != docid;
  });
  console.log("new cart",  "=>", newCart);


  // update statement
  let userCart = db.collection(qry).doc(userid);
  await userCart.update({ cart: JSON.stringify(newCart) });
};

export const clearCart = async (qry, docid) => {
  console.log(docid);
  let clearCart = db.collection(qry).doc(docid);
  await clearCart.update({ cart: null });
};
