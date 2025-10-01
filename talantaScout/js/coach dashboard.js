// TalantaScout Coach Dashboard - Enhanced JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    initDashboard();
    
    // Set current date as default for evaluation
    document.getElementById('evaluationDate').valueAsDate = new Date();
    
    // Initialize skill sliders
    initSkillSliders();
    
    // Load sample data
    loadSampleData();
    
    // Set up event listeners
    setupEventListeners();
});

// Initialize dashboard
function initDashboard() {
    // Hide loading overlay
    setTimeout(() => {
        document.getElementById('morphOverlay').style.display = 'none';
    }, 1500);
    
    // Initialize theme
    const savedTheme = localStorage.getItem('talantascout-theme') || 'light';
    setTheme(savedTheme);
}

// Initialize skill sliders
function initSkillSliders() {
    const sliders = document.querySelectorAll('.skill-slider');
    
    sliders.forEach(slider => {
        // Set initial value display
        const valueDisplay = slider.nextElementSibling;
        valueDisplay.textContent = slider.value;
        
        // Update value display when slider changes
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value;
        });
    });
}

// Load sample data
function loadSampleData() {
    // Load players for dropdown
    loadPlayers();
    
    // Load recent evaluations
    loadRecentEvaluations();
    
    // Load top performers
    loadTopPerformers();
    
    // Load match schedule
    loadMatchSchedule();
    
    // Load training schedule
    loadTrainingSchedule();
    
    // Load scout interest
    loadScoutInterest();
}

// Load players for dropdown
function loadPlayers() {
    const players = [
        { id: 1, name: 'Brian Otieno', position: 'Forward' },
        { id: 2, name: 'Samuel Mwangi', position: 'Midfielder' },
        { id: 3, name: 'David Kamau', position: 'Defender' },
        { id: 4, name: 'Joseph Kariuki', position: 'Goalkeeper' },
        { id: 5, name: 'Michael Omondi', position: 'Forward' },
        { id: 6, name: 'Peter Njoroge', position: 'Midfielder' },
        { id: 7, name: 'James Maina', position: 'Defender' },
        { id: 8, name: 'Robert Mutiso', position: 'Midfielder' }
    ];
    
    const playerSelect = document.getElementById('playerSelect');
    
    players.forEach(player => {
        const option = document.createElement('option');
        option.value = player.id;
        option.textContent = `${player.name} - ${player.position}`;
        playerSelect.appendChild(option);
    });
}

// Load recent evaluations
function loadRecentEvaluations() {
    const evaluations = [
        {
            player: 'Brian Otieno',
            date: '2025-01-07',
            rating: 8.2,
            summary: 'Excellent performance in the friendly match. Showed great leadership and scoring ability.'
        },
        {
            player: 'Samuel Mwangi',
            date: '2025-01-05',
            rating: 7.5,
            summary: 'Good midfield control and passing accuracy. Needs improvement in defensive positioning.'
        },
        {
            player: 'David Kamau',
            date: '2025-01-03',
            rating: 7.8,
            summary: 'Solid defensive performance. Strong in tackles and aerial duels.'
        }
    ];
    
    const evaluationList = document.getElementById('evaluationList');
    
    evaluations.forEach(evaluation => {
        const evaluationItem = document.createElement('div');
        evaluationItem.className = 'evaluation-item';
        evaluationItem.innerHTML = `
            <div class="evaluation-header">
                <span class="evaluation-player">${evaluation.player}</span>
                <span class="evaluation-rating">${evaluation.rating}</span>
            </div>
            <div class="evaluation-date">${formatDate(evaluation.date)}</div>
            <div class="evaluation-summary">${evaluation.summary}</div>
        `;
        
        evaluationList.appendChild(evaluationItem);
    });
}

// Load top performers
function loadTopPerformers() {
    const performers = [
        {
            name: 'Brian Otieno',
            position: 'Forward',
            rating: 8.2,
            avatar: 'BO'
        },
        {
            name: 'David Kamau',
            position: 'Defender',
            rating: 7.8,
            avatar: 'DK'
        },
        {
            name: 'Samuel Mwangi',
            position: 'Midfielder',
            rating: 7.5,
            avatar: 'SM'
        },
        {
            name: 'Michael Omondi',
            position: 'Forward',
            rating: 7.4,
            avatar: 'MO'
        }
    ];
    
    const performersList = document.getElementById('topPerformersList');
    
    performers.forEach(performer => {
        const performerItem = document.createElement('div');
        performerItem.className = 'performer-item';
        performerItem.innerHTML = `
            <div class="performer-avatar">${performer.avatar}</div>
            <div class="performer-info">
                <div class="performer-name">${performer.name}</div>
                <div class="performer-position">${performer.position}</div>
            </div>
            <div class="performer-rating">${performer.rating}</div>
        `;
        
        // Add click event to open player modal
        performerItem.addEventListener('click', () => {
            openPlayerModal(performer);
        });
        
        performersList.appendChild(performerItem);
    });
}

