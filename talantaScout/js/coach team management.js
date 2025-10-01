// Team Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    loadPlayers();
    loadVideos();
    hideLoadingOverlay();
});

// Global variables
let players = [];
let videos = [];
let currentEditingPlayer = null;
let currentEditingVideo = null;

function initializeElements() {
    morphOverlay = document.getElementById('morphOverlay');
    themeToggle = document.getElementById('themeToggle');
    profileBtn = document.getElementById('profileBtn');
    profileDropdown = document.getElementById('profileDropdown');
    logoutBtn = document.getElementById('logoutBtn');
    logoutDropdown = document.getElementById('logoutDropdown');
    
    // Team management elements
    addPlayerBtn = document.getElementById('addPlayerBtn');
    createTeamBtn = document.getElementById('createTeamBtn');
    playerModal = document.getElementById('playerModal');
    closePlayerModal = document.getElementById('closePlayerModal');
    cancelPlayerBtn = document.getElementById('cancelPlayerBtn');
    playerForm = document.getElementById('playerForm');
    playerModalTitle = document.getElementById('playerModalTitle');
    
    addVideoBtn = document.getElementById('addVideoBtn');
    videoModal = document.getElementById('videoModal');
    closeVideoModal = document.getElementById('closeVideoModal');
    cancelVideoBtn = document.getElementById('cancelVideoBtn');
    videoForm = document.getElementById('videoForm');
    videoModalTitle = document.getElementById('videoModalTitle');
    
    playersGrid = document.getElementById('playersGrid');
    videosGrid = document.getElementById('videosGrid');
    
    playerSearch = document.getElementById('playerSearch');
    positionFilter = document.getElementById('positionFilter');
    teamFilter = document.getElementById('teamFilter');
    clearFilters = document.getElementById('clearFilters');
    
    categoryFilter = document.getElementById('categoryFilter');
    dateFilter = document.getElementById('dateFilter');
}

function setupEventListeners() {
    // Theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Profile dropdown
    if (profileBtn) {
        profileBtn.addEventListener('click', toggleProfileDropdown);
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (profileDropdown && profileBtn && !profileBtn.contains(event.target)) {
            profileDropdown.classList.remove('active');
        }
    });
    
    // Logout functionality
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', logout);
    }
    
    // Player management
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', () => openPlayerModal());
    }
    
    if (closePlayerModal) {
        closePlayerModal.addEventListener('click', () => closePlayerModalFunc());
    }
    
    if (cancelPlayerBtn) {
        cancelPlayerBtn.addEventListener('click', () => closePlayerModalFunc());
    }
    
    if (playerForm) {
        playerForm.addEventListener('submit', handlePlayerSubmit);
    }
    
    // Video management
    if (addVideoBtn) {
        addVideoBtn.addEventListener('click', () => openVideoModal());
    }
    
    if (closeVideoModal) {
        closeVideoModal.addEventListener('click', () => closeVideoModalFunc());
    }
    
    if (cancelVideoBtn) {
        cancelVideoBtn.addEventListener('click', () => closeVideoModalFunc());
    }
    
    if (videoForm) {
        videoForm.addEventListener('submit', handleVideoSubmit);
    }
    
    // Filters
    if (playerSearch) {
        playerSearch.addEventListener('input', filterPlayers);
    }
    
    if (positionFilter) {
        positionFilter.addEventListener('change', filterPlayers);
    }
    
    if (teamFilter) {
        teamFilter.addEventListener('change', filterPlayers);
    }
    
    if (clearFilters) {
        clearFilters.addEventListener('click', clearAllFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterVideos);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterVideos);
    }
    
    // Create team button
    if (createTeamBtn) {
        createTeamBtn.addEventListener('click', createNewTeam);
    }
}

