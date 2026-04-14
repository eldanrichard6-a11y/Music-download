async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Please enter a song name!");
        return;
    }

    resultsDiv.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
        const data = await response.json();
        
        resultsDiv.innerHTML = ""; // Futa maandishi ya "Searching"

        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            card.innerHTML = `
                <div>
                    <strong>${song.trackName}</strong><br>
                    <small>${song.artistName}</small>
                </div>
                <a href="${song.previewUrl}" class="download-btn" target="_blank">Listen/Get</a>
            `;
            resultsDiv.appendChild(card);
        });
    } catch (error) {
        resultsDiv.innerHTML = "<p>Error fetching music. Try again.</p>";
    }
}
