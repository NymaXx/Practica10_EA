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

        

        if(validarCandidato){
            let obj = {ID: id, Nombre: nombre};
            database.ref('Candidatos/' + id).set(obj);
            //database.ref('Votos/' + id).set(objVotes);
        }else{
            alert('El id del candidato que intenta registrar ya existe');
        }

    }

    validarCandidato = () => { //para evitar el doble registro de candidatos
        let nuevoCandidato = true;
        let idR = IDreg.value
        database.ref('Candidatos').on('value', (data) => {
            data.forEach(
                (nom) => {

                    let canID = nom.val();
                    let id = canID.id;
                    
                    if(id == idR){

                        nuevoCandidato = false;
                    }
                }
            );
        });
        return nuevoCandidato;
    }


    verCandidatos= () => {
        let nombresLista= [];
        database.ref('Candidatos').on('value', (data) => {
            data.forEach(
                (id)=>{
                    let list = id.val();
                    nombresLista.push(list.Nombre+ " " + list.ID + " ");
                    
                }
            );
            alert(nombresLista);
        });
    }

    votar= () => {
        let idAvotar = idVote.value;
        let votoRegis ={idVoto:Math.random(), id:idvAvotar}

        let key;
        let valide = false;

        database.ref('Candidatos').on('value', (data) => {
            data.forEach(
                 (c) => {
                    let val = c.val();
                    let id = val.id;
                    if(id == idAvotar){
                        valide= true;
                        key = c.key;
                    }
                }
            );

        });

        if(valide===true){
        database.ref('Votos/' + id).set(votoRegis);

        }else{
            alert('no existe un candidato con este ID');
        }
    }

    mostrarVotos = () => {
        let votosLista= [];
        let totalVotos;

        database.ref('Votos').on('value', (data) =>{
            totalVotos=data.numChildren();
            //console.log(totalVotos);
        });

        database.ref('Votos').on('value', (data) => {
            data.forEach(
                (c) => {
                    let valor = c.val();
                    let key = c.key;
                    let id = valor.id;
                    votosLista.push(id +" "+ datav.numChildren()/totalVotos*100+ "%");
                }
            )
        });
        alert(votosLista);
    }

 

    

    

//listeners de los botones
ETbotonRegistrar.addEventListener('click', registrarCandidato);
verNombresButton.addEventListener('click',verCandidatos);
verVotosButton.addEventListener('click', mostrarVotos);
voteButton.addEventListener('click', votar);

//CODIGO DEL PROFE

