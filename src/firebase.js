import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCZ6-EfgO8NRp6KLbcHhS_5f5eyMEmi8lc",
    authDomain: "dashboardproject-762b3.firebaseapp.com",
    projectId: "dashboardproject-762b3",
    storageBucket: "dashboardproject-762b3.appspot.com",
    messagingSenderId: "77641494843",
    appId: "1:77641494843:web:a425e970a8538346e3071e",
    measurementId: "G-QPF7JH0DQ6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const firebaseDB= firebase.database();
const fireStorage=firebase.storage();
const firebaseLooper=(snapshot)=>{
  const dataList=[];
  snapshot.forEach((snap)=>{
    dataList.push(snap.val())
  })
  return dataList;
}
export { firebaseDB,firebase,firebaseLooper,fireStorage }