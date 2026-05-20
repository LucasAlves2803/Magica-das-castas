const json_cards = {1: "Ás de Copas", 2: "2 de Copas", 3: "3 de Copas", 4: "4 de Copas", 5: "5 de Copas", 6: "6 de Copas", 7: "7 de Copas", 8: "8 de Copas", 9: "9 de Copas", 10: "10 de Copas", 11: "Valete de Copas", 12: "Dama de Copas", 13: "Rei de Copas",
                    14: "Ás de Ouros", 15: "2 de Ouros", 16: "3 de Ouros", 17: "4 de Ouros", 18: "5 de Ouros", 19: "6 de Ouros", 20: "7 de Ouros", 21: "8 de Ouros", 22: "9 de Ouros", 23: "10 de Ouros", 24: "Valete de Ouros", 25: "Dama de Ouros", 26: "Rei de Ouros",
                    27: "Ás de Espadas", 28: "2 de Espadas", 29: "3 de Espadas", 30: "4 de Espadas", 31: "5 de Espadas", 32: "6 de Espadas", 33: "7 de Espadas", 34: "8 de Espadas", 35: "9 de Espadas", 36: "10 de Espadas", 37: "Valete de Espadas", 38: "Dama de Espadas", 39: "Rei de Espadas",}



const relacao =     { "Ás de Copas" : 'ah', "2 de Copas" : '2h', "3 de Copas" : '3h',  "4 de Copas" : '4h', "5 de Copas" : '5h',  "6 de Copas" : '6h', "7 de Copas" : '7h', "8 de Copas" : '8h', "9 de Copas" : '9h', "10 de Copas" : '10h', "Valete de Copas" : 'jh', "Dama de Copas" : 'qh', "Rei de Copas" : 'kh',
                     "Ás de Ouros" : 'ad' ,"2 de Ouros" : '2d' , "3 de Ouros" : '3d',  "4 de Ouros" : '4d', "5 de Ouros" : '5d',  "6 de Ouros" : '6d', "7 de Ouros" : '7d', "8 de Ouros" : '8d', "9 de Ouros" : '9d', "10 de Ouros" : '10d', "Valete de Ouros" : 'jd', "Dama de Ouros" : 'qd', "Rei de Ouros" : 'kd',
                    "Ás de Espadas" : 'as' ,"2 de Espadas" : '2s' , "3 de Espadas" : '3s',  "4 de Espadas" : '4s', "5 de Espadas" : '5s',  "6 de Espadas" : '6s', "7 de Espadas" : '7s', "8 de Espadas" : '8s', "9 de Espadas" : '9s', "10 de Espadas" : '10s', "Valete de Espadas" : 'js', "Dama de Espadas" : 'qs', "Rei de Espadas" : 'ks'}

let array_cards = [];
let array_escolhidas = new Array(22).fill(0); // Índices de 0 a 21

let linhas = 3;
let colunas = 7;
var base = '';
var contador =0;
let bd = document.querySelector('body'); 
let matriz_de_baralho = new Array (linhas);



document.addEventListener("DOMContentLoaded",  function(){
    mensagem_inicial();
})

function mensagem_inicial(){

    criar_matriz();
    gerar_baralho();    
    bd.innerHTML = ` <h1> Mágica que descobre a carta </h1>
      <div class='Apresentacao'> 
        <span class="pcard-back" id='back1'>  </span>
        <span class="pcard-back" id='back2'>  </span> 
        <span class="pcard-back" id='back3'>  </span>
      </div> 
      <button class='botao'> Começar!</button>
    `;
    bd.classList.add("body1");
    
    
    // animação do embaralhamento das cartas
    let promessa1 = (callback) => { setTimeout(()=>{
        let bc = bd.querySelector("#back1");
        bc.style.left = "35%";
        bc.style.transition = "left 0.8s ease";
        console.log("Tirou a primeira carta");
        callback();
    },200); }
    

    let promessa2 = (callback) => { setTimeout(()=>{
              let bc = bd.querySelector("#back2");
              bc.style.left = "65%";
              bc.style.transition = "left 0.8s ease";
              console.log("Tirou a segunda carta");
              callback();
    },800); }

     let promessa3 = (callback) => { setTimeout(()=>{
              let bc = bd.querySelector("#back1");
              bc.style.left = "50%";
              bc.style.transition = "left 0.8s ease";
              bc.style.zIndex = 10;
              console.log("Voltou com a primeira carta");
              callback();
    },800); }

     let promessa4 = (callback) => { setTimeout(()=>{
              let bc = bd.querySelector("#back2");
              bc.style.left = "50%";
              bc.style.transition = "left 0.8s ease";
              bc.style.zIndex = 11;
              console.log("Voltou com a segunda carta");
              callback();
    },800); }

    promessa1( ()=> {
        promessa2( ()=>{
            promessa3( ()=>{
                    promessa4( ()=>{ 
                    });
            });
        });
    });


    
    
    
    
    
    

    

    let btn = bd.querySelector(".botao");
    btn.addEventListener("click", ()=> {
        mensagem_de_explicacao();
    });
}


