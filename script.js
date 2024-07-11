let w_city=document.querySelector('.weather_city');
let w_date=document.querySelector('.weather_date');
let w_kaisa=document.querySelector('.weather_kaisa');
let w_icon=document.querySelector('.weather_icon');
let w_temp=document.querySelector('.weather_temp');
let w_minTemp=document.querySelector('.weather_min');
let w_maxTemp=document.querySelector('.weather_max');
let feelsLike=document.querySelector('.feelsLikeData');
let humidity=document.querySelector('.humidityData');
let winds=document.querySelector('.windData');
let pressure=document.querySelector('.pressureData');
let weatherSearch=document.querySelector('.search_city')
let cityName="madhubani";
const getDateTime=(dt)=>{
    let dates=new Date(dt*1000);
    const options={
            weekday:"long",
                year:"numeric",
                month:"long",
                day:"numeric",
                hour:"numeric",
                minute:"numeric",
    };
    const formatter= new Intl.DateTimeFormat('en-US',options);
    return formatter.format(dates);
}
const getCountry=(code)=>{
    return new Intl.DisplayNames([code], { type: 'region' }).of(code);
}



weatherSearch.addEventListener("submit",(e) => {
    e.preventDefault();
    let city=document.querySelector('.inputText');
    console.log(city.value);
    cityName=city.value;
    fetchAPI();
    city.value="";
});
const getKtoF=(kelvin)=>{
    return (1.8*(kelvin-273.15)+32).toFixed(2);
}
const getKtoFToFixed=(kelvin)=>{
    return (1.8*(kelvin-273.15)+32).toFixed();
}
const fetchAPI=async()=>{
    let weatherUrl=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=dc349a207fca5709d3d694fea49278b5`;
    try{
        let fetchData=await fetch(weatherUrl);
        let data=await fetchData.json();
        console.log(data)
        const {name,sys,weather,main,wind,dt}=data;
        w_city.innerHTML=`${name}, ${getCountry(sys.country)}`;
        w_date.innerHTML=getDateTime(dt);
        w_kaisa.innerHTML=weather[0].main;
        w_temp.innerHTML=`${getKtoF(main.temp)}&#x2109`;
        w_icon.innerHTML=`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png"/>`;
        w_minTemp.innerHTML=`${getKtoFToFixed(main.temp_min)}&#x2109`;
        w_maxTemp.innerHTML=`${getKtoFToFixed(main.temp_max)}&#x2109`;
        feelsLike.innerHTML=`${getKtoF(main.feels_like)}&#x2109`;
        humidity.innerHTML=`${main.humidity}%`;
        winds.innerHTML=`${wind.speed}m/s`;
        pressure.innerHTML=`${main.pressure}hPa`;

    }catch(error){
        console.log("API is not working :(")
    }
}


document.body.addEventListener('load',fetchAPI())