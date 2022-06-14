function tirarDados()
{
    let numero;
    let numeroMenor;
    let flag = 0;
    let acumulador = 0;

    for(let i=0; i<4; i++)
    {
        numero = Math.floor(Math.random() * 6) + 1;
        if(flag == 0 || numero<numeroMenor)
        {
            flag = 1;
            numeroMenor = numero;
        }
        acumulador += numero;
    }
    acumulador -= numeroMenor;
    return acumulador;
}

function generarPuntos()
{
    let arrayPuntos = [];

    for(let i = 0; i<6; i++)
    {
        arrayPuntos.push(tirarDados());
    }
    return arrayPuntos;
}

function calcularModificador(caracteristica)
{
    let modificador = 0;
    let retorno;
    if(caracteristica<10)
    {
        for(let i = 10; i>=caracteristica; i--)
        {
            if(!(i%2 == 0))
            {
                modificador -= 1;
            }
        }
        retorno = modificador;
    }
    else
    {
        for(let i = 11; i<=caracteristica; i++)
        {
            if(i%2 == 0)
            {
                modificador += 1;
            }
        }
        retorno = "+" + modificador;
    }

    return retorno;
}



function agregarDatos()
{
    let destino = document.body;
    let newDiv = document.createElement('div');
    newDiv.id = 'divNombres';
    newDiv.innerHTML = `<label for="idNombre" id="labelNombre">Ingrese su nombre: </label>
                        <input type="text" name="nombre" id="idNombre" placeholder="Este nombre se guardará"><br><br>
                        <label for="idPersonaje">Ingrese el nombre de su personaje: </label>
                        <input type="text" name="personaje" id="idPersonaje" placeholder="Nombre de su personaje"><br><br><br>`
    destino.append(newDiv);

    crearBoton('divNombres', 'btnNombres');
}

function agregarRazas(razas)
{
    let destino = document.body;
    let newDiv = document.createElement('div');
    newDiv.id = 'divRazas';
    newDiv.innerHTML = `<h2>Elija una raza</h2>`
    destino.append(newDiv);

    let destinoForm = document.getElementById('divRazas');
    let newForm = document.createElement('form');
    newForm.id = 'formRazas';

    let contador = 0;
    let texto = '';
    for(let raza of razas)
    {
        texto += `<input type="radio" name="raza" id="raza${contador}" value="${raza.nombre}">
                  <label for="raza${contador}">${raza.nombre}</label><br><br>`;
        contador++;
    }
    newForm.innerHTML = texto;
    destinoForm.append(newForm);

    crearBoton('divRazas', 'btnRazas');
}

function agregarClases(clases)
{
    let destino = document.body;
    let newDiv = document.createElement('div');
    newDiv.id = 'divClases';
    newDiv.innerHTML = `<h2>Elija una clase</h2>`
    destino.append(newDiv);

    let destinoForm = document.getElementById('divClases');
    let newForm = document.createElement('form');
    newForm.id = 'formClases';

    let contador = 0;
    let texto = '';
    for(let clase of clases)
    {
        texto += `<input type="radio" name="clase" id="clase${contador}" value="${clase.nombre}">
                  <label for="clase${contador}">${clase.nombre}</label><br><br>`;
        contador++;
    }
    newForm.innerHTML = texto;
    destinoForm.append(newForm);

    crearBoton('divClases', 'btnClases');
}

function agregarPuntos(arrayPuntos, caracteristicas)
{
    let destino = document.body;
    let newDiv = document.createElement('div');
    newDiv.id = 'divPuntos';
    let texto = `<h2>Asignación de puntos</h2>
                       <p>Se tiran cuatro dados y se descarta el menor de los cuatro, los otros tres se suman.<br>
                       Esto se hace seis veces para obtener seis resultados que luego trendrán que ser asignados a cada una de las características</p><br><br>
                       <p><strong>SUS RESULTADOS SON: ${arrayPuntos.join(" - ")}</strong></p><br>`;
    
    let contador = 0;
    for(let carac of caracteristicas)
    {
        texto += `<label for="${contador}">${carac.nombre}: </label>
        <select name="${carac.nombre}" id="${contador}"></select><br><br>`  
        contador++;      
    }
    newDiv.innerHTML = texto;
    destino.append(newDiv);

    for(let i = 0; i<6; i++)
    {
        for(let numero of arrayPuntos)
        {
            let destino = document.getElementById(i);
            let elemento = document.createElement('option');
            elemento.innerHTML = `${numero}`;
            elemento.value = numero;
            destino.append(elemento);
        }
    }
    crearBoton('divPuntos', 'btnPuntos');
}

