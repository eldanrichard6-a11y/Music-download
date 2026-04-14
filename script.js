async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Please enter a song name!");
        return;
    }

    resultsDiv.innerHTML = "<div style='color: #1DB954; text-align: center;'>Searching global database...</div>";

    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        resultsDiv.innerHTML = ""; 

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p style='text-align:center;'>No music found. Try again.</p>";
            return;
        }

        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            
            card.innerHTML = `
                <div class="music-info">
                    <span class="price-tag">$5 / TZS 13k</span>
                    <strong>${song.trackName}</strong>
                    <small>${song.artistName}</small>
                </div>
                
                <button class="buy-btn" onclick="startPayment('${song.trackName}')">
                    Secure Purchase
                </button>

                <div class="payment-methods">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/M-Pesa_logo.png" alt="M-Pesa">
                </div>
            `;
            resultsDiv.appendChild(card);
        });

    } catch (error) {
        resultsDiv.innerHTML = `<p style="color:red; text-align:center;">Network error. Check your connection.</p>`;
    }
}

function startPayment(songName) {
    const customerEmail = prompt("Enter your email for the download receipt:");
    
    if (!customerEmail || !customerEmail.includes("@")) {
        alert("A valid email is required.");
        return;
    }

    FlutterwaveCheckout({
        public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY_HERE", 
        tx_ref: "GLOBAL-MUSIC-" + Date.now(),
        amount: 5,
        currency: "USD",
        payment_options: "card, mobilemoneytanzania, googlepay",
        customer: {
            email: customerEmail,
            name: "Global Music User",
        },
        customizations: {
            title: "World Music Pro",
            description: "Purchase: " + songName,
        },
        callback: function (data) {
            if (data.status === "successful") {
                alert("Payment Successful! Your download for " + songName + " is starting.");
                // Hapa unaweza kuweka window.location.href kumpa wimbo
            }
        },
        onclose: function() {
            console.log("Payment canceled");
        }
    });
}
