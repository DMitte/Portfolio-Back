const {initializeApp} = require('firebase/app')

const inicializador = () =>{
    //inicializador firebase
    const firebaseConfig = {
        apiKey: process.env.apiKey,
        authDomain: process.env.authDomain,
        databaseURL: process.env.databaseURL,
        projectId: process.env.projectId,
        storageBucket: process.env.storageBucket,
        messagingSenderId: process.env.measurementId,
        appId: process.env.appId,
        measurementId: process.env.measurementId,
    };
  
    // Initialize Firebase
    initializeApp(firebaseConfig);
}

module.exports = inicializador