const sendMessage = (message) => {
  socket.emit('chatMessage', message);
  console.log('mensagem enviada!');
  messageInput.value = '';

  const messageContainer = createSelfMessageContainer();
  messageContainer.innerText = message;

  const chatContainer = document.getElementById('chat-container');
  chatContainer.appendChild(messageContainer);
};

const createSelfMessageContainer = () => {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'self-message-container';

  return messageContainer;
};

const createMessageContainer = (userPayload, message) => {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  
  const senderSection = document.createElement('div');
  senderSection.className = 'sender-section';
  senderSection.innerText = userPayload.name + ' >';
  
  const contentSection = document.createElement('div');
  contentSection.className = 'content-section';
  contentSection.innerText = message;

  messageContainer.appendChild(senderSection);
  messageContainer.appendChild(contentSection);

  return messageContainer;
};

const handleKeypress = (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendBtn.click();
  }
};

const handleClick = (event) => {
  const message = messageInput.value; 
  
  if (message && message !== '') {
    sendMessage(message);
  }

  event.preventDefault();
};

const handleChatMessage = (userPayload, message) => {
  const chatContainer = document.getElementById('chat-container');
  
  chatContainer.appendChild(
    createMessageContainer(userPayload, message)
  );
};

const socket = io();
socket.on('chatMessage', handleChatMessage);

const messageInput = document.getElementById("message");
messageInput.addEventListener("keypress", handleKeypress);

const sendBtn = document.getElementById("send-btn");
sendBtn.addEventListener('click', handleClick);