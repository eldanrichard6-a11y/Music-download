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

function lipia(wimbo, fedha) {
    let jina = "DANIEL RICHARD";
    let namba = "0621645957";
    
    let msg = fedha === 'TZS' ? 
        `UNANUNUA FULL SONG: ${wimbo}\n\nLipa TZS 13,500 kwenda:\nNamba: ${namba}\nJina: ${jina}\n\nWeka Transaction ID hapa:` :
        `BUYING FULL TRACK: ${wimbo}\n\nSend $5.00 via WorldRemit to:\nName: ${jina}\nNumber: +255${namba.substring(1)}\n\nEnter Reference ID:`;
    
    let id = prompt(msg);

    if (id && id.length > 5) {
        alert("Malipo Yamethibitishwa na Daniel Richard!\n\nBofya OK kuanza kupakua wimbo mzima (Full HQ).");
        
        // Hapa ndipo unamuelekeza kwenye folder lako la nyimbo
        // Mfano: kama mteja alitafuta wimbo tukampa link ya ku-download
        window.location.href = "https://wa.me/255621645957?text=Daniel%2C%20nimelipia%20wimbo%20wa%20" + wimbo + ".%20ID%3A%20" + id;
    }
}
