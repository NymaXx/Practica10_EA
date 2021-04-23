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
    database.ref('Votos/' + id).set(objVotes);

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

votarPorId = () => {
    let id = idVote.value;
    
    database.ref('Votos').on('value', (dataVote)=>{
        dataVote.forEach(
            (idv)=>{
                let candidato = idv.val().ID;

                if(id == candidato){
                    database.ref('Votos/' + id).on('value', data.val().Cantidad);   
                };
            }
        );
    });

}
    

//listeners de los botones
ETbotonRegistrar.addEventListener('click', registrarCandidato);
verNombresButton.addEventListener('click',verCandidatos);
voteButton.addEventListener('click', votarPorId);