function hideLoadingOverlay() {
    setTimeout(() => {
        if (morphOverlay) {
            morphOverlay.style.opacity = '0';
            setTimeout(() => {
                morphOverlay.style.display = 'none';
            }, 500);
        }
    }, 1500);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

function toggleProfileDropdown() {
    if (profileDropdown) {
        profileDropdown.classList.toggle('active');
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userSession');
        window.location.href = '../../../index.html';
    }
}

// Player Management Functions
function openPlayerModal(player = null) {
    currentEditingPlayer = player;
    
    if (player) {
        playerModalTitle.textContent = 'Edit Player';
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerPosition').value = player.position;
        document.getElementById('playerJersey').value = player.jersey;
        document.getElementById('playerTeam').value = player.team;
        document.getElementById('playerAge').value = player.age;
        document.getElementById('playerNotes').value = player.notes;
    } else {
        playerModalTitle.textContent = 'Add New Player';
        playerForm.reset();
    }
    
    playerModal.classList.add('active');
}

function closePlayerModalFunc() {
    playerModal.classList.remove('active');
    currentEditingPlayer = null;
    playerForm.reset();
}

function handlePlayerSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(playerForm);
    const playerData = {
        name: formData.get('playerName'),
        position: formData.get('playerPosition'),
        jersey: formData.get('playerJersey'),
        team: formData.get('playerTeam'),
        age: formData.get('playerAge'),
        notes: formData.get('playerNotes'),
        id: currentEditingPlayer ? currentEditingPlayer.id : generateId(),
        avatar: currentEditingPlayer ? currentEditingPlayer.avatar : `https://via.placeholder.com/150?text=${formData.get('playerName').charAt(0)}`
    };
    
    if (currentEditingPlayer) {
        // Update existing player
        const index = players.findIndex(p => p.id === currentEditingPlayer.id);
        if (index !== -1) {
            players[index] = { ...players[index], ...playerData };
        }
    } else {
        // Add new player
        players.push(playerData);
    }
    
    savePlayers();
    renderPlayers();
    closePlayerModalFunc();
    
    showNotification(`Player ${currentEditingPlayer ? 'updated' : 'added'} successfully!`, 'success');
}

function editPlayer(playerId) {
    const player = players.find(p => p.id === playerId);
    if (player) {
        openPlayerModal(player);
    }
}

function deletePlayer(playerId) {
    if (confirm('Are you sure you want to delete this player?')) {
        players = players.filter(p => p.id !== playerId);
        savePlayers();
        renderPlayers();
        showNotification('Player deleted successfully!', 'success');
    }
}

function loadPlayers() {
    const savedPlayers = localStorage.getItem('teamPlayers');
    if (savedPlayers) {
        players = JSON.parse(savedPlayers);
    } else {
        // Load sample data
        players = [
            {
                id: '1',
                name: 'Brian Otieno',
                position: 'midfielder',
                jersey: '8',
                team: 'senior',
                age: '22',
                notes: 'Creative playmaker with excellent vision',
                avatar: 'https://via.placeholder.com/150?text=BO'
            },
            {
                id: '2',
                name: 'James Mwangi',
                position: 'forward',
                jersey: '9',
                team: 'senior',
                age: '24',
                notes: 'Clinical finisher with good positioning',
                avatar: 'https://via.placeholder.com/150?text=JM'
            },
            {
                id: '3',
                name: 'David Ochieng',
                position: 'defender',
                jersey: '5',
                team: 'senior',
                age: '25',
                notes: 'Strong and reliable center back',
                avatar: 'https://via.placeholder.com/150?text=DO'
            },
            {
                id: '4',
                name: 'Michael Njoroge',
                position: 'goalkeeper',
                jersey: '1',
                team: 'u19',
                age: '18',
                notes: 'Promising young goalkeeper with good reflexes',
                avatar: 'https://via.placeholder.com/150?text=MN'
            },
            {
                id: '5',
                name: 'Samuel Kariuki',
                position: 'midfielder',
                jersey: '10',
                team: 'u19',
                age: '17',
                notes: 'Technical midfielder with good passing range',
                avatar: 'https://via.placeholder.com/150?text=SK'
            },
            {
                id: '6',
                name: 'Peter Maina',
                position: 'forward',
                jersey: '11',
                team: 'u17',
                age: '16',
                notes: 'Pacey winger with good dribbling skills',
                avatar: 'https://via.placeholder.com/150?text=PM'
            }
        ];
        savePlayers();
    }
    
    renderPlayers();
}

function savePlayers() {
    localStorage.setItem('teamPlayers', JSON.stringify(players));
}

function renderPlayers() {
    if (!playersGrid) return;
    
    playersGrid.innerHTML = '';
    
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-header">
                <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-position">${formatPosition(player.position)}</div>
                </div>
            </div>
            <div class="player-details">
                <div class="player-detail">
                    <span class="detail-label">Jersey</span>
                    <span class="detail-value">${player.jersey || 'N/A'}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Age</span>
                    <span class="detail-value">${player.age || 'N/A'}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Team</span>
                    <span class="detail-value">${formatTeam(player.team)}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">Active</span>
                </div>
            </div>
            <div class="player-notes">
                <span class="detail-label">Notes</span>
                <p class="detail-value">${player.notes || 'No notes available'}</p>
            </div>
            <div class="player-actions">
                <button class="player-action-btn edit" onclick="editPlayer('${player.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="player-action-btn delete" onclick="deletePlayer('${player.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        playersGrid.appendChild(playerCard);
    });
}

