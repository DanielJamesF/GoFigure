import firebase from "./sdk";
const db = firebase.firestore();

// export const getDoc = async (qry) => {
//   const docs = db.collection(qry);
//   const doc = await docs.get();
//   doc.forEach((doc) => {
//     console.log(doc.id, "=>", doc.data());
//   });
// };
export const getDoc = async (qry) => {
  const docs = await db
    .collection(qry)
    .get()
    .then((docid) => {
      let count = 0;
      let table = [];
      docid.forEach((doc) => {
        count++;
        if (count === 0) {
          return false;
        } else {
          table.push(doc.id);
        }
      });
      return table; 
    })
    .catch(() => {
      return false;
    });
  return docs;
  // doc.forEach((doc) => {
  //   console.log(doc.id, "=>", doc.data());
  // });
};

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

export const setData = async (qry, payload) => {
  const data = await db.collection(qry).add(payload);
  // console.log(data);
};

export const updateData = async (qry, doc, payload) => {
  const data =  db.collection(qry)
  .doc(doc)
  .update(payload);
  console.log(data);
}