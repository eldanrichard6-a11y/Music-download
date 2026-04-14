// 1. Kazi ya kutafuta muziki
async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Please enter a song name!");
        return;
    }

    resultsDiv.innerHTML = "<p style='color: #1DB954;'>Searching the world for music...</p>";

    // URL ya iTunes API
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        resultsDiv.innerHTML = ""; // Futa meseji ya "Searching"

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p>No results found. Try another song.</p>";
            return;
        }

        // 2. Kutengeneza kadi kwa kila wimbo uliopatikana
        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            
            // Tunatengeneza ID ya kipekee kwa kila kitufe cha malipo
            const paypalContainerId = `paypal-container-${song.trackId}`;
            
            card.innerHTML = `
                <div style="text-align: left; margin-bottom: 12px; border-bottom: 1px solid #333; padding-bottom: 8px;">
                    <span style="color: #1DB954; font-size: 1.1em; font-weight: bold;">${song.trackName}</span><br>
                    <span style="color: #bbb;">Artist: ${song.artistName}</span><br>
                    <span style="color: #fff; font-weight: bold;">Price: $5.00</span>
                </div>
                <div id="${paypalContainerId}"></div>
            `;
            resultsDiv.appendChild(card);

            // 3. Ita kazi ya kuweka kitufe cha malipo hapo hapo
            renderPaymentButton(paypalContainerId, song.trackName);
        });
    } catch (error) {
        console.error("System Error:", error);
        resultsDiv.innerHTML = "<p style='color: red;'>Connection error! Check your data.</p>";
    }
}

// 4. Kazi ya kuchora kitufe cha PayPal (Hii ndio sehemu ya malipo)
function renderPaymentButton(containerId, songTitle) {
    paypal.Buttons({
        style: {
            layout: 'vertical',
            color:  'gold',
            shape:  'rect',
            label:  'pay'
        },
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    description: `Digital Music Download: ${songTitle}`,
                    amount: {
                        currency_code: 'USD',
                        value: '5.00'
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Payment Successful! Thank you ' + details.payer.name.given_name);
                // Hapa unaweza kuongeza kodi ya kumpa mtu link ya kudownload
                console.log('Transaction completed for: ' + songTitle);
            });
        },
        onError: function (err) {
            console.error('Payment Error:', err);
        }
    }).render(`#${containerId}`);
}
