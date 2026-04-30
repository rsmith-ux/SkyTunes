const songs = {
    happy: [
        { title: "Walking On Sunshine", artist: "Katrina & The Waves" },
        { title: "Happy", artist: "Pharrell Williams" }
    ],
    chill: [
        { title: "Weightless", artist: "Marconi Union" },
        { title: "Sunflower", artist: "Post Malone" }
    ],
    sad: [
        { title: "Someone Like You", artist: "Adele" },
        { title: "Fix You", artist: "Coldplay" }
    ],
    focus: [
        { title: "Lofi Beats", artist: "ChilledCow" },
        { title: "Midnight City", artist: "M83" }
    ]
};

const matchBtn = document.getElementById('matchBtn');
const moodSelect = document.getElementById('moodSelect');
const resultsArea = document.getElementById('results');

matchBtn.addEventListener('click', () => {
    const selectedMood = moodSelect.value;
    
    if (!selectedMood) {
        alert("Please select a mood first!");
        return;
    }

    // Clear previous results
    resultsArea.innerHTML = "<h3>Recommended for you:</h3>";

    // Get songs for that mood
    const playlist = songs[selectedMood];

    playlist.forEach(song => {
        const card = document.createElement('div');
        card.className = 'song-card';
        card.innerHTML = `
            <div class="song-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        resultsArea.appendChild(card);
    });
});
