// Messaging Board JavaScript for TalantaScout

// Sample data for scouts and conversations
const scoutsData = [
    {
        id: 1,
        name: 'Samuel Ochieng',
        organization: 'Gor Mahia FC',
        location: 'Nairobi',
        experience: '5 years',
        specialties: ['Midfielders', 'Youth Development'],
        lastContact: '2025-01-06',
        avatar: 'SO',
        messages: [
            {
                id: 1,
                sender: 'scout',
                content: 'Hello Brian, I was impressed with your performance in the last match. Your passing accuracy was excellent.',
                timestamp: '2025-01-06T10:30:00'
            },
            {
                id: 2,
                sender: 'player',
                content: 'Thank you, Coach Samuel. I\'ve been working hard on my distribution.',
                timestamp: '2025-01-06T14:45:00'
            },
            {
                id: 3,
                sender: 'scout',
                content: 'We have a youth development program starting next month. Would you be interested in joining our trials?',
                timestamp: '2025-01-07T09:15:00'
            }
        ],
        unread: 1
    },
    {
        id: 2,
        name: 'Mary Wanjiku',
        organization: 'AFC Leopards',
        location: 'Nakuru',
        experience: '8 years',
        specialties: ['Strikers', 'Technical Skills'],
        lastContact: '2025-01-04',
        avatar: 'MW',
        messages: [
            {
                id: 1,
                sender: 'scout',
                content: 'Hi Brian, I watched your recent training session. Your shooting technique is impressive.',
                timestamp: '2025-01-04T16:20:00'
            },
            {
                id: 2,
                sender: 'player',
                content: 'Thank you, Coach Mary. I\'ve been focusing on my finishing.',
                timestamp: '2025-01-04T17:30:00'
            }
        ],
        unread: 0
    },
    {
        id: 3,
        name: 'Peter Kimani',
        organization: 'Tusker FC',
        location: 'Mombasa',
        experience: '12 years',
        specialties: ['Defenders', 'Tactical Analysis'],
        lastContact: '2025-01-02',
        avatar: 'PK',
        messages: [
            {
                id: 1,
                sender: 'scout',
                content: 'Good afternoon, Brian. Your defensive work rate in the last game was outstanding.',
                timestamp: '2025-01-02T14:10:00'
            }
        ],
        unread: 0
    },
    {
        id: 4,
        name: 'Grace Akinyi',
        organization: 'KCB FC',
        location: 'Kisumu',
        experience: '6 years',
        specialties: ['Goalkeepers', 'Fitness Training'],
        lastContact: '2024-12-30',
        avatar: 'GA',
        messages: [
            {
                id: 1,
                sender: 'scout',
                content: 'Hello Brian, I noticed your improvement in physical fitness. Keep up the good work.',
                timestamp: '2024-12-30T11:45:00'
            },
            {
                id: 2,
                sender: 'player',
                content: 'Thank you, Coach Grace. I\'ve been following the training plan closely.',
                timestamp: '2024-12-30T15:20:00'
            }
        ],
        unread: 0
    }
];

// DOM Elements
let conversationsList, messagesContainer, messageInput, sendBtn;
let currentScoutId = null;
let scoutInfoModal, upgradeRequiredModal;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadConversations();
    
    // Check if user has messaging access (Basic package has limited access)
    checkMessagingAccess();
});

