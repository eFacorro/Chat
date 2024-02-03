const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7071 });
const clients = new Map();

wss.on('connection', (ws) => {
  const id = uuidv4();
  let name = "";
  let metadata = { id , name};
  console.log("connection")
  
  clients.set(ws, metadata);

  ws.on('message', (messageAsString) => {
    // const message = JSON.parse(messageAsString);
    const message = messageAsString.toString()
    const metadata = clients.get(ws);
    if(metadata.name === ""){
      metadata.name = message;
      clients.delete(ws);
      clients.set(ws, metadata);
      console.log(metadata);
      return
    }
    console.log(metadata)

    const outbound = message; // messageAsString;

    [...clients.keys()].forEach((client) => {
      if(client != ws){
        client.send(`${metadata.name} > ${outbound}`);
        console.log(`${metadata.name} > ${outbound}`);
      }
    });
  });
  ws.on("close", () => {
    clients.delete(ws);
  });
});
console.log("wss up");


function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}