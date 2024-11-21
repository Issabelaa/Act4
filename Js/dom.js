let titulo = document.getElementById("titulo");
console.log(titulo.textContent);
titulo.style.color = "red";

let parrafos = document.getElementsByTagName("p");
console.table(parrafos);
Array.from(parrafos).forEach((el, idx) => {
    el.innerText = "Texto" + (idx + 1);
});

let parrafos2 = document.getElementsByClassName ("parrafo");
console.log(parrafos2[1].textContent);
parrafos2[1].style.backgroundColor = "greenyellow";
parrafos2[1].innerHTML = "<strong> Nuevo parrafo </strong>";

let parrafo = document.querySelector(".parrafo");
console.log(parrafo.textContent);
parrafo.className = "nuevo-parrafo";

let parrafo_nuevo = document.createElement("p");
parrafo.innerText = "Nuevo Parrafo";
document.body.appendChild(parrafo);
console.log (parrafo_nuevo);

let h1 = document.querySelector("h1");
h1.innerText = "titulo dinamico"
let hr = document.createElement("hr");

parrafo_nuevo.prepend(h1);
parrafo_nuevo.append(hr);

let padre_parrafo = parrafo.parentElement;
console.log(padre_parrafo);

let lista = document.createElement("ol");
for (let i = 1; i<= 5; i++){
    let item = document.createElement("li");
    item.innerText = `Elemento ${i}`;
    lista.appendChild(item);
}
padre_parrafo.appendChild(lista);