// Video Management Functions
function openVideoModal(video = null) {
    currentEditingVideo = video;
    
    if (video) {
        videoModalTitle.textContent = 'Edit Video';
        document.getElementById('videoTitle').value = video.title;
        document.getElementById('videoCategory').value = video.category;
        document.getElementById('videoDuration').value = video.duration;
        document.getElementById('videoDescription').value = video.description;
    } else {
        videoModalTitle.textContent = 'Add Training Video';
        videoForm.reset();
    }
    
    videoModal.classList.add('active');
}

function closeVideoModalFunc() {
    videoModal.classList.remove('active');
    currentEditingVideo = null;
    videoForm.reset();
}

function handleVideoSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(videoForm);
    const videoData = {
        title: formData.get('videoTitle'),
        category: formData.get('videoCategory'),
        duration: formData.get('videoDuration'),
        description: formData.get('videoDescription'),
        id: currentEditingVideo ? currentEditingVideo.id : generateId(),
        thumbnail: currentEditingVideo ? currentEditingVideo.thumbnail : 'https://via.placeholder.com/280x160',
        date: currentEditingVideo ? currentEditingVideo.date : new Date().toISOString().split('T')[0]
    };
    
    if (currentEditingVideo) {
        // Update existing video
        const index = videos.findIndex(v => v.id === currentEditingVideo.id);
        if (index !== -1) {
            videos[index] = { ...videos[index], ...videoData };
        }
    } else {
        // Add new video
        videos.push(videoData);
    }
    
    saveVideos();
    renderVideos();
    closeVideoModalFunc();
    
    showNotification(`Video ${currentEditingVideo ? 'updated' : 'added'} successfully!`, 'success');
}

function editVideo(videoId) {
    const video = videos.find(v => v.id === videoId);
    if (video) {
        openVideoModal(video);
    }
}

function deleteVideo(videoId) {
    if (confirm('Are you sure you want to delete this video?')) {
        videos = videos.filter(v => v.id !== videoId);
        saveVideos();
        renderVideos();
        showNotification('Video deleted successfully!', 'success');
    }
}

function loadVideos() {
    const savedVideos = localStorage.getItem('teamVideos');
    if (savedVideos) {
        videos = JSON.parse(savedVideos);
    } else {
        // Load sample data
        videos = [
            {
                id: '1',
                title: 'Tactical Possession Drills',
                category: 'tactical',
                duration: '15:30',
                description: 'Advanced possession and pressing exercises for midfielders',
                thumbnail: 'https://via.placeholder.com/280x160',
                date: '2025-01-15'
            },
            {
                id: '2',
                title: 'Match Analysis vs AFC Leopards',
                category: 'match-analysis',
                duration: '22:15',
                description: 'Tactical breakdown and player performance analysis',
                thumbnail: 'https://via.placeholder.com/280x160',
                date: '2025-01-10'
            },
            {
                id: '3',
                title: 'Finishing Techniques',
                category: 'technical',
                duration: '18:45',
                description: 'Various finishing techniques for forwards in different situations',
                thumbnail: 'https://via.placeholder.com/280x160',
                date: '2025-01-05'
            },
            {
                id: '4',
                title: 'Defensive Organization',
                category: 'tactical',
                duration: '20:30',
                description: 'Team defensive shape and pressing triggers',
                thumbnail: 'https://via.placeholder.com/280x160',
                date: '2024-12-28'
            },
            {
                id: '5',
                title: 'Strength & Conditioning',
                category: 'physical',
                duration: '25:10',
                description: 'Football-specific strength and conditioning exercises',
                thumbnail: 'https://via.placeholder.com/280x160',
                date: '2024-12-20'
            }
        ];
        saveVideos();
    }
    
    renderVideos();
}

function saveVideos() {
    localStorage.setItem('teamVideos', JSON.stringify(videos));
}

function renderVideos() {
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <div class="video-meta">
                    <span class="video-category">${formatCategory(video.category)}</span>
                    <span class="video-date">${formatDate(video.date)}</span>
                </div>
                <p class="video-description">${video.description}</p>
                <div class="video-actions">
                    <button class="video-action-btn edit" onclick="editVideo('${video.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="video-action-btn delete" onclick="deleteVideo('${video.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        
        videosGrid.appendChild(videoCard);
    });
}

// Filter Functions
function filterPlayers() {
    const searchTerm = playerSearch.value.toLowerCase();
    const positionValue = positionFilter.value;
    const teamValue = teamFilter.value;
    
    const filteredPlayers = players.filter(player => {
        const matchesSearch = player.name.toLowerCase().includes(searchTerm);
        const matchesPosition = positionValue === 'all' || player.position === positionValue;
        const matchesTeam = teamValue === 'all' || player.team === teamValue;
        
        return matchesSearch && matchesPosition && matchesTeam;
    });
    
    renderFilteredPlayers(filteredPlayers);
}

