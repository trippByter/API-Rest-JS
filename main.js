// ENDPOINT con QUERY PARAM.
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?api_key=live_XxJk9btOENRbvt13t6onIYMHUviZN2H6F9eu1DzZkzfZnHDMnP8Pdda4fUvXyleN";

const spanError = document.getElementById("error");

async function loadRandomCats(){
  // Llamada a la API con "fetch"
  const res = await fetch(API_URL_RANDOM);
  // Pasamos respuesta a JSON
  const data = await res.json();
  
  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
  }else{
    // Manipulación DOM
    const img00 = document.getElementById("img00");
    const img01 = document.getElementById("img01");
    const btn00 = document.getElementById("btn-img00");
    const btn01 = document.getElementById("btn-img01");
    
    img00.src = data[0].url;
    img01.src = data[1].url;

    // Asegurar las funciones con "arrows functions",
    // para evitar que se ejecuten sin ser invocadas.
    btn00.onclick = () => saveFavouritesCat(data[0].id);
    btn01.onclick = () => saveFavouritesCat(data[1].id);
  }

  console.log("_=_=_=_=_RANDOM_=_=_=_=_");
  console.log(data);
  console.log("_=_=_=_=_END_RANDOM_=_=_=_=_");  
};

// Favorites en HTML
async function loadFavouritesCats(){
  // Llamada a la API
  const res = await fetch(API_URL_FAVOURITES);
  // Pasamos respuesta a JSON
  const data = await res.json();

  console.log("_=_=_=_=FAVORITOS=_=_=_=_");
  console.log(data);
  console.log("_=_=_=_=END FAVORITOS=_=_=_=_");

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Obtenemos imagen del array de "favoritos"
    data.forEach(cat => {
      // Generamos etiquetas HTML
      const section = document.getElementById("favouritesMichis");
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar de favoritos");
      
      // Devolvemos etiquetas HTML
      img.src = cat.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  };
}

// la documentación indica que para guardar
// "favoritos", hay que usar método POST
// body: JSON("image_id") - Mandamos un str
// porque no sabemos en que lenguaje está escrito
// backend.
async function saveFavouritesCat(id){
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: id
    })
  });
  
  const data = await res.json();
  // console.log(res);
  console.log(data);

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
  }
};

loadRandomCats();
loadFavouritesCats();