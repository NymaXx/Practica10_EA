//para registrar
const IDreg = document.getElementById('IDreg');
const nameReg = document.getElementById('nameReg');
const ETbotonRegistrar = document.getElementById('ETbotonRegistrar');

//para votar
const idVote = document.getElementById('idVote');
const voteButton = document.getElementById('voteButton');

//para ver los nombres y los votos
const verNombresButton = document.getElementById('verNombresButton');
const verVotosButton = document.getElementById('verVotosButton');

//objeto database
const database = firebase.database();


registrarCandidato = () => {
    let id = IDreg.value;
    let nombre = nameReg.value;

    let obj = {ID: id, Nombre: nombre};
    let objVotes = {ID: id, Cantidad: 0};
    database.ref('Candidatos/' + id).set(obj);
    //database.ref('Votos/' + id).set(objVotes);

}

verCandidatos= () => {
    database.ref('Candidatos').on('value', (data) => {
        data.forEach(
            (id)=>{
                let list = id.val().Nombre;
                alert(list);
            }
        );
    });
}


    /*const alfa = ()=>{
    
    database.ref('votos').on('value', (data)=>{
        
        var output = "";    
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            //la siguiente es para contar cuantos atributos hay, asi contamos los votos con el lenght
            let numVotos = Object.entries(child.val()).length;
            console.log(numVotos);
            //child.key es el identificador del candidato
            output += child.key+": "+numVotos;
        });
        console.log(output);
    });

}
alfa();*/


//modo dos del profe
const beta = ()=>{

    var output = "";
    database.ref('cadidatos').once('value', (data)=>{
        data.forEach(child => {
            console.log(child.key);
            console.log(child.val());
            database.ref('votos/'+child.key).once('value', (votos)=>{
                votos.forEach(voto=>{
                    console.log(child.key+"=>"+voto.val());
                    output += child.key+"=>"+voto.val();
                });
                
            });

    
        });
        console.log(output);
    });
}

beta();



    

//listeners de los botones
ETbotonRegistrar.addEventListener('click', registrarCandidato);
verNombresButton.addEventListener('click',verCandidatos);
//verVotosButton.addEventListener('click', alfa);

//CODIGO DEL PROFE

