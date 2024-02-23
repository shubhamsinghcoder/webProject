const submitBtn = document.getElementById("submitBtn");
const cityName = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp_real_val = document.getElementById("temp_real_val");
const temp_status = document.getElementById("temp_status");
const datahide = document.querySelector(".middle_layer");

const getInfo = async (event) => {
  event.preventDefault();

  let cityVal = cityName.value;
  if (cityVal === "") {
    city_name.innerText = "Please Enter The City Name";
    datahide.classList.add("data_hide");
  } else {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units&&appid=5edbfffbfb4ed5ef0276c6a86a57f160`;
      const response = await fetch(url);
      const data = await response.json();
      const arrdata = [data];

      temp_real_val.innerHTML = arrdata[0].main.temp;
      temp_status.innerHTML = arrdata[0].weather[0].main;
      city_name.innerText = arrdata[0].name + " ," + arrdata[0].sys.country;

      const tempMood = arrdata[0].weather[0].main;
      // condition to check sunny or cloudy
      if (tempMood == "Clear") {
        temp_status.innerHTML =
          "<i class='fas fa-sun' style='color:#eccc68;'></i>";
      } else if (tempMood == "Clouds") {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
      } else if (tempMood == "Rain") {
        temp_status.innerHTML =
          "<i class='fas fa-rain' style='color:#a4b0be;'></i>";
      } else {
        temp_status.innerHTML =
          "<i class='fas fa-cloud' style='color:#eccc68;'></i>";
      }
      datahide.classList.remove("data_hide");
    } catch {
      city_name.innerText = "Please Enter The City Name Properly";
      datahide.classList.add("data_hide");
    }
  }
};
submitBtn.addEventListener("click", getInfo);