function renderFilteredPlayers(filteredPlayers) {
    if (!playersGrid) return;
    
    playersGrid.innerHTML = '';
    
    if (filteredPlayers.length === 0) {
        playersGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No players found matching your criteria</p>
            </div>
        `;
        return;
    }
    
    filteredPlayers.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        playerCard.innerHTML = `
            <div class="player-header">
                <img src="${player.avatar}" alt="${player.name}" class="player-avatar">
                <div class="player-info">
                    <div class="player-name">${player.name}</div>
                    <div class="player-position">${formatPosition(player.position)}</div>
                </div>
            </div>
            <div class="player-details">
                <div class="player-detail">
                    <span class="detail-label">Jersey</span>
                    <span class="detail-value">${player.jersey || 'N/A'}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Age</span>
                    <span class="detail-value">${player.age || 'N/A'}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Team</span>
                    <span class="detail-value">${formatTeam(player.team)}</span>
                </div>
                <div class="player-detail">
                    <span class="detail-label">Status</span>
                    <span class="detail-value">Active</span>
                </div>
            </div>
            <div class="player-notes">
                <span class="detail-label">Notes</span>
                <p class="detail-value">${player.notes || 'No notes available'}</p>
            </div>
            <div class="player-actions">
                <button class="player-action-btn edit" onclick="editPlayer('${player.id}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="player-action-btn delete" onclick="deletePlayer('${player.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        
        playersGrid.appendChild(playerCard);
    });
}

function filterVideos() {
    const categoryValue = categoryFilter.value;
    const dateValue = dateFilter.value;
    
    const filteredVideos = videos.filter(video => {
        const matchesCategory = categoryValue === 'all' || video.category === categoryValue;
        
        let matchesDate = true;
        if (dateValue !== 'all') {
            const videoDate = new Date(video.date);
            const now = new Date();
            
            if (dateValue === 'week') {
                const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                matchesDate = videoDate >= oneWeekAgo;
            } else if (dateValue === 'month') {
                const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
                matchesDate = videoDate >= oneMonthAgo;
            } else if (dateValue === 'year') {
                const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                matchesDate = videoDate >= oneYearAgo;
            }
        }
        
        return matchesCategory && matchesDate;
    });
    
    renderFilteredVideos(filteredVideos);
}

function renderFilteredVideos(filteredVideos) {
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    if (filteredVideos.length === 0) {
        videosGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>No videos found matching your criteria</p>
            </div>
        `;
        return;
    }
    
    filteredVideos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-button">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <h4 class="video-title">${video.title}</h4>
                <div class="video-meta">
                    <span class="video-category">${formatCategory(video.category)}</span>
                    <span class="video-date">${formatDate(video.date)}</span>
                </div>
                <p class="video-description">${video.description}</p>
                <div class="video-actions">
                    <button class="video-action-btn edit" onclick="editVideo('${video.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="video-action-btn delete" onclick="deleteVideo('${video.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        
        videosGrid.appendChild(videoCard);
    });
}

function clearAllFilters() {
    playerSearch.value = '';
    positionFilter.value = 'all';
    teamFilter.value = 'all';
    filterPlayers();
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatPosition(position) {
    const positions = {
        'goalkeeper': 'Goalkeeper',
        'defender': 'Defender',
        'midfielder': 'Midfielder',
        'forward': 'Forward'
    };
    
    return positions[position] || position;
}

function formatTeam(team) {
    const teams = {
        'senior': 'Senior Team',
        'u19': 'U-19 Team',
        'u17': 'U-17 Team'
    };
    
    return teams[team] || team;
}

function formatCategory(category) {
    const categories = {
        'tactical': 'Tactical',
        'technical': 'Technical',
        'physical': 'Physical',
        'match-analysis': 'Match Analysis'
    };
    
    return categories[category] || category;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function createNewTeam() {
    alert('Create new team functionality would be implemented here.');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles for notification
    if (!document.querySelector('.notification-styles')) {
        const style = document.createElement('style');
        style.className = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--background-light);
                border-left: 4px solid var(--primary-color);
                border-radius: var(--border-radius);
                padding: var(--spacing-md);
                box-shadow: var(--shadow-large);
                z-index: 3000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            .notification-success {
                border-left-color: var(--success-color);
            }
            .notification-error {
                border-left-color: var(--error-color);
            }
            .notification-warning {
                border-left-color: var(--warning-color);
            }
            .notification.active {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification-success .notification-content i {
                color: var(--success-color);
            }
            .notification-error .notification-content i {
                color: var(--error-color);
            }
            .notification-warning .notification-content i {
                color: var(--warning-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('active');
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
});