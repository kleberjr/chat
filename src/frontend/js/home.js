const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener('click', (event) => {
  const message = messageInput.value; 
  
  if (message && message !== '') {
    socket.emit('chat message', {
      author: 'desconhecido',
      message: message,
    })
    
    console.log('mensagem enviada!');
    messageInput.value = '';
  }

  event.preventDefault();
})

messageInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendBtn.click();
  }
});

const socket = io({
  reconnectionDelay: 5000, // defaults to 1000
  reconnectionDelayMax: 5000 // defaults to 5000
});

socket.on("connect", () => {
  console.log("recovered?", socket.recovered);

  setTimeout(() => {
    if (socket.io.engine) {
      // close the low-level connection and trigger a reconnection
      socket.io.engine.close();
    }
  }, 5000);
});