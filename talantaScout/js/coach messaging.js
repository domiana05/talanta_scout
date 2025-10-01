// Coach Messaging Board JavaScript for TalantaScout

// Sample data for contacts and conversations
const contactsData = [
    // Players
    {
        id: 1,
        name: 'Brian Omondi',
        type: 'player',
        position: 'Midfielder',
        age: 18,
        team: 'Youth Academy',
        location: 'Nairobi',
        status: 'online',
        lastContact: '2025-01-06',
        avatar: 'BO',
        messages: [
            {
                id: 1,
                sender: 'player',
                content: 'Coach, I need advice on improving my passing accuracy.',
                timestamp: '2025-01-06T10:30:00'
            },
            {
                id: 2,
                sender: 'coach',
                content: 'Focus on your body positioning and follow through. Let\'s work on it in training tomorrow.',
                timestamp: '2025-01-06T14:45:00'
            },
            {
                id: 3,
                sender: 'player',
                content: 'Thank you, Coach. I\'ll be there early for extra practice.',
                timestamp: '2025-01-07T09:15:00'
            }
        ],
        unread: 0
    },
    {
        id: 2,
        name: 'Sarah Mwende',
        type: 'player',
        position: 'Striker',
        age: 17,
        team: 'Youth Academy',
        location: 'Nakuru',
        status: 'offline',
        lastContact: '2025-01-04',
        avatar: 'SM',
        messages: [
            {
                id: 1,
                sender: 'coach',
                content: 'Great finishing in yesterday\'s match, Sarah! Your positioning was excellent.',
                timestamp: '2025-01-04T16:20:00'
            },
            {
                id: 2,
                sender: 'player',
                content: 'Thank you, Coach! I\'ve been working on my movement in the box.',
                timestamp: '2025-01-04T17:30:00'
            }
        ],
        unread: 1
    },
    // Scouts
    {
        id: 3,
        name: 'Samuel Ochieng',
        type: 'scout',
        organization: 'Gor Mahia FC',
        experience: '5 years',
        specialties: ['Midfielders', 'Youth Development'],
        location: 'Nairobi',
        status: 'online',
        lastContact: '2025-01-05',
        avatar: 'SO',
        messages: [
            {
                id: 1,
                sender: 'scout',
                content: 'Coach, I was impressed with Brian\'s performance. Does he have professional aspirations?',
                timestamp: '2025-01-05T10:30:00'
            },
            {
                id: 2,
                sender: 'coach',
                content: 'Yes, he\'s very dedicated. I believe he has potential for higher levels.',
                timestamp: '2025-01-05T14:45:00'
            }
        ],
        unread: 0
    },
    {
        id: 4,
        name: 'Mary Wanjiku',
        type: 'scout',
        organization: 'AFC Leopards',
        experience: '8 years',
        specialties: ['Strikers', 'Technical Skills'],
        location: 'Nakuru',
        status: 'away',
        lastContact: '2025-01-03',
        avatar: 'MW',
        messages: [
            {
                id: 1,
                sender: 'coach',
                content: 'Mary, Sarah has shown remarkable improvement this season. Her goal tally speaks for itself.',
                timestamp: '2025-01-03T16:20:00'
            },
            {
                id: 2,
                sender: 'scout',
                content: 'I\'ve noticed! Let\'s schedule a meeting to discuss her potential progression.',
                timestamp: '2025-01-03T17:30:00'
            }
        ],
        unread: 0
    }
];

// DOM Elements
let conversationsList, messagesContainer, messageInput, sendBtn;
let currentContactId = null;
let contactInfoModal, scheduleSessionModal;
let activeFilter = 'all';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadConversations();
});

function initializeElements() {
    conversationsList = document.getElementById('conversationsList');
    messagesContainer = document.getElementById('messagesContainer');
    messageInput = document.getElementById('messageInput');
    sendBtn = document.getElementById('sendBtn');
    
    contactInfoModal = document.getElementById('contactInfoModal');
    scheduleSessionModal = document.getElementById('scheduleSessionModal');
}

