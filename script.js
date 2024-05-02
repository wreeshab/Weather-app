let card = document.querySelector(".card");
const apiKey = "bc33c570810f528526207b2b4f81320f";

//let URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    let textbox = document.querySelector("#cityName")
    let city = textbox.value;

    if (city === "") {
        displayError("enter a city");

    }
    else {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
            
        }
    }
})

async function  getWeatherData(city){
    const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey;

    const response = await fetch(URL)
    
    if(!response.ok){
        throw new Error("couldnt fetch weather Data")
    }

    return await response.json();

}

function displayWeatherInfo(data) {
    const {
        name: city,
        main: { temp, humidity },
        weather: [{ description, id ,icon}]
    } = data;

    card.textContent = "";
    card.classList.add("card")
    card.style.display = "flex";

    const cityName = document.createElement("h1");
    cityName.textContent = city;
    cityName.classList.add("cityDisplay");
    card.appendChild(cityName);

    const temperature = document.createElement("p");
    temperature.textContent = "Temperature: " + temp + "°C";
    card.appendChild(temperature);

    const humidityElement = document.createElement("p");
    humidityElement.textContent = "Humidity: " + humidity + "%";
    card.appendChild(humidityElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = "Description: " + description;
    card.appendChild(descriptionElement);
    let code = icon
    displayIcon(code);

    console.log(cityName);
    console.log(data);
}

function displayIcon(code){
    let url = "https://openweathermap.org/img/wn/"+code+"@2x.png"
    let image = document.createElement("img")
    image.src = url
    card.appendChild(image)
}

function displayError(error){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = error
    errorDisplay.classList.add("error");
    card.innerText = ""
    card.classList.add("card")
    card.style.display = "flex"
    card.appendChild(errorDisplay);
    
}
