let url = "http://spartacodingclub.shop/sparta_api/weather/seoul";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let nalssi = data["temp"];
    /*$("#Weather").text(nalssi);*/
    /*document.querySelector("#Weather").textContent = nalssi;*/
    console.log(document.querySelector("#Weather").src);
    if (nalssi < 15) {
      document.querySelector("#Weather").src = "../img/main/windy_weather.PNG";
    } else if (16 < nalssi < 18) {
      document.querySelector("#Weather").src = "../img/main/cloud_weather.PNG";
    } else {
      document.querySelector("#Weather").src =
        "../img/main/sunnyday_weather.PNG";
    }
  });
