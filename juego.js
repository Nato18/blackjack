let deck = [];
const tipos = ["C", "D","H", "S"]
const especiales = ["A", "J", "Q", "K"];

let puntosjugador = 0, puntospc = 0;

// LLamadas de HTML
const pedir = document.querySelector("#pedir");    
const parar = document.querySelector("#parar");
const nuevo = document.querySelector("#nuevo-juego");

const divcartasjugador = document.querySelector("#jugador-cartas");
const divcartaspc = document.querySelector("#Computadora-cartas");
const imagen_ganar = document.querySelector(".meme-ganar");
const imagen_perder = document.querySelector(".meme-perder");

const puntos = document.querySelectorAll("small");

const crearDeck = ()=>{


    for( let i = 2; i<= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo);
        }
    }

    for (let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo)
        }
    }
    deck = _.shuffle(deck);
   
    console.log(deck);
}

crearDeck();

const pedirCarta = () => {

    if(deck.length === 0){
        throw "No hay cartas en el deck"
    }

    let carta = deck.pop();
    return carta;
}

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length -1);   
    return (isNaN(valor)) ? 
           ( valor === "A") ? 11 : 10
           : valor * 1 ;

    
}

const turnopc = (puntosminimos) =>{

    do {
        const carta = pedirCarta();
        puntospc = puntospc + valorCarta(carta);
        puntos[1].innerText = puntospc;
        
        //<img class="cartas" src="cartas/5C.png" alt="">

        const imgCarta = document.createElement('img');
        imgCarta.src= `cartas/${carta}.png`;
        divcartaspc.append(imgCarta);
        imgCarta.classList.add('cartas');
        if (puntosminimos > 21){
            break;
        }

    } while( (puntospc < puntosminimos) && (puntosminimos <=21));
    setTimeout(() => {
        
        if (puntospc === puntosminimos){
            alert("Nadie gana");
        }else if(puntosminimos > 21){
            //alert("El Pc gana")

            const imgmeme = document.createElement('img');
            imgmeme.src= `meme/perder.jpg`;
            imgmeme.classList.add('imagen-perder');
            imagen_perder.append(imgmeme);

        }else if (puntospc > 21) {

            const imgmeme = document.createElement('img');
            imgmeme.src= `meme/ganar.png`;
            imgmeme.classList.add('imagen-ganar');
            imagen_ganar.append(imgmeme);
        }else{
           
            const imgmeme = document.createElement('img');
            imgmeme.src= `meme/perder.jpg`;
            imgmeme.classList.add('imagen-perder');
            imagen_perder.append(imgmeme);
        }
    }, 10);
}




//Eventos

pedir.addEventListener('click',function() {

    const carta = pedirCarta();
    puntosjugador = puntosjugador +valorCarta(carta);
    puntos[0].innerText = puntosjugador;
    
    //<img class="cartas" src="cartas/2C.png" alt="">

    const imgCarta = document.createElement('img');
    imgCarta.src= `cartas/${carta}.png`;
    imgCarta.classList.add('cartas');
    divcartasjugador.append(imgCarta);

    if (puntosjugador > 21){
        console.warn("Sorry mano, Perdiste wuajaja");
        pedir.disabled = true;
        parar.disabled = true;
        turnopc(puntosjugador);
    }else if(puntosjugador === 21){
        console.warn("Ganaste pana, 21!");
        pedir.disabled = true;
        parar.disabled = true;
        turnopc(puntosjugador);
    }

    const total = (puntosjugador > 21) ? console.log("Sorry mano, perdiste") : console.log("dele no mas"); 

});
parar.addEventListener('click',function(){

    pedir.disabled = true;
    parar.disabled = true;
    turnopc(puntosjugador)
    
});

nuevo.addEventListener('click',function(){

    console.clear();
    deck = [];
    crearDeck();

    puntosjugador = 0;
    puntospc = 0;

    puntos[0].innerText = 0;
    puntos[1].innerText = 0;

    divcartasjugador.innerHTML = "";
    divcartaspc.innerHTML = "";
    imagen_perder.innerHTML = "";
    imagen_ganar.innerHTML = "";
    
    pedir.disabled = false;
    parar.disabled = false;

});


