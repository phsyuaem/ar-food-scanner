document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn');
    const overlayText = document.getElementById('overlay-text');
    const readerDiv = document.getElementById('reader');
    const scannerBox = document.getElementById('scanner-box');
    const scanOverlay = document.getElementById('scan-overlay');
    const closeOverlay = document.getElementById('close-overlay');
    const resizeHandle = document.querySelector(".resize-handle");
    const productName = document.getElementById('product-name');
    const nutritionContainer = document.getElementById('nutrition-container');

    const recommendedLimits = {
        'saturated-fat': 2.0,
        'sugars': 10.0,
        'salt': 0.5,
        'fat': 15.0
    };

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        overlayText.style.display = 'block';
        readerDiv.style.display = 'block';
        scannerBox.style.display = 'block';
        initScanner();
    });

    closeOverlay.addEventListener('click', () => {
        scanOverlay.style.display = 'none';
    });

    function initScanner() {
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10 },
            async (decodedText) => {
                overlayText.textContent = `Scanned: ${decodedText}`;
                await fetchAndShowNutrition(decodedText);
            },
            (errorMessage) => {}
        ).catch(err => console.error(err));
    }

    async function fetchAndShowNutrition(barcode) {
        const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

        try {
            const res = await fetch(apiUrl);
            const data = await res.json();

            if (!data.product) throw new Error("Product not found");

            productName.innerText = data.product.product_name || "Unknown Product";
            nutritionContainer.innerHTML = '';

            for (const nutrient in recommendedLimits) {
                const key = `${nutrient}_100g`;
                const actual = parseFloat(data.product.nutriments[key]) || 0;
                const limit = recommendedLimits[nutrient];

                const barContainer = document.createElement("div");
                barContainer.className
::contentReference[oaicite:0]{index=0}
 