// Load match schedule
function loadMatchSchedule() {
    const matches = [
        {
            title: 'Friendly Match vs. Nairobi United',
            date: '2025-01-15',
            time: '15:00',
            location: 'City Stadium'
        },
        {
            title: 'League Match vs. Coastal FC',
            date: '2025-01-22',
            time: '16:30',
            location: 'Mombasa Sports Ground'
        },
        {
            title: 'Cup Quarter Final',
            date: '2025-01-29',
            time: '14:00',
            location: 'National Stadium'
        }
    ];
    
    const matchSchedule = document.getElementById('matchSchedule');
    
    matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.className = 'schedule-item';
        matchItem.innerHTML = `
            <div class="schedule-info">
                <div class="schedule-title">${match.title}</div>
                <div class="schedule-details">${match.location} • ${match.time}</div>
            </div>
            <div class="schedule-date">${formatDate(match.date)}</div>
        `;
        
        matchSchedule.appendChild(matchItem);
    });
}

// Load training schedule
function loadTrainingSchedule() {
    const trainings = [
        {
            title: 'Technical Skills Session',
            date: '2025-01-10',
            time: '09:00 - 11:00',
            focus: 'Passing & Shooting'
        },
        {
            title: 'Tactical Training',
            date: '2025-01-12',
            time: '09:00 - 11:00',
            focus: 'Defensive Organization'
        },
        {
            title: 'Fitness & Conditioning',
            date: '2025-01-14',
            time: '08:00 - 10:00',
            focus: 'Endurance & Strength'
        }
    ];
    
    const trainingSchedule = document.getElementById('trainingSchedule');
    
    trainings.forEach(training => {
        const trainingItem = document.createElement('div');
        trainingItem.className = 'schedule-item';
        trainingItem.innerHTML = `
            <div class="schedule-info">
                <div class="schedule-title">${training.title}</div>
                <div class="schedule-details">${training.focus} • ${training.time}</div>
            </div>
            <div class="schedule-date">${formatDate(training.date)}</div>
        `;
        
        trainingSchedule.appendChild(trainingItem);
    });
}

// Load scout interest
function loadScoutInterest() {
    const scoutInterests = [
        {
            scout: 'Kenya Premier League',
            player: 'Brian Otieno',
            date: '2025-01-06',
            avatar: 'KPL'
        },
        {
            scout: 'National Team Scout',
            player: 'David Kamau',
            date: '2025-01-04',
            avatar: 'NTS'
        },
        {
            scout: 'European Scout Network',
            player: 'Samuel Mwangi',
            date: '2025-01-02',
            avatar: 'ESN'
        }
    ];
    
    const scoutInterest = document.getElementById('scoutInterest');
    
    scoutInterests.forEach(interest => {
        const scoutItem = document.createElement('div');
        scoutItem.className = 'scout-item';
        scoutItem.innerHTML = `
            <div class="scout-avatar">${interest.avatar}</div>
            <div class="scout-info">
                <div class="scout-name">${interest.scout}</div>
                <div class="scout-player">Interested in ${interest.player}</div>
            </div>
            <div class="scout-date">${formatDate(interest.date)}</div>
        `;
        
        scoutInterest.appendChild(scoutItem);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    
    // Profile dropdown
    document.getElementById('profileBtn').addEventListener('click', toggleProfileDropdown);
    
    // Schedule tabs
    document.querySelectorAll('.schedule-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            switchScheduleTab(this);
        });
    });
    
    // Evaluation form
    document.getElementById('evaluationForm').addEventListener('submit', handleEvaluationSubmit);
    
    // Clear form button
    document.getElementById('clearForm').addEventListener('click', clearEvaluationForm);
    
    // Player modal
    document.getElementById('closePlayerModal').addEventListener('click', closePlayerModal);
    
    // Logout buttons
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    document.getElementById('logoutDropdown').addEventListener('click', handleLogout);
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        // Profile dropdown
        const profileContainer = document.getElementById('profileBtn').parentElement;
        if (!profileContainer.contains(event.target)) {
            document.getElementById('profileDropdown').classList.remove('active');
            document.getElementById('profileBtn').setAttribute('aria-expanded', 'false');
        }
        
        // Close modal when clicking outside
        const modal = document.getElementById('playerModal');
        if (event.target === modal) {
            closePlayerModal();
        }
    });
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    setTheme(newTheme);
    localStorage.setItem('talantascout-theme', newTheme);
}

