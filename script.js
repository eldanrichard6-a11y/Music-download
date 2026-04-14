// 1. MPANGO WA TAFUTA MUZIKI (iTunes API)
async function searchMusic() {
    const query = document.getElementById('search-input').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Andika jina la wimbo au msanii!");
        return;
    }

    resultsDiv.innerHTML = "<p>Tunatafuta muziki...</p>";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
        const data = await response.json();
        
        resultsDiv.innerHTML = ""; // Futa meseji ya kutafuta

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p>Samahani, wimbo haujapatikana.</p>";
            return;
        }

        data.results.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.innerHTML = `
                <img src="${song.artworkUrl100}" alt="cover">
                <h3>${song.trackName}</h3>
                <p>${song.artistName}</p>
                <button class="download-btn" onclick="funguaMalipo('${song.trackName}', '${song.previewUrl}')">
                    Download (TZS 500)
                </button>
            `;
            resultsDiv.innerHTML += songCard.innerHTML;
        });
    } catch (error) {
        resultsDiv.innerHTML = "<p>Tatizo la mtandao. Jaribu tena.</p>";
    }
}

// 2. MPANGO WA MALIPO (Selcom Logic)
function funguaMalipo(jinaLaWimbo, linkYaWimbo) {
    const namba = prompt(`Ili kupakua '${jinaLaWimbo}', weka namba yako ya M-Pesa/TigoPesa:`);
    
    if (namba && namba.length >= 10) {
        alert(`Ombi la malipo limetumwa kwenda ${namba}. Weka PIN kwenye simu yako kukamilisha.`);
        
        // Hapa tunajifanya malipo yamepita (Simulation mpaka Selcom wakukubalie)
        setTimeout(() => {
            alert("Malipo yamehakikiwa! Wimbo wako unaanza kushuka.");
            window.location.href = linkYaWimbo; // Hii itapakua wimbo
        }, 3000); 
    } else {
        alert("Namba ya simu haijakamilika!");
    }
}