function setupEventListeners() {
    // Send message button
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }
    
    // Send message on Enter key
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Contact info button
    const infoBtn = document.getElementById('infoBtn');
    if (infoBtn) {
        infoBtn.addEventListener('click', showContactInfo);
    }
    
    // Schedule session button
    const scheduleBtn = document.getElementById('scheduleBtn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', showScheduleModal);
    }
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            activeFilter = this.getAttribute('data-filter');
            loadConversations();
        });
    });
    
    // Close modals
    const closeContactInfoModal = document.getElementById('closeContactInfoModal');
    if (closeContactInfoModal) {
        closeContactInfoModal.addEventListener('click', () => {
            contactInfoModal.classList.remove('active');
        });
    }
    
    const closeScheduleModal = document.getElementById('closeScheduleModal');
    if (closeScheduleModal) {
        closeScheduleModal.addEventListener('click', () => {
            scheduleSessionModal.classList.remove('active');
        });
    }
    
    const cancelSchedule = document.getElementById('cancelSchedule');
    if (cancelSchedule) {
        cancelSchedule.addEventListener('click', () => {
            scheduleSessionModal.classList.remove('active');
        });
    }
    
    // Confirm schedule
    const confirmSchedule = document.getElementById('confirmSchedule');
    if (confirmSchedule) {
        confirmSchedule.addEventListener('click', scheduleTrainingSession);
    }
    
    // Close modals when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchContacts');
    if (searchInput) {
        searchInput.addEventListener('input', filterConversations);
    }
    
    // Quick actions
    document.getElementById('newGroupBtn').addEventListener('click', createGroupChat);
    document.getElementById('broadcastBtn').addEventListener('click', sendBroadcast);
    document.getElementById('notesBtn').addEventListener('click', showCoachNotes);
}

function loadConversations() {
    if (!conversationsList) return;
    
    const filteredContacts = contactsData.filter(contact => {
        if (activeFilter === 'all') return true;
        return contact.type === activeFilter;
    });
    
    conversationsList.innerHTML = filteredContacts.map(contact => `
        <div class="conversation-item ${contact.type} ${currentContactId === contact.id ? 'active' : ''}" data-contact-id="${contact.id}">
            <div class="contact-avatar ${contact.type}">
                ${contact.avatar}
            </div>
            <div class="conversation-info">
                <div class="conversation-name">${contact.name}</div>
                <div class="conversation-type">${contact.type} • ${contact.type === 'player' ? contact.position : contact.organization}</div>
                <div class="conversation-preview">${contact.messages[contact.messages.length - 1].content}</div>
            </div>
            <div class="conversation-meta">
                <div class="conversation-time">${formatDate(contact.lastContact)}</div>
                ${contact.unread > 0 ? `<div class="unread-badge">${contact.unread}</div>` : ''}
            </div>
        </div>
    `).join('');
    
    // Add click event listeners to conversation items
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', function() {
            const contactId = parseInt(this.getAttribute('data-contact-id'));
            selectConversation(contactId);
        });
    });
}

function selectConversation(contactId) {
    // Update active state in sidebar
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const selectedItem = document.querySelector(`.conversation-item[data-contact-id="${contactId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
    
    // Set current contact
    currentContactId = contactId;
    const contact = contactsData.find(c => c.id === contactId);
    
    if (contact) {
        // Update chat header
        document.getElementById('currentContactName').textContent = contact.name;
        document.getElementById('currentContactType').textContent = `${contact.type.charAt(0).toUpperCase() + contact.type.slice(1)} • ${contact.type === 'player' ? contact.position : contact.organization}`;
        
        // Update avatar
        const contactAvatar = document.getElementById('contactAvatar');
        contactAvatar.className = `contact-avatar ${contact.type}`;
        contactAvatar.innerHTML = contact.avatar;
        
        // Update status
        const statusDot = document.querySelector('.status-dot');
        const statusText = document.querySelector('.status-text');
        statusDot.className = `status-dot ${contact.status}`;
        statusText.textContent = contact.status.charAt(0).toUpperCase() + contact.status.slice(1);
        
        // Load messages
        loadMessages(contact.messages);
        
        // Enable message input
        messageInput.disabled = false;
        sendBtn.disabled = false;
        
        // Mark messages as read
        markMessagesAsRead(contactId);
    }
}

function loadMessages(messages) {
    if (!messagesContainer) return;
    
    // Hide "no conversation" message
    const noConversation = document.getElementById('noConversation');
    if (noConversation) {
        noConversation.classList.add('hidden');
    }
    
    // Clear existing messages
    messagesContainer.innerHTML = '';
    
    // Add messages to container
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'coach' ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-sender">${message.sender === 'coach' ? 'You' : message.sender.charAt(0).toUpperCase() + message.sender.slice(1)}</span>
            </div>
            <div class="message-content">${message.content}</div>
            <div class="message-time">${formatTime(message.timestamp)}</div>
        `;
        
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendMessage() {
    if (!currentContactId || !messageInput.value.trim()) return;
    
    const contact = contactsData.find(c => c.id === currentContactId);
    if (!contact) return;
    
    // Create new message
    const newMessage = {
        id: contact.messages.length + 1,
        sender: 'coach',
        content: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Add to messages array
    contact.messages.push(newMessage);
    
    // Update last contact date
    contact.lastContact = new Date().toISOString().split('T')[0];
    
    // Reload messages to show the new one
    loadMessages(contact.messages);
    
    // Clear input
    messageInput.value = '';
    
    // Update conversations list
    loadConversations();
    
    // Simulate response after a delay
    simulateContactResponse(contact);
}

function simulateContactResponse(contact) {
    // Only simulate response for demonstration purposes
    setTimeout(() => {
        let response;
        
        if (contact.type === 'player') {
            const playerResponses = [
                "Thank you, Coach! I'll work on that.",
                "Understood. See you at training.",
                "I appreciate the feedback, Coach.",
                "Got it. I'll focus on that aspect."
            ];
            response = playerResponses[Math.floor(Math.random() * playerResponses.length)];
        } else {
            const scoutResponses = [
                "Thanks for the update. Let's schedule a meeting.",
                "I appreciate your insights. The player shows great potential.",
                "Let me know when would be a good time to discuss further.",
                "I'll keep monitoring their progress. Thanks for the update."
            ];
            response = scoutResponses[Math.floor(Math.random() * scoutResponses.length)];
        }
        
        const responseMessage = {
            id: contact.messages.length + 1,
            sender: contact.type,
            content: response,
            timestamp: new Date().toISOString()
        };
        
        contact.messages.push(responseMessage);
        contact.unread = (contact.unread || 0) + 1;
        
        // Reload messages if this conversation is currently open
        if (currentContactId === contact.id) {
            loadMessages(contact.messages);
            markMessagesAsRead(contact.id);
        }
        
        // Update conversations list
        loadConversations();
    }, 2000);
}

function showContactInfo() {
    if (!currentContactId) return;
    
    const contact = contactsData.find(c => c.id === currentContactId);
    if (!contact) return;
    
    const contactInfoContent = document.getElementById('contactInfoContent');
    if (contactInfoContent) {
        let infoHTML = '';
        
        if (contact.type === 'player') {
            infoHTML = `
                <div class="contact-info-item">
                    <span class="contact-info-label">Name:</span>
                    <span class="contact-info-value">${contact.name}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Type:</span>
                    <span class="contact-info-value">Player</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Position:</span>
                    <span class="contact-info-value">${contact.position}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Age:</span>
                    <span class="contact-info-value">${contact.age}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Team:</span>
                    <span class="contact-info-value">${contact.team}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Location:</span>
                    <span class="contact-info-value">${contact.location}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Status:</span>
                    <span class="contact-info-value">${contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</span>
                </div>
            `;
        } else {
            infoHTML = `
                <div class="contact-info-item">
                    <span class="contact-info-label">Name:</span>
                    <span class="contact-info-value">${contact.name}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Type:</span>
                    <span class="contact-info-value">Scout</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Organization:</span>
                    <span class="contact-info-value">${contact.organization}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Experience:</span>
                    <span class="contact-info-value">${contact.experience}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Specialties:</span>
                    <span class="contact-info-value">${contact.specialties.join(', ')}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Location:</span>
                    <span class="contact-info-value">${contact.location}</span>
                </div>
                <div class="contact-info-item">
                    <span class="contact-info-label">Status:</span>
                    <span class="contact-info-value">${contact.status.charAt(0).toUpperCase() + contact.status.slice(1)}</span>
                </div>
            `;
        }
        
        contactInfoContent.innerHTML = infoHTML;
    }
    
    contactInfoModal.classList.add('active');
}

function showScheduleModal() {
    if (!currentContactId) {
        alert('Please select a contact first.');
        return;
    }
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    
    document.getElementById('sessionDate').value = formattedDate;
    document.getElementById('sessionTitle').value = '';
    document.getElementById('sessionNotes').value = '';
    
    scheduleSessionModal.classList.add('active');
}

function scheduleTrainingSession() {
    const title = document.getElementById('sessionTitle').value;
    const date = document.getElementById('sessionDate').value;
    const time = document.getElementById('sessionTime').value;
    const duration = document.getElementById('sessionDuration').value;
    const type = document.getElementById('sessionType').value;
    const notes = document.getElementById('sessionNotes').value;
    
    if (!title || !date || !time) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const contact = contactsData.find(c => c.id === currentContactId);
    if (!contact) return;
    
    // Create session invitation message
    const sessionMessage = {
        id: contact.messages.length + 1,
        sender: 'coach',
        content: '',
        timestamp: new Date().toISOString(),
        type: 'session_invite',
        sessionData: {
            title,
            date,
            time,
            duration,
            type,
            notes
        }
    };
    
    // Add to messages array
    contact.messages.push(sessionMessage);
    
    // Update last contact date
    contact.lastContact = new Date().toISOString().split('T')[0];
    
    // Reload messages to show the new session invitation
    if (currentContactId === contact.id) {
        loadMessages(contact.messages);
    }
    
    // Update conversations list
    loadConversations();
    
    // Close modal
    scheduleSessionModal.classList.remove('active');
    
    alert('Training session scheduled successfully!');
}

function createGroupChat() {
    alert('Group chat feature coming soon!');
}

function sendBroadcast() {
    alert('Broadcast feature coming soon!');
}

function showCoachNotes() {
    alert('Coach notes feature coming soon!');
}

function markMessagesAsRead(contactId) {
    const contact = contactsData.find(c => c.id === contactId);
    if (contact) {
        contact.unread = 0;
        
        // Update conversations list
        loadConversations();
    }
}

function filterConversations() {
    const searchTerm = document.getElementById('searchContacts').value.toLowerCase();
    
    document.querySelectorAll('.conversation-item').forEach(item => {
        const contactName = item.querySelector('.conversation-name').textContent.toLowerCase();
        const contactType = item.querySelector('.conversation-type').textContent.toLowerCase();
        
        if (contactName.includes(searchTerm) || contactType.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' });
    }
}

function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-KE', { hour: '2-digit', minute: '2-digit' });
}

// Auto-refresh conversations every 30 seconds (simulate new messages)
setInterval(() => {
    // In a real app, this would fetch new messages from a server
    console.log('Checking for new messages...');
}, 30000);