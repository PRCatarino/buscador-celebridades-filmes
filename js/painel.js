    var nomeUsuario =  localStorage.getItem("nomeUsuario");
    document.querySelector(".nomeDoUsuario").innerHTML = nomeUsuario;


function busca(){
    const tipoBusca = document.querySelector('input[name="tipoBusca"]:checked').value;
    const filtroBusca = document.querySelector("#filtroBusca").value;
    let url = ``;

    if(tipoBusca == "a"){
        url = `http://api.tvmaze.com/search/people?q=${filtroBusca}`;
    }else{
        url = `http://api.tvmaze.com/search/shows?q=${filtroBusca}`;
    }

    document.querySelector(".dados").innerHTML = "";

    fetch(url).then(async(resposta)=>{
        if(resposta.ok){
            const dados = await resposta.json();
            
            for(let i in dados){                  // pode ser feita assim tbm for(let i=0; i<dados.leght;i++)
                console.log(dados[i])
                let item = null;

                if(tipoBusca =="a"){
                    item = dados[i].person;
                }else{
                    item = dados[i].show;
                }

                let imagem = "/imgs/semImagem.png" 
                let nome = item.name
                if(nome.length > 15){
                    nome = nome.substring(0, 15)
                }

                if(item.image){
                    imagem = item.image.medium;
                }

                document.querySelector(".dados").innerHTML += 
                `<div class="item">
                    <p>
                        ${nome}
                    </p>
                    <a href="/">
                        <img class="imagemDaBusca" src="${imagem}"/>
                    </a>
                </div>`                
            }
        }
    })
}


