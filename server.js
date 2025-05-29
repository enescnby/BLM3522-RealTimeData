import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { EventHubProducerClient } from "@azure/event-hubs";

dotenv.config();

const wss = new WebSocketServer({port: 8080});

const producer = new EventHubProducerClient(
    process.env.EVENT_HUB_CONNECTION_STRING,
    process.env.EVENT_HUB_NAME
);

wss.on('connection', function connection(ws){
    ws.on('message', async function incoming(message){
        console.log('Received:', message);

        const batch = await producer.createBatch();
        batch.tryAdd({body: JSON.parse(message)});
        await producer.sendBatch(batch);

        wss.clients.forEach(client => {
            if(client.readyState === 1){
                client.send(JSON.stringify(JSON.parse(message)));
            }
        })
    });

    ws.send(JSON.stringify({info : 'Bağlantı Başarılı'}));
});