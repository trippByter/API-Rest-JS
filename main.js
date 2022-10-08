// ENDPOINT con QUERY PARAM.
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?limit=2";

const spanError = document.getElementById("error");

async function loadRandomCats(){
  // Llamada a la API
  const res = await fetch(API_URL_RANDOM);
  // Pasamos respuesta a JSON
  const data = await res.json();
  
  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
  }else{
    // Manipulación DOM
    const img00 = document.getElementById("img00");
    const img01 = document.getElementById("img01");
    // Cambiamos el atributo "src"
    img00.src = data[0].url;
    img01.src = data[1].url;
  }

  console.log("_=_=_=_=_RANDOM_=_=_=_=_");
  console.log(data);
  console.log("_=_=_=_=_END_RANDOM_=_=_=_=_");  
};

// Favorites in HTML
async function loadFavoritesCats(){
  // Llamada a la API
  const res = await fetch(API_URL_FAVORITES);
  // Pasamos respuesta a JSON
  // const data = await res.json();

  // console.log("_=_=_=_=FAVORITOS=_=_=_=_");
  // console.log(data);
  // console.log("_=_=_=_=END FAVORITOS=_=_=_=_");

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
  };
}


loadRandomCats();
loadFavoritesCats();