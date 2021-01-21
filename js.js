console.log("Javascript cargado")

 // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBv9n3YrpUk4DRVX7BsU38A723DgcRZklQ",
    authDomain: "luis-31ed0.firebaseapp.com",
    projectId: "luis-31ed0",
    storageBucket: "luis-31ed0.appspot.com",
    messagingSenderId: "570910630703",
    appId: "1:570910630703:web:35d09ab13c0de62e36f7da"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

let arregloUsuarios = [];

  db.collection("usuarios").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {

    	var obj = doc.data()
        obj.id = doc.id;
        arregloUsuarios.push(obj);
    });
});
  
  console.log(arregloUsuarios)

  function leerDatosUsuario(){
  	var id = document.getElementById("usuarioaEliminar").value

  	var docRef = db.collection("usuarios").doc(id);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        var usuarioSeleccionado = doc.data();
        console.log(usuarioSeleccionado.Nombre)

          	document.getElementById("emailNuevoUsuario").value =usuarioSeleccionado.Email
  	document.getElementById("nombreNuevoUsuario").value=usuarioSeleccionado.Nombre
  	document.getElementById("contraseniaNuevoUsuario").value=usuarioSeleccionado.Contrasenia

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});



  }






  function agregarDatos(){
  	var email = document.getElementById("emailNuevoUsuario").value
  	var nombre = document.getElementById("nombreNuevoUsuario").value
  	var password= document.getElementById("contraseniaNuevoUsuario").value

  	if(email == "" || email == null){
  		alert("El email no puede estar vacio")
  	}else{
  		  db.collection("usuarios").add({

    Email: email,
    Contrasenia: password,
    Nombre: nombre
})
.then(function(docRef) {
    alert("El usuario se agrego correctamente")
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});

  	}

  	

  }

function borrarDatosUsuarios(){
	console.log("Se ejecuto la funcion eliminar datos")
	var id = document.getElementById("usuarioaEliminar").value

	for(var i = 0 ; i < arregloUsuarios.length;i++){
if(arregloUsuarios[i].Email == id){
	console.log("El id del usuario que quieres eliminar es : " +arregloUsuarios[i].id )

}
		

	}
	/*

	db.collection("usuarios").doc(id).delete().then(function() {
    alert("El usuario se elimino correctamente")
}).catch(function(error) {
    console.error("Error removing document: ", error);
});*/
}

function editarUsuario(){



	var id = document.getElementById("usuarioaEliminar").value


	for(var i = 0 ; i < arregloUsuarios.length;i++){
if(arregloUsuarios[i].Email == id){
	console.log("El id del usuario que quieres editar es : " +arregloUsuarios[i].id )

}
}

	var email = document.getElementById("emailNuevoUsuario").value
  	var nombre = document.getElementById("nombreNuevoUsuario").value
  	var password= document.getElementById("contraseniaNuevoUsuario").value
	var usuarioAeditar = db.collection("usuarios").doc(id);

// Set the "capital" field of the city 'DC'
return usuarioAeditar.update({
    "Nombre": nombre,
    "Contrasenia":password,
    "Email":email
})
.then(function() {
    console.log("Document successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

}
