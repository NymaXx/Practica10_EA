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
    database.ref('Candidatos/' + id).set(obj);
    //database.ref('Candidatos/A1').set(obj);
}

verCandidatos= () => {
    database.ref('Candidatos').on('value', (data) => {
        data.forEach(
            (id)=>{
                console.log(id.val());
            }
        );
    });
}

verVotos = () => {
    database.ref('Candidatos').on('value', (votes) => {
        console.log(votes.val());
        alert(votes.val());
    });
}

//listeners de los botones
ETbotonRegistrar.addEventListener('click', registrarCandidato);
verNombresButton.addEventListener('click',verCandidatos);
verVotosButton.addEventListener('click',verVotos);

