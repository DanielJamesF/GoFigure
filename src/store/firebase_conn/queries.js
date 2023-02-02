import firebase from "./sdk";
const db = firebase.firestore();

export const getDoc = async (qry) => {
  const docs = db.collection(qry);
  const doc = await docs.get();

  doc.forEach((doc) => {
    let prod = doc.data()
    let id = doc.id
    prod.docid = id;
    let data =  db.collection("Products").doc(doc.id).update(prod);
    console.log(data);
  });
};

// export const getDoc = async (qry) => {
//   const docs = await db
//     .collection(qry)
//     .get()
//     .then((docid) => {
//       let count = 0;
//       let table = [];
//       docid.forEach((doc) => {
//         count++;
//         if (count === 0) {
//           return false;
//         } else {
//           table.push(doc.id);
//         }
//       });
//       return table;
//     })
//     .catch(() => {
//       return false;
//     });
//   return docs;
//   // doc.forEach((doc) => {
//   //   console.log(doc.id, "=>", doc.data());
//   // });
// };

export const getTable = async (query) => {
  // console.log(firebase.firestore())
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

export const setData = async (qry, payload) => {
  const data = await db.collection(qry).add(payload);
  payload.docid = data.id;
  updateData(qry, payload);
};

export const updateData = async (qry, payload) => {
  console.log(payload);
  const data = db.collection(qry).doc(payload.docid).update(payload);
  if (data) {
    alert("Successfully updated");
  } else {
    alert("Error, Product not updated.");
  }
};

export const deleteData = async (qry, payload) => {
  const data = db.collection(qry).doc(payload).delete();
  if (data) {
    alert("Successfully deleted");
  } else {
    alert("Error, Product not deleted.");
  }
};




