async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) return;
    resultsDiv.innerHTML = "<p>Searching...</p>";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=10`);
        const data = await response.json();
        resultsDiv.innerHTML = ""; 

        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            
            // Tengeneza ID ya kipekee kwa kila kitufe cha malipo
            const paypalId = `paypal-button-${song.trackId}`;
            
            card.innerHTML = `
                <div style="flex: 1; text-align: left;">
                    <strong>${song.trackName}</strong><br>
                    <small>${song.artistName} - $5.00</small>
                </div>
                <div id="${paypalId}"></div>
            `;
            resultsDiv.appendChild(card);

            // Washa kitufe cha PayPal kwa wimbo huu
            renderPayPalButton(paypalId, song.trackName);
        });
    } catch (error) {
        resultsDiv.innerHTML = "<p>Error loading music.</p>";
    }
}

function renderPayPalButton(containerId, songName) {
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: `Music Purchase: ${songName}`,
                    amount: {
                        value: '5.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed by ' + details.payer.name.given_name + '! You can now download ' + songName);
                // Hapa unaweza kuweka link ya kudownload wimbo baada ya malipo
            });
        }
    }).render(`#${containerId}`);
}
