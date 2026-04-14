// 1. Maelezo ya Muziki (Price list)
const beiYaWimbo = 500; // Shilingi 500 kwa kila wimbo

// 2. Kazi ya kutuma malipo kwenda Selcom
async function lipiaMuziki(nambaYaSimu, jinaLaWimbo) {
    if (!nambaYaSimu || nambaYaSimu.length < 10) {
        alert("Tafadhali weka namba ya simu sahihi (mfano: 0621...)");
        return;
    }

    console.log("Inatuma malipo ya " + jinaLaWimbo + " kwenda kwa: " + nambaYaSimu);
    
    // Onyesha mteja kuwa mchakato umeanza
    alert("Ombi la malipo la TZS " + beiYaWimbo + " limetumwa kwenye simu yako (" + nambaYaSimu + ").\n\nTafadhali weka namba ya siri (PIN) kukamilisha malipo.");

    /* KUMBUKA: Sehemu hii ya chini itafanya kazi rasmi ukishapata 
       API Key na Vendor ID kutoka Selcom. Kwa sasa inafanya majaribio (Simulation).
    */
    
    // Hapa ndipo kodi ya Selcom itakaa baadaye:
    const malipoYamefanikiwa = true; // Hii ni kwa ajili ya majaribio tu

    if (malipoYamefanikiwa) {
        shushaMuziki(jinaLaWimbo);
    }
}

// 3. Kazi ya kuruhusu wimbo ushuke (Download) baada ya kulipa
function shushaMuziki(jina) {
    alert("Asante! Malipo yamepokelewa. Wimbo wako wa '" + jina + "' unaanza kushuka sasa...");
    
    // Hapa unaweka link halisi ya wimbo wako
    // window.location.href = "nyimbo/wimbo-wako.mp3";
}

// 4. Kazi ya kusikiliza pindi mteja anapobonyeza kitufe cha "Download"
document.addEventListener('DOMContentLoaded', () => {
    const downloadButtons = document.querySelectorAll('.download-btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const wimbo = button.getAttribute('data-song');
            const namba = prompt("Ili kupata '" + wimbo + "', weka namba yako ya M-Pesa/TigoPesa:");
            
            if (namba) {
                lipiaMuziki(namba, wimbo);
            }
        });
    });
});
