console.log("Cargando - Console.log");

// ENDPOINT con QUERY PARAM.
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3api_key="


async function reload(){
  // Llamada a la API
  const res = await fetch(API_URL);
  // Pasamos respuesta a JSON
  const data = await res.json();
  
  console.log(data);
  // Manipulación DOM
  const img00 = document.getElementById("img00");
  const img01 = document.getElementById("img01");
  const img02 = document.getElementById("img02");
  // Cambiamos el atributo "src"
  img00.src = data[0].url;
  img01.src = data[1].url;
  img02.src = data[2].url;
};

reload();