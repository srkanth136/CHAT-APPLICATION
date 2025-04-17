const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message');
const messages = document.getElementById('messages');
const userTypeSelect = document.getElementById('userType');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const user = userTypeSelect.value;
    const message = input.value.trim();

    if (message !== '') {
        socket.emit('chat message', { user, message });
        input.value = '';
    }
});

socket.on('chat message', ({ user, message }) => {
    const li = document.createElement('li');
    li.textContent = `${user}: ${message}`;
    li.className = user.toLowerCase(); // 'sender' or 'receiver'
    messages.appendChild(li);
    messages.scrollTop = messages.scrollHeight;
});
