const sendButton = document.getElementById('send-button');
const messageBox = document.getElementById('message-box');
const userInput = document.getElementById('user-input');
const addContactBtn = document.getElementById('add-contact');
const contactsContainer = document.querySelector('.contacts');

let currentUser = null;
let conversations = {}; // Object to hold conversations for each user

sendButton.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage) {
        appendMessage('You', userMessage); // Append user message
        getBotResponse(userMessage); // Get bot response
        userInput.value = ''; // Clear input field
    }
});

// Append message to the chat box
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(sender.toLowerCase());
    messageElement.textContent = `${sender}: ${message}`;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

// Get the bot's response to the user message
function getBotResponse(message) {
    if (!currentUser) return;

    // Example bot response (could be more complex)
    const botMessage = `You said: ${message}. How can I assist you?`;
    setTimeout(() => appendMessage(currentUser, botMessage), 1000);
}

// Open a chat with the selected user and initialize a new conversation
function openChat(userName) {
    currentUser = userName;
    messageBox.innerHTML = ''; // Clear previous messages

    // Check if there's an existing conversation, else start a new one
    if (!conversations[currentUser]) {
        conversations[currentUser] = []; // Create a new conversation for the user
    }
    
    // Display the existing conversation (if any)
    conversations[currentUser].forEach(message => {
        appendMessage(message.sender, message.text);
    });

    // Display a greeting message
    appendMessage('Bot', `Hello, ${userName}! How can I assist you today?`);
}

// Add a new contact to the list
addContactBtn.addEventListener('click', () => {
    const userName = prompt("Enter the new contact's name:");
    if (userName) {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.setAttribute('onclick', `openChat('${userName}')`);
        contactDiv.innerHTML = `<img src="https://via.placeholder.com/50" alt="${userName}" class="contact-avatar"><p>${userName}</p>`;
        contactsContainer.appendChild(contactDiv);
    }
});
