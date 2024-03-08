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

const socket = io();

socket.on('chat message', (msg) => {
  console.log('mensagem recebida!');
  const chatContainer = document.getElementById('chat-container');

  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  
  const senderSection = document.createElement('div');
  senderSection.className = 'sender-section';
  senderSection.innerText = msg.author + ' >';
  
  const contentSection = document.createElement('div');
  contentSection.className = 'content-section';
  contentSection.innerText = msg.message;

  messageContainer.appendChild(senderSection);
  messageContainer.appendChild(contentSection);

  chatContainer.appendChild(messageContainer);
});3  