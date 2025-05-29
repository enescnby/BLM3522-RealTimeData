const map = L.map('map').setView([39.0, 35.0], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

const socket = new WebSocket("ws://localhost:8080");

socket.onopen = function () {
    console.log("WebSocket bağlantısı kuruldu.");
};

socket.onmessage = function (event) {
    console.log("WebSocket'ten gelen:", event.data);
    try {
        const data = JSON.parse(event.data);

        if (data && data.lat && data.lng) {
            const marker = L.marker([data.lat, data.lng]).addTo(map);
            marker.bindPopup(`ID: ${data.id}<br>Zaman: ${new Date(data.timestamp).toLocaleString()}`).openPopup();
        } else {
            console.log("Konum içermeyen veri alındı:", data);
        }
    } catch (e) {
        console.error("JSON parse hatası:", e);
    }
};

socket.onerror = function (error) {
    console.error("WebSocket hatası:", error);
};