function initializeElements() {
    conversationsList = document.getElementById('conversationsList');
    messagesContainer = document.getElementById('messagesContainer');
    messageInput = document.getElementById('messageInput');
    sendBtn = document.getElementById('sendBtn');
    
    scoutInfoModal = document.getElementById('scoutInfoModal');
    upgradeRequiredModal = document.getElementById('upgradeRequiredModal');
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
    
    // Scout info button
    const infoBtn = document.getElementById('infoBtn');
    if (infoBtn) {
        infoBtn.addEventListener('click', showScoutInfo);
    }
    
    // Call button (shows upgrade modal for Basic package)
    const callBtn = document.getElementById('callBtn');
    if (callBtn) {
        callBtn.addEventListener('click', showUpgradeRequired);
    }
    
    // Close modals
    const closeScoutInfoModal = document.getElementById('closeScoutInfoModal');
    if (closeScoutInfoModal) {
        closeScoutInfoModal.addEventListener('click', () => {
            scoutInfoModal.classList.remove('active');
        });
    }
    
    const closeUpgradeModal = document.getElementById('closeUpgradeModal');
    if (closeUpgradeModal) {
        closeUpgradeModal.addEventListener('click', () => {
            upgradeRequiredModal.classList.remove('active');
        });
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
    const searchInput = document.getElementById('searchScouts');
    if (searchInput) {
        searchInput.addEventListener('input', filterConversations);
    }
}

function loadConversations() {
    if (!conversationsList) return;
    
    conversationsList.innerHTML = scoutsData.map(scout => `
        <div class="conversation-item" data-scout-id="${scout.id}">
            <div class="scout-avatar">
                ${scout.avatar}
            </div>
            <div class="conversation-info">
                <div class="conversation-name">${scout.name}</div>
                <div class="conversation-org">${scout.organization}</div>
                <div class="conversation-preview">${scout.messages[scout.messages.length - 1].content}</div>
            </div>
            <div class="conversation-meta">
                <div class="conversation-time">${formatDate(scout.lastContact)}</div>
                ${scout.unread > 0 ? `<div class="unread-badge">${scout.unread}</div>` : ''}
            </div>
        </div>
    `).join('');
    
    // Add click event listeners to conversation items
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.addEventListener('click', function() {
            const scoutId = parseInt(this.getAttribute('data-scout-id'));
            selectConversation(scoutId);
        });
    });
}

function selectConversation(scoutId) {
    // Update active state in sidebar
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const selectedItem = document.querySelector(`.conversation-item[data-scout-id="${scoutId}"]`);
    if (selectedItem) {
        selectedItem.classList.add('active');
    }
    
    // Set current scout
    currentScoutId = scoutId;
    const scout = scoutsData.find(s => s.id === scoutId);
    
    if (scout) {
        // Update chat header
        document.getElementById('currentScoutName').textContent = scout.name;
        document.getElementById('currentScoutOrg').textContent = scout.organization;
        
        // Load messages
        loadMessages(scout.messages);
        
        // Enable message input
        messageInput.disabled = false;
        sendBtn.disabled = false;
        
        // Mark messages as read
        markMessagesAsRead(scoutId);
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
        messageElement.className = `message ${message.sender === 'player' ? 'sent' : 'received'}`;
        
        messageElement.innerHTML = `
            <div class="message-header">
                <span class="message-sender">${message.sender === 'player' ? 'You' : 'Scout'}</span>
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
    if (!currentScoutId || !messageInput.value.trim()) return;
    
    const scout = scoutsData.find(s => s.id === currentScoutId);
    if (!scout) return;
    
    // Create new message
    const newMessage = {
        id: scout.messages.length + 1,
        sender: 'player',
        content: messageInput.value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // Add to messages array
    scout.messages.push(newMessage);
    
    // Update last contact date
    scout.lastContact = new Date().toISOString().split('T')[0];
    
    // Reload messages to show the new one
    loadMessages(scout.messages);
    
    // Clear input
    messageInput.value = '';
    
    // Update conversations list
    loadConversations();
    
    // Simulate scout response after a delay
    simulateScoutResponse(scout);
}

function simulateScoutResponse(scout) {
    // Only simulate response for demonstration purposes
    setTimeout(() => {
        const responses = [
            "That's great to hear! I'll keep an eye on your progress.",
            "Thanks for the update. Let's schedule a meeting to discuss further.",
            "I appreciate your dedication. We should talk more about opportunities.",
            "Excellent! I'll share more details about our program soon."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const responseMessage = {
            id: scout.messages.length + 1,
            sender: 'scout',
            content: randomResponse,
            timestamp: new Date().toISOString()
        };
        
        scout.messages.push(responseMessage);
        scout.unread = (scout.unread || 0) + 1;
        
        // Reload messages if this conversation is currently open
        if (currentScoutId === scout.id) {
            loadMessages(scout.messages);
            markMessagesAsRead(scout.id);
        }
        
        // Update conversations list
        loadConversations();
    }, 2000);
}

function showScoutInfo() {
    if (!currentScoutId) return;
    
    const scout = scoutsData.find(s => s.id === currentScoutId);
    if (!scout) return;
    
    const scoutInfoContent = document.getElementById('scoutInfoContent');
    if (scoutInfoContent) {
        scoutInfoContent.innerHTML = `
            <div class="scout-info-item">
                <span class="scout-info-label">Name:</span>
                <span class="scout-info-value">${scout.name}</span>
            </div>
            <div class="scout-info-item">
                <span class="scout-info-label">Organization:</span>
                <span class="scout-info-value">${scout.organization}</span>
            </div>
            <div class="scout-info-item">
                <span class="scout-info-label">Location:</span>
                <span class="scout-info-value">${scout.location}</span>
            </div>
            <div class="scout-info-item">
                <span class="scout-info-label">Experience:</span>
                <span class="scout-info-value">${scout.experience}</span>
            </div>
            <div class="scout-info-item">
                <span class="scout-info-label">Specialties:</span>
                <span class="scout-info-value">${scout.specialties.join(', ')}</span>
            </div>
            <div class="scout-info-item">
                <span class="scout-info-label">Last Contact:</span>
                <span class="scout-info-value">${formatDate(scout.lastContact)}</span>
            </div>
        `;
    }
    
    scoutInfoModal.classList.add('active');
}

function showUpgradeRequired() {
    upgradeRequiredModal.classList.add('active');
}

function checkMessagingAccess() {
    // For Basic package, show upgrade notice and limit functionality
    const messageInputContainer = document.getElementById('messageInputContainer');
    
    // In a real app, this would check the user's package level
    const userPackage = 'basic'; // This would come from user data
    
    if (userPackage === 'basic') {
        // Show upgrade notice
        const upgradeNotice = document.createElement('div');
        upgradeNotice.className = 'upgrade-notice';
        upgradeNotice.innerHTML = `
            <div class="upgrade-content">
                <i class="fas fa-lock"></i>
                <div>
                    <h3>Limited Messaging Access</h3>
                    <p>Upgrade to Bronze package or higher to unlock full messaging features.</p>
                </div>
                <button class="btn btn-primary" id="upgradeBtn">Upgrade Now</button>
            </div>
        `;
        
        document.body.insertBefore(upgradeNotice, document.querySelector('.messaging-container'));
        
        // Add event listener to upgrade button
        document.getElementById('upgradeBtn').addEventListener('click', showUpgradeRequired);
        
        // Limit functionality for Basic package
        messageInput.placeholder = "Upgrade to send messages...";
        messageInput.disabled = true;
        sendBtn.disabled = true;
    }
}

function markMessagesAsRead(scoutId) {
    const scout = scoutsData.find(s => s.id === scoutId);
    if (scout) {
        scout.unread = 0;
        
        // Update conversations list
        loadConversations();
    }
}

function filterConversations() {
    const searchTerm = document.getElementById('searchScouts').value.toLowerCase();
    
    document.querySelectorAll('.conversation-item').forEach(item => {
        const scoutName = item.querySelector('.conversation-name').textContent.toLowerCase();
        const scoutOrg = item.querySelector('.conversation-org').textContent.toLowerCase();
        
        if (scoutName.includes(searchTerm) || scoutOrg.includes(searchTerm)) {
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