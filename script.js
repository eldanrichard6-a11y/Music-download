async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Please type a song name!");
        return;
    }

    resultsDiv.innerHTML = "<div class='loading'>Searching worldwide...</div>";

    // URL ya iTunes API (Muziki wa dunia yote)
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("Internet connection problem");
        }

        const data = await response.json();
        resultsDiv.innerHTML = ""; 

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p>No music found. Try again.</p>";
            return;
        }

        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            
            const paypalId = `pay-${song.trackId}`;
            
            card.innerHTML = `
                <div class="music-info">
                    <span class="price-tag">$5.00</span>
                    <strong>${song.trackName}</strong>
                    <small>${song.artistName} | ${song.collectionName}</small>
                </div>
                <div id="${paypalId}"></div>
            `;
            
            resultsDiv.appendChild(card);

            // Washa kitufe cha PayPal kwa wimbo huu
            initPayPal(paypalId, song.trackName);
        });

    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p style="color:red">Error: ${error.message}. Please check your data connection.</p>`;
    }
}

function initPayPal(elementId, songName) {
    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'pay',
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: `Music Purchase: ${songName}`,
                    amount: {
                        currency_code: 'USD',
                        value: '5.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Success! Thank you ' + details.payer.name.given_name + '. You can now download ' + songName);
                // Hapa unaweza kuweka logic ya kuanza kudownload
            });
        }
    }).render(`#${elementId}`);
}
