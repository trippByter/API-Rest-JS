// ENDPOINT con QUERY PARAM.
const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?api_key=";
const API_URL_DELETE_FAVOURITES = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=`;
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";

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
  const res = await fetch(API_URL_FAVOURITES, {
    method: "GET",
    headers: {
      "X-API-KEY": "live_XxJk9btOENRbvt13t6onIYMHUviZN2H6F9eu1DzZkzfZnHDMnP8Pdda4fUvXyleN" ,
    }
  });
  // Pasamos respuesta a JSON
  const data = await res.json();

  console.log("_=_=_=_=FAVORITOS=_=_=_=_");
  console.log(data);
  console.log("_=_=_=_=END FAVORITOS=_=_=_=_");

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status + data.message;
  } else {
    // Elemento HTML que contiene "REGALONES"
    const section = document.getElementById("favouritesMichis");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Regaloni");
    h2.appendChild(h2Text);
    section.appendChild(h2);
    // Obtenemos imagen del array de "favoritos"
    data.forEach(cat => {
      // Generamos etiquetas HTML
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("Sacar de favoritos");
      
      // Devolvemos etiquetas HTML
      img.src = cat.image.url;
      img.width = 150;
      btn.appendChild(btnText);
      btn.onclick = () => deleteFavouriteCat(cat.id);
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
      "Content-Type": "application/json",
      "X-API-KEY": "live_XxJk9btOENRbvt13t6onIYMHUviZN2H6F9eu1DzZkzfZnHDMnP8Pdda4fUvXyleN"
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
  }else{
    console.log("Gato guardado en favoritos.")
    loadFavouritesCats();
  }

};

// Borrar elementos de favoritos
async function deleteFavouriteCat(id){
  // No existe "headers" ni "body" porque el único parámetro que
  // enviamos es "id" y este va en el query parameter(URL)
  const res = await fetch(API_URL_DELETE_FAVOURITES(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY": "live_XxJk9btOENRbvt13t6onIYMHUviZN2H6F9eu1DzZkzfZnHDMnP8Pdda4fUvXyleN"
    }
  });
  
  const data = await res.json();
  // console.log(res);
  console.log(data);

  if(res.status !== 200){
    spanError.innerHTML = "Hubo un error: " + res.status;
  }else{
    console.log("Gato eliminado de favoritos.")
    loadFavouritesCats();
  }
};

// SUBIR FOTO
// Esta función usa formularios para mandar archivo
// La instancia del "FormData" automáticamente
// coloca el "content-type" y agrega el "boundary"
async function uploadCatPhoto(){
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  console.log(formData.get("file")); // Consoleamos el input

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      // "Content-Type": "multipart/form-data",
      "X-API-KEY": "live_XxJk9btOENRbvt13t6onIYMHUviZN2H6F9eu1DzZkzfZnHDMnP8Pdda4fUvXyleN"
    },
    body: formData,
  });

  const data = await res.json();

  if(res.status !== 201){
    spanError.innerHTML = "Hubo un error: " + res.status;
    console.log({data});
  }else{
    console.log("Foto subida con éxito");
    console.log({data});
    console.log(data.url);
    saveFavouritesCat(data.id);
  }
};

loadRandomCats();
loadFavouritesCats();