document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById('start-btn');
    const overlayText = document.getElementById('overlay-text');
    const readerDiv = document.getElementById('reader');
    const scannerBox = document.getElementById('scanner-box');
    const overlayBox = document.getElementById('overlay-box');
    const closeBtn = document.getElementById('close-btn');
    const resizeHandle = document.querySelector(".resize-handle");
    const productName = document.getElementById('product-name');
    const nutritionContainer = document.getElementById('nutrition-container');

    startBtn.addEventListener('click', () => {
        startBtn.style.display = 'none';
        overlayText.style.display = 'block';
        readerDiv.style.display = 'block';
        scannerBox.style.display = 'block';
        initScanner();
    });

    closeBtn.addEventListener('click', () => {
        overlayBox.style.display = 'none';
    });

    function initScanner() {
        const html5QrCode = new Html5Qrcode("reader");

        html5QrCode.start(
            { facingMode: "environment" },
            { fps: 10 },
            async (decodedText) => {
                overlayText.textContent = `Scanned: ${decodedText}`;
                overlayBox.style.display = "block";
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

            // Populate nutrition bars
            Object.keys(data.product.nutriments).forEach((nutrient) => {
                if (nutrient.includes("_100g")) {
                    const value = data.product.nutriments[nutrient];
                    const label = nutrient.replace("_100g", "").replace("-", " ");
                    nutritionContainer.innerHTML += `<div class="nutrition-label">${label}: ${value}g</div>`;
                }
            });

        } catch (err) {
            alert("Could not retrieve nutrition info.");
        }
    }
});
