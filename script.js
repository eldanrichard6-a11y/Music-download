// 1. Kazi ya kutafuta muziki duniani kote
async function searchMusic() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    
    if (!query) {
        alert("Please type a song name!");
        return;
    }

    resultsDiv.innerHTML = "<div style='color: #1DB954; text-align: center;'>Searching worldwide...</div>";

    // Tunatumia iTunes API kwa sababu ina kila aina ya muziki duniani
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=10`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Connection failed");
        
        const data = await response.json();
        resultsDiv.innerHTML = ""; 

        if (data.results.length === 0) {
            resultsDiv.innerHTML = "<p style='text-align:center;'>No music found. Try another search.</p>";
            return;
        }

        // Tunatengeneza muonekano wa kila wimbo
        data.results.forEach(song => {
            const card = document.createElement('div');
            card.className = 'music-card';
            
            card.innerHTML = `
                <div class="music-info">
                    <span class="price-tag">TZS 13,000 / $5.00</span>
                    <strong>${song.trackName}</strong>
                    <small>${song.artistName}</small>
                </div>
                <button class="buy-btn" onclick="startPayment('${song.trackName}')">Buy & Download</button>
            `;
            resultsDiv.appendChild(card);
        });

    } catch (error) {
        resultsDiv.innerHTML = `<p style="color:red; text-align:center;">Error: Please check your internet connection.</p>`;
    }
}

// 2. Kazi ya kuanzisha malipo (Flutterwave)
function startPayment(songName) {
    // Tunamuuliza mteja email ili Flutterwave itume risiti
    const customerEmail = prompt("Enter your email to receive the download link:");
    
    if (!customerEmail || !customerEmail.includes("@")) {
        alert("A valid email is required to process payment.");
        return;
    }

    FlutterwaveCheckout({
        public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY_HERE", // Futa hii na uweke Key yako ya Flutterwave
        tx_ref: "MUSIC-" + Date.now(),
        amount: 5, // Hii ni $5. Mfumo utaibadilisha kuwa TZS kwa mteja wa Tanzania
        currency: "USD", 
        payment_options: "card, mobilemoneytanzania, googlepay, applepay",
        customer: {
            email: customerEmail,
            name: "Music Buyer",
        },
        customizations: {
            title: "Global Music Downloader",
            description: "Payment for: " + songName,
            logo: "https://your-domain.com/icon.png",
        },
        callback: function (data) {
            if (data.status === "successful") {
                alert("Malipo Yamefanikiwa! Thank you for purchasing " + songName);
                console.log("Transaction ID: ", data.transaction_id);
                // Hapa unaweza kuongeza kodi ya kumpa link ya wimbo
            }
        },
        onclose: function() {
            console.log("Payment window closed");
        }
    });
}