function mensagem_de_explicacao(){
     bd.innerHTML = ` <h1> Escolha mentalmente uma carta</h1>
            <div class='linha1'> </div>
            <div class='linha2'> </div>
          <div class='linha3'>  </div>


     
      <button class='botao'> Começar!</button>
    `;
    mostrar_cartas2();

    
    let btn = bd.querySelector(".botao");
    btn.addEventListener("click", ()=> {
        main();
    });
}





function criar_matriz(){
    for (let i = 0; i < linhas; i++){
        matriz_de_baralho[i] = new Array (colunas);
    }
}


function gerar_baralho(){
    let num =0;
    let i = 1;
    while ( i <= 21) {
        num = Math.floor(Math.random() * 39) + 1; // Gera um número aleatório entre 1 e 39
        if (array_escolhidas[num - 1] === 0) { // Verifica se a carta já foi escolhida
            array_cards.push(json_cards[num]);
            array_escolhidas[num - 1] = 1; // Marca a carta como escolhida
            i++;
        }
    }
}



function distribuir_cartas(){
    for (let i =0; i < colunas; i++){
        for (let j=0; j < linhas; j++){
            matriz_de_baralho[j][i] = array_cards.pop();
        }
    }
}

function mostrar_cartas2(){
        let nome_classe = '';
        nome_classe = 'linha1';
        for (let j=0; j < 21; j++){
            let base  = document.querySelector(`.${nome_classe}`);
            base.innerHTML += `<span class="pcard-${relacao[array_cards[j]]}"></span>`;
        }
        
    }


function mostrar_cartas(){
    let nome_classe = '';
    for (let i=0; i < linhas; i++){
        console.log("Pilha ", i+1);
        nome_classe = 'coluna' + (i+1);
        for (let j=0; j < colunas; j++){
            let base  = document.querySelector(`.${nome_classe}`);
            base.innerHTML += `<span class="pcard-${relacao[matriz_de_baralho[i][j]]}"></span>`;
            console.log( matriz_de_baralho[i][j]);
        }
        
    }
  //  let x  = prompt("Em qual pilha está a carta que você pensou? 1 ou 2 ou 3")
    // return x;
}


function devolver_cartar(x){
    let cont = 0;
    let x_lista = [];
    x_lista.push(x-1);
    array_cards.length = 0;
    while ( cont < 3){
        if ( cont == 1){
            i = x - 1;
        }else{
             y = (Math.floor(Math.random() * 3));
             while (  x_lista.includes(y) ){
                y = (Math.floor(Math.random() * 3));
             }
             i = y;
             x_lista.push(i);
        }
        for (let j =0; j < colunas; j++ ){
            array_cards.push( matriz_de_baralho[i][j] );
        }
        cont++; 
    }
}


function revelacao(){
    bd.innerHTML = `<div class='carta-container'> 
                        <div class="carta-final"> 
                            <div class="face verso">
                                <span class='pcard-back'> </span>
                            </div>
                            <div class="face frente">
                                <span class="pcard-${relacao[array_cards[10]]}" </span>
                            </div>
                        </div>
                    </div>`

    const carta = bd.querySelector(".carta-final");
    
    carta.addEventListener("click",() => {
        carta.classList.toggle("virada");
        
    });
    console.log("A carta que você pensou é " + array_cards[10]);
}



function criar_divs(){
    
    bd.innerHTML = `
    <h1 class='frase'> Clique na coluna onde está a carta </h1>
    <div class="coluna1">
    </div>
    <div class="coluna2">

    </div>
    <div class="coluna3">
    
    </div>`;
    if (bd.classList.contains("body1")){
        bd.classList.remove("body1");
        bd.classList.add("body2");
    }
    
    

     // 2. Seleciona as divs criadas diretamente de dentro do contêiner 'bd'
    const col1 = bd.querySelector(".coluna1");
    const col2 = bd.querySelector(".coluna2");
    const col3 = bd.querySelector(".coluna3");

    // 3. Atribui o addEventListener dinamicamente a cada uma
    col1.addEventListener("click", () => {
        devolver_cartar(1);
        contador++;
        if (contador < 3){
            main();
        }else if (contador == 3){
            revelacao();
        }

        console.log('coluna 1');
    });

    col2.addEventListener("click", () => {
        devolver_cartar(2);
        contador++;
        if (contador < 3){
            main();
        }else if (contador == 3){
            revelacao();
        }
        console.log("coluna 2");
    });

    col3.addEventListener("click", () => {
        devolver_cartar(3);
        contador++;
        if (contador < 3){
            main();
        }else if (contador == 3){
            revelacao();
        }
        console.log("coluna 3");
    });

    

}




function embaralhar(){
    bd.innerHTML = `
    <p class="texto-centralizado">Embaralhando!</p>
    `;
    
    // Exemplo com setTimeout (após 2 segundos)
    return new Promise((resolve) => { 
        setTimeout(() => {
        criar_divs();
        resolve();  
        }, 3000);
    })


} // 2000 milissegundos = 2 segundos
    



async function main(){ 
    
        await embaralhar();
        distribuir_cartas();
        mostrar_cartas(); 
    
    
}


