const inputCep = document.querySelector("#input-cep");
const searchBtn = document.querySelector(".search-btn");

//fazer verificações do cep
function verificaCEP (cep){
    const cepValido = /^[0-9]{8}$/;

    if (cep == ""){
        alert("Por favor, informe um CEP.");
    }

    else if (!cepValido.test(cep)){
        alert("O CEP informado não é válido.");
    }

    else getViaCepAPI();
}

//pegar api
function getViaCepAPI (){
    const cep = document.querySelector("#input-cep").value;

    const apiURL = fetch(`https://viacep.com.br/ws/${cep}/json/`);
    
    apiURL
        .then((dados) => {
            return dados.json();
        })
        .then(mostrarEndereco);
}

//mostrar endereço
function mostrarEndereco (dados) {
    let divEndereco = document.querySelector(".result-adress");

    if (dados.erro){
        divEndereco.innerHTML = "<p><strong>Não foi possivel encontrar este CEP.</strong></p>"
        divEndereco.style.color = "#3c4e3c";
    }

    else {
        divEndereco.innerHTML= `<h2>Endereço encontrado:</h2>
                                <p><strong>CEP:</strong> ${dados.cep}</p>
                                <p><strong>Rua: </strong>${dados.logradouro}</p>
                                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                                <p><strong>Localidade:</strong> ${dados.localidade} - ${dados.uf}</p>`
    }
    
    document.querySelector("#input-cep").value=("");
}

//eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let cep = inputCep.value;

    verificaCEP(cep);
});

inputCep.addEventListener("keypress", (e) => {
    if (e.code === "Enter") {
        const cep = e.target.value;
        
        verificaCEP(cep);
    }
})