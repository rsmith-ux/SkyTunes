const API_KEY = 'YOUR_API_KEY'; 
let myCollection = JSON.parse(localStorage.getItem('myCollection')) || [];

// --- NAVIGATION ---
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId + '-page').style.display = 'block';
    if(pageId === 'collection') displayCollection();
    if(pageId === 'suggest') updateWeatherAndSuggest();
}

// --- WEATHER & SUGGESTION ---
async function updateWeatherAndSuggest() {
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        const data = await resp.json();
        
        const weather = data.weather[0].main; // e.g., "Rain", "Clear", "Clouds"
        document.getElementById('weather-display').innerText = `It's currently ${weather} in ${data.name}`;
        
        suggestAlbum(weather);
    });
}

function suggestAlbum(weather) {
    let vibeMatch = "Sunny";
    if (weather === "Rain" || weather === "Drizzle") vibeMatch = "Rainy";
    if (weather === "Clouds") vibeMatch = "Cloudy";
    if (weather === "Snow") vibeMatch = "Snowy";

    const filtered = myCollection.filter(a => a.vibe === vibeMatch);
    const display = document.getElementById('suggested-album');
    
    if (filtered.length > 0) {
        const random = filtered[Math.floor(Math.random() * filtered.length)];
        display.innerHTML = `<strong>${random.title}</strong> by ${random.artist} <br> <small>Perfect for a ${vibeMatch} day.</small>`;
    } else {
        display.innerText = `No ${vibeMatch} albums in your collection yet!`;
    }
}

// --- COLLECTION MANAGEMENT ---
function addAlbum() {
    const title = document.getElementById('albumTitle').value;
    const artist = document.getElementById('albumArtist').value;
    const vibe = document.getElementById('albumVibe').value;

    if(!title || !artist) return alert("Fill in the blanks!");

    myCollection.push({ title, artist, vibe });
    localStorage.setItem('myCollection', JSON.stringify(myCollection));
    
    // Clear inputs
    document.getElementById('albumTitle').value = '';
    document.getElementById('albumArtist').value = '';
    displayCollection();
}

function displayCollection() {
    const list = document.getElementById('collection-list');
    list.innerHTML = '';
    myCollection.forEach((album, index) => {
        const item = document.createElement('div');
        item.className = 'card';
        item.innerHTML = `
            <strong>${album.title}</strong> - ${album.artist} 
            <span class="vibe-tag">${album.vibe}</span>
            <button onclick="deleteAlbum(${index})" style="background:red; padding: 5px; float:right;">X</button>
        `;
        list.appendChild(item);
    });
}

function deleteAlbum(index) {
    myCollection.splice(index, 1);
    localStorage.setItem('myCollection', JSON.stringify(myCollection));
    displayCollection();
}

// Initialize
updateWeatherAndSuggest();
