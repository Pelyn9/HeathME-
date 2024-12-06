const usersKey = 'chatAppUsers';
const contactsKey = 'chatAppContacts';
const conversationsKey = 'chatAppConversations';
let currentContact = null; // Track the active contact

// Mock current user
let currentUser = 'You';

// Get stored data or initialize
function getStoredData(key, defaultValue) {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
}

// Save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Load users, contacts, and conversations
let users = getStoredData(usersKey, ['Alice', 'Bob']);
let contacts = getStoredData(contactsKey, {});
let conversations = getStoredData(conversationsKey, {});

// Initialize current user's contacts if not present
if (!contacts[currentUser]) {
    contacts[currentUser] = [];
    saveData(contactsKey, contacts);
}

// DOM Elements
const sendButton = document.getElementById('send-button');
const messageBox = document.getElementById('message-box');
const userInput = document.getElementById('user-input');
const addContactBtn = document.getElementById('add-contact');
const contactsContainer = document.querySelector('.contacts');
const searchInput = document.getElementById('search-input'); // Search bar

// Render contacts list
function renderContacts(searchTerm = '') {
    contactsContainer.innerHTML = '';
    const filteredContacts = contacts[currentUser].filter(contact =>
        contact.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filteredContacts.forEach(contact => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact');
        contactDiv.setAttribute('onclick', `openChat('${contact}')`);
        contactDiv.innerHTML = `<img src="https://via.placeholder.com/50" alt="${contact}" class="contact-avatar"><p>${contact}</p>`;
        contactsContainer.appendChild(contactDiv);
    });
}

// Open a chat with the selected contact
function openChat(contactName) {
    currentContact = contactName;
    messageBox.innerHTML = ''; // Clear chat box

    // Load conversation for the selected contact
    const conversation = conversations[contactName] || [];
    conversation.forEach(message => appendMessage(message.sender, message.text));
}

// Append message to the chat box
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender.toLowerCase());
    messageElement.textContent = `${sender}: ${message}`;
    messageBox.appendChild(messageElement);
    messageBox.scrollTop = messageBox.scrollHeight;
}

// Add a new contact
addContactBtn.addEventListener('click', () => {
    const userName = prompt('Enter the name of the person to add:');
    if (userName && users.includes(userName) && !contacts[currentUser].includes(userName)) {
        contacts[currentUser].push(userName);
        saveData(contactsKey, contacts);
        renderContacts();
    } else {
        alert('User not found or already in your contact list!');
    }
});

// Send message
sendButton.addEventListener('click', () => {
    const userMessage = userInput.value.trim();
    if (userMessage && currentContact) {
        appendMessage('You', userMessage);

        // Save message to the conversation
        if (!conversations[currentContact]) {
            conversations[currentContact] = [];
        }
        conversations[currentContact].push({ sender: 'You', text: userMessage });
        saveData(conversationsKey, conversations);

        userInput.value = '';
    } else {
        alert('Please select a contact to chat with!');
    }
});

// Search contacts
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    renderContacts(searchTerm);
});

// Initial render
renderContacts();
