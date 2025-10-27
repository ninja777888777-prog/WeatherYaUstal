
async function getCoords() {
    const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    return {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
}

getCoords().then(coords => {
    const accessKey = '8aabb165-9974-41cf-9922-76f11589dde5';

    const headers = {
    'X-Yandex-Weather-Key': accessKey
};

     fetch(`https://api.weather.yandex.ru/v2/forecast?lat=${coords.lat}&lon=${coords.lng}`, { headers })
    .then(response => response.json())
    .then(json => {
        
        const temp = document.querySelector('.weather__temperature')
      temp.textContent = json.fact.temp + '°C'
      
    });
 
     fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.lat}&longitude=${coords.lng}&localityLanguage=ru`, {headers})
     .then(response => response.json())
     .then(city =>{
        const subtitle = document.querySelector('.subtitle')
        subtitle.textContent = city.city
    })
    
}, 
);
