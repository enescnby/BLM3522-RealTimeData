import WebSocket from "ws";

const ws = new WebSocket('ws://localhost:8080');

function generateRandomTurkeyLocation() {
    const minLat = 36.0;
    const maxLat = 42.1;
    const minLng = 26.0;
    const maxLng = 45.0;

    const lat = (Math.random() * (maxLat - minLat) + minLat).toFixed(6);
    const lng = (Math.random() * (maxLng - minLng) + minLng).toFixed(6);

    return {
        id: "user123",
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        timestamp: new Date().toISOString()
    };
}

ws.on('open', () => {
    console.log("WebSocket'e bağlandı.");
    setInterval(() => {
        const data = generateRandomTurkeyLocation();
        ws.send(JSON.stringify(data));
        console.log("Gönderildi:", data);
    }, 30000);
});
