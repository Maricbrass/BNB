document.addEventListener('DOMContentLoaded', (event) => {
    const sendButton = document.getElementById('sendButton');
    sendButton.addEventListener('click', sendMessage);
});

async function fetchResponseFromServer(userMessage) {
    try {
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        return data.response; // Adapt based on actual API response structure
    } catch (error) {
        console.error('Error fetching data:', error);
        return "Sorry, I couldn't fetch that information.";
    }
}

function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    displayMessage(userMessage, 'user');
    userInput.value = '';

    fetchResponseFromServer(userMessage).then(botMessage => {
        displayMessage(botMessage, 'bot');
    }).catch(error => {
        console.error('Error processing request:', error);
        displayMessage("Sorry, there was an error processing your request.", 'bot');
    });
}

function displayMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the bottom
}