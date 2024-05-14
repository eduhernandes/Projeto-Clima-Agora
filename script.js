//https://api.openweathermap.org/data/2.5/weather?q=Paratibe&units=metric&appid=b35a625873a7eb5b071cf6a5810a901d&lang=pt_br
//Variáveis e seleções de elementos
const apiKey = "b35a625873a7eb5b071cf6a5810a901d";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";
const cityInput = document.querySelector("#city-input");
const searchBt = document.querySelector("#search");

const cityElement  = document.querySelector("#city");
const tempElement  = document.querySelector("#temperature span");
const descElement  = document.querySelector("#description");
const weatherIconElement  = document.querySelector("#weather-icon");
const countryElement  = document.querySelector("#country");
const humidityElement  = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherData = document.querySelector("#weather-data");

const errorMessageContainer = document.querySelector("#error-message");
const loader = document.querySelector("#loader");

const cityErrorElment = document.querySelector("#error-message span")

//Funções

// Função de Loading
const toggleLoader = () => {
    loader.classList.toggle("hide");
  };

//Função que faz requisição na API do Clima
const getWeatherData = async(city) =>{
    toggleLoader();

    const apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    
    const res = await fetch(apiWheatherURL);
    const data = await res.json();

    toggleLoader();

    return data;
};

//Função que recebe a cidade do input, chama a função de requisição dos dados e substitui na tela os elementos HTML
const showWeatherData = async(city) => {
    //Esconde as informações a cada nova pesquisa
    hideInformation();

    const data = await getWeatherData(city);

    //Verifica se a cidade existe e faz o tratamento de erro
    if(data.cod === "404"){
        showErrorMessage(city);
        return
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/64.png`);
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed} km/h`;

    // Altera a imagem de fundo
    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

    weatherData.classList.remove("hide");
};

//Função que esconde os container
const hideInformation = () => {
    errorMessageContainer.classList.add("hide");
    weatherData.classList.add("hide");
  
  };

// Tratamento de erro
const showErrorMessage = (city) => {
    cityErrorElment.innerText = city; 
    errorMessageContainer.classList.remove("hide");
  };

//Eventos
searchBt.addEventListener("click", (e) => {
    e.preventDefault(); //evita o envio do formulário
    const city = cityInput.value;
    showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
      const city = e.target.value;
      showWeatherData(city);
    }
  });