function mostrarPersonaje(personaje, caracteristicas)
{
    let destino = document.body;
    let newDiv = document.createElement('div');
    newDiv.id = 'divPersonaje';
    let texto = `<h1>Personaje de ${nombreUsuario}</h1><br><p><strong>Nombre del personaje: </strong>${nombrePersonaje}</p>`;
    texto += `<p><strong>Raza: </strong>${razaPersonaje.nombre}</p><p><strong>Clase: </strong>${clasePersonaje.nombre}</p><br>`;
    texto += `<p><strong>Habilidades: </strong><br><br>- ${clasePersonaje.habilidades.join('<br>- ')}</p><br>`;
    texto += `<h3>Puntos de característica y modificadores: </h3>`

    let cont = 0;
    for(let carac of caracteristicas)
    {
        texto += `<p>${carac.nombre} = ${personaje.puntosCaracteristica[cont]} ==> ${calcularModificador(personaje.puntosCaracteristica[cont])}</p>`;
        cont ++;
    }

    newDiv.innerHTML = texto;
    destino.append(newDiv);

}

function crearBoton(idDestino, idBtn)
{
    let destino = document.getElementById(idDestino);
    let newBtn = document.createElement('button');
    newBtn.id = idBtn;
    newBtn.type = 'submit'
    newBtn.innerText = 'Continuar';
    destino.append(newBtn);
}

function ocultar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'none';
    elemento.style.visibility = 'hidden';
}

function mostrar(id)
{
    let elemento = document.getElementById(id);
    elemento.style.display = 'block';
    elemento.style.visibility = 'visible';
}




class Raza
{
    constructor(nombre, puntosCaracteristica)
    {
        this.nombre = nombre;
        this.puntosCaracteristica = puntosCaracteristica;
    }
}

class Clase
{
    constructor(nombre, habilidades)
    {
        this.nombre = nombre;
        this.habilidades = habilidades;
    }
}

class Personaje
{
    constructor(nombrePersonaje, nombreUsuario, raza, clase, habilidades, puntosCaracteristica)
    {
        this.nombrePersonaje = nombrePersonaje;
        this.nombreUsuario = nombreUsuario;
        this.raza = raza;
        this.clase = clase;
        this.habilidades = habilidades;
        this.puntosCaracteristica = puntosCaracteristica;
    }
    asignarBonus()
    {
        for(let i = 0; i<6; i++)
        {
            this.puntosCaracteristica[i] += this.raza.puntosCaracteristica[i];
        }
    }
}



const draconido = new Raza("Dracónido (sangredragón)", [2, 0, 0, 2, 0, 1]);
const elfo = new Raza("Elfo", [0, 2, 0, 0, 0, 0]);
const enano = new Raza("Enano", [0, 0, 2, 0, 0, 0]);
const gnommo = new Raza("Gnomo", [0, 0, 0, 2, 0, 0]);
const humano = new Raza("Humano", [1, 1, 1, 1, 1, 1]);
const mediano = new Raza("Mediano", [0, 2, 0, 0, 0, 0]);
const semielfo = new Raza("Semielfo", [0, 0, 0, 0, 0, 2]);
const semiorco = new Raza("Semiorco", [2, 0, 1, 0, 0, 0]);
const tiflin = new Raza("Tiflin (estándar)", [0, 0, 0, 0, 0, 2]);

const barbaro = new Clase("Bárbaro", ["Furia", "Defensa sin armadura"]);
const bardo = new Clase("Bardo", ["Inspiración de bardo", "Lanzamiento de conjuros"]);
const brujo = new Clase("Brujo", ["Magia del pacto"]);
const clerigo = new Clase("Clérigo", ["Dominio divino", "Lanzamiento de conjuros"]);
const druida = new Clase("Druida", ["Lanzamiento de conjuros"]);
const explorador = new Clase("Explorador", ["Enemigo predilecto", "Explorador de la naturaleza"]);
const guerrero = new Clase("Guerrero", ["Estilo de combate", "Nuevas energías"]);
const hechicero = new Clase("Hechicero", ["Lanzamiento de conjuros"]);
const mago = new Clase("Mago", ["Recuperación arcana", "Lanzamiento de conjuros"]);
const monje = new Clase("Monje", ["Defensa sin armadura"]);
const paladin = new Clase("Paladín", ["Sentidos divinos", "Imponer las manos"]);
const picaro = new Clase("Pícaro", ["Ataque furtivo"]);


let nombreUsuario;
let nombrePersonaje;
let razas = [draconido, elfo, enano, gnommo, humano, mediano, semielfo, semiorco, tiflin];
let clases = [barbaro, bardo, brujo, clerigo, druida, explorador, guerrero, hechicero, mago, monje, paladin, picaro];

let caracteristicas = [{nombre: "Fuerza", puntos: 0}, 
                       {nombre: "Destreza", puntos: 0},
                       {nombre: "Constitución", puntos: 0},
                       {nombre: "Inteligencia", puntos: 0},
                       {nombre: "Sabiduría", puntos: 0},
                       {nombre: "Carisma", puntos: 0}];

let arrayPuntos = generarPuntos();
let razaPersonaje;
let clasePersonaje;
let flagNombre = 0;


agregarDatos();
agregarRazas(razas);
agregarClases(clases);
agregarPuntos(arrayPuntos, caracteristicas);

ocultar('conLocalStorage');
ocultar('btnLimpiar');
ocultar('divNombres');
ocultar('divRazas');
ocultar('divClases');
ocultar('divPuntos');

let btnNombres = document.getElementById('btnNombres');
let btnRazas = document.getElementById('btnRazas');
let btnClases = document.getElementById('btnClases');
let btnPuntos = document.getElementById('btnPuntos');
let btnNombresLS = document.getElementById('btnNombresLS');
let btnLimpiar = document.getElementById('btnLimpiar');



if(localStorage.getItem('nombreUsuario') == undefined)
{
    mostrar('divNombres');
}
else
{
    mostrar('conLocalStorage');
    mostrar('btnLimpiar');
}

btnLimpiar.addEventListener('click', ()=>{
    localStorage.clear();

    mostrar('divNombres');
    ocultar('divRazas');
    ocultar('divClases');
    ocultar('divPuntos');
    ocultar('conLocalStorage');
    ocultar('btnLimpiar');
    ocultar('divPersonaje');
    mostrar('idHeader');
})

btnNombres.addEventListener('click', (tomarInfo)=>{
    tomarInfo.preventDefault();

    nombreUsuario = document.getElementById('idNombre').value;
    localStorage.setItem('nombreUsuario', nombreUsuario);

    nombrePersonaje = document.getElementById('idPersonaje').value;

    ocultar('divNombres');   
    mostrar('divRazas');
    mostrar('btnLimpiar');
})

btnNombresLS.addEventListener('click', (tomarInfo)=>{
    tomarInfo.preventDefault();

    nombreUsuario = localStorage.getItem('nombreUsuario');
    nombrePersonaje = document.getElementById('idPersonajeLS').value;

    ocultar('conLocalStorage');
    mostrar('divRazas');
})

btnRazas.addEventListener('click', (tomarInfo)=>{
    tomarInfo.preventDefault();

    let razaRadio = document.querySelector('input[name="raza"]:checked').value;
        for(let raza of razas)
        {
            if(razaRadio == raza.nombre)
            {
                razaPersonaje = raza; 
            }
        }
    
    ocultar('divRazas');
    mostrar('divClases');
})

btnClases.addEventListener('click', (tomarInfo)=>{
    tomarInfo.preventDefault();

    let claseRadio = document.querySelector('input[name="clase"]:checked').value;
        for(let clase of clases)
        {
            if(claseRadio == clase.nombre)
            {
                clasePersonaje = clase; 
            }
        }
    
    ocultar('divClases');
    mostrar('divPuntos');
})


btnPuntos.addEventListener('click', (tomarInfo)=>{
    tomarInfo.preventDefault();

    let contador = 0;
    for(let carac of caracteristicas)
    {
        carac.puntos = document.getElementById(contador).value;
        contador++;
    }

    const personaje = new Personaje(nombrePersonaje, nombreUsuario, razaPersonaje, clasePersonaje, clasePersonaje.habilidades, [caracteristicas[0].puntos, caracteristicas[1].puntos, caracteristicas[2].puntos, caracteristicas[3].puntos, caracteristicas[4].puntos, caracteristicas[5].puntos]);
    personaje.asignarBonus;
    ocultar('idHeader');
    ocultar('divPuntos');
    
    mostrarPersonaje(personaje, caracteristicas);
})