// Set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    const themeIcon = document.querySelector('.theme-icon');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun theme-icon';
    } else {
        themeIcon.className = 'fas fa-moon theme-icon';
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('mobile-open');
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    const dropdown = document.getElementById('profileDropdown');
    const isExpanded = document.getElementById('profileBtn').getAttribute('aria-expanded') === 'true';
    
    dropdown.classList.toggle('active');
    document.getElementById('profileBtn').setAttribute('aria-expanded', !isExpanded);
}

// Switch schedule tab
function switchScheduleTab(clickedTab) {
    // Remove active class from all tabs
    document.querySelectorAll('.schedule-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Show corresponding tab content
    const tabId = clickedTab.getAttribute('data-tab');
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Handle evaluation form submission
function handleEvaluationSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const playerId = document.getElementById('playerSelect').value;
    const playerName = document.getElementById('playerSelect').options[document.getElementById('playerSelect').selectedIndex].text;
    const evaluationDate = document.getElementById('evaluationDate').value;
    
    // Get skill ratings
    const passing = document.getElementById('passingRating').value;
    const shooting = document.getElementById('shootingRating').value;
    const dribbling = document.getElementById('dribblingRating').value;
    const defense = document.getElementById('defenseRating').value;
    const speed = document.getElementById('speedRating').value;
    const stamina = document.getElementById('staminaRating').value;
    const strength = document.getElementById('strengthRating').value;
    const agility = document.getElementById('agilityRating').value;
    const decision = document.getElementById('decisionRating').value;
    const teamwork = document.getElementById('teamworkRating').value;
    const attitude = document.getElementById('attitudeRating').value;
    const leadership = document.getElementById('leadershipRating').value;
    
    const comments = document.getElementById('coachComments').value;
    const recommendToScouts = document.getElementById('recommendToScouts').checked;
    
    // Calculate average rating
    const ratings = [
        parseInt(passing), parseInt(shooting), parseInt(dribbling), parseInt(defense),
        parseInt(speed), parseInt(stamina), parseInt(strength), parseInt(agility),
        parseInt(decision), parseInt(teamwork), parseInt(attitude), parseInt(leadership)
    ];
    
    const averageRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
    
    // In a real app, you would send this data to a server
    console.log('Evaluation submitted:', {
        playerId,
        playerName,
        evaluationDate,
        ratings: {
            passing, shooting, dribbling, defense,
            speed, stamina, strength, agility,
            decision, teamwork, attitude, leadership
        },
        averageRating,
        comments,
        recommendToScouts
    });
    
    // Show success message
    showToast('Evaluation saved successfully!', 'success');
    
    // Clear form
    clearEvaluationForm();
    
    // In a real app, you would update the UI with the new evaluation
    // For now, we'll just reload the recent evaluations
    reloadRecentEvaluations();
}

// Clear evaluation form
function clearEvaluationForm() {
    document.getElementById('evaluationForm').reset();
    
    // Reset sliders to default value (5)
    document.querySelectorAll('.skill-slider').forEach(slider => {
        slider.value = 5;
        slider.nextElementSibling.textContent = 5;
    });
    
    // Set current date
    document.getElementById('evaluationDate').valueAsDate = new Date();
}

// Open player modal
function openPlayerModal(player) {
    // In a real app, you would fetch detailed player data
    // For now, we'll use sample data
    const modal = document.getElementById('playerModal');
    
    // Set player data
    document.getElementById('modalPlayerName').textContent = player.name;
    document.getElementById('modalPlayerPosition').textContent = player.position;
    document.getElementById('modalPlayerRating').textContent = player.rating;
    document.getElementById('modalPlayerAvatar').textContent = player.avatar;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close player modal
function closePlayerModal() {
    const modal = document.getElementById('playerModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Handle logout
function handleLogout() {
    // In a real app, you would make an API call to log out
    showToast('Logging out...', 'info');
    
    setTimeout(() => {
        // Redirect to login page
        window.location.href = '../index.html';
    }, 1500);
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    
    // Set message and type
    toastMessage.textContent = message;
    toast.className = `toast ${type}`;
    
    // Set icon based on type
    switch(type) {
        case 'success':
            toastIcon.className = 'toast-icon fas fa-check-circle';
            break;
        case 'error':
            toastIcon.className = 'toast-icon fas fa-exclamation-circle';
            break;
        case 'warning':
            toastIcon.className = 'toast-icon fas fa-exclamation-triangle';
            break;
        default:
            toastIcon.className = 'toast-icon fas fa-info-circle';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Close toast
document.getElementById('toastClose').addEventListener('click', function() {
    document.getElementById('toast').classList.remove('show');
});

// Format date for display
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Reload recent evaluations (simulated)
function reloadRecentEvaluations() {
    // In a real app, you would fetch updated data from the server
    // For now, we'll just show a message
    console.log('Reloading recent evaluations...');
}