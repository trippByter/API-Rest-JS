console.log("Cargando - Console.log");

const URL = "https://api.thecatapi.com/v1/images/search"


fetch(URL)
  // transformamos la promesa a JSON
  .then(res => res.json())
  .then(data => {
    // Tomamos la etiqueta "img" del DOM,
    // agregamos atrubuto "src" con la url 
    // de la respueta JSON
    const img = document.querySelector("img");
    img.src = data[0].url;
  });