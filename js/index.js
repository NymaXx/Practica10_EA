const ETname = document.getElementById('ETname');
const ETcedula = document.getElementById('ETcedula');
const ETbotonRegistrar = document.getElementById('ETbotonRegistrar');


const database = firebase.database();


const obtainData = ()=> {
  
    let nombre = ETname.value;
    let cedula = ETcedula.value;

    console.log(nombre);
    console.log(cedula);
    alert(nombre + " " + cedula);


    let obj = {nombre:nombre, cedula:cedula};

    database.ref('Users' + nombre).push(obj);


}

ETbotonRegistrar.addEventListener('click', obtainData);

database.ref('Users').on('value', (data)=>{
    data.forEach(
        user => {
        console.log(user.val());
    });
});