const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();

wss.on('connection', (ws) => {
  const id = uuidv4();
  let name = "";
  let metadata = { id , name};
  console.log("connection")
  
  clients.set(ws, metadata);
  
  ws.send("metadata");
  ws.on('message', (messageAsString) => {
    // const message = JSON.parse(messageAsString);
    const message = messageAsString.toString()
    const metadata = clients.get(ws);
    console.log(metadata)

    const outbound = message; // messageAsString;

    [...clients.keys()].forEach((client) => {
      if(clients.get(client) != metadata){
        client.send(outbound);
        console.log(client);
      }
    });
  });
  ws.on("close", () => {
    clients.delete(ws);
  });
});

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

console.log("wss up");