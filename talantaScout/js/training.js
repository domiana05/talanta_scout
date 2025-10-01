// coach-training.js
// Player Training & Analytics functionality for coaches

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the dashboard
    initCoachTrainingDashboard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadDashboardData();
});

function initCoachTrainingDashboard() {
    console.log('Initializing Coach Training Dashboard...');
    
    // Hide loading overlay after a short delay
    setTimeout(() => {
        const morphOverlay = document.getElementById('morphOverlay');
        if (morphOverlay) {
            morphOverlay.classList.add('hidden');
            setTimeout(() => {
                morphOverlay.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Initialize charts
    initTrainingProgressChart();
    initPotentialRadarChart();
}

function setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Profile dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', function() {
            profileDropdown.classList.toggle('active');
            const expanded = profileBtn.getAttribute('aria-expanded') === 'true';
            profileBtn.setAttribute('aria-expanded', !expanded);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!profileBtn.contains(event.target) && !profileDropdown.contains(event.target)) {
                profileDropdown.classList.remove('active');
                profileBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Player selector
    const playerSelect = document.getElementById('playerSelect');
    if (playerSelect) {
        playerSelect.addEventListener('change', function() {
            updatePlayerData(this.value);
        });
    }
    
    // Analytics period filter
    const analyticsPeriod = document.getElementById('analyticsPeriod');
    if (analyticsPeriod) {
        analyticsPeriod.addEventListener('change', function() {
            updateAnalyticsData(this.value);
        });
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(this, tabId);
        });
    });
    
    // Add Training Session button
    const addTrainingBtn = document.getElementById('addTrainingBtn');
    const addTrainingModal = document.getElementById('addTrainingModal');
    const closeTrainingModal = document.getElementById('closeTrainingModal');
    const cancelTrainingBtn = document.getElementById('cancelTrainingBtn');
    const trainingForm = document.getElementById('trainingForm');
    
    if (addTrainingBtn && addTrainingModal) {
        addTrainingBtn.addEventListener('click', function() {
            addTrainingModal.classList.add('active');
        });
    }
    
    if (closeTrainingModal && addTrainingModal) {
        closeTrainingModal.addEventListener('click', function() {
            addTrainingModal.classList.remove('active');
        });
    }
    
    if (cancelTrainingBtn && addTrainingModal) {
        cancelTrainingBtn.addEventListener('click', function() {
            addTrainingModal.classList.remove('active');
        });
    }
    
    if (trainingForm) {
        trainingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveTrainingSession();
        });
    }
    
    // Add Achievement button
    const addAchievementBtn = document.getElementById('addAchievementBtn');
    const addAchievementModal = document.getElementById('addAchievementModal');
    const closeAchievementModal = document.getElementById('closeAchievementModal');
    const cancelAchievementBtn = document.getElementById('cancelAchievementBtn');
    const achievementForm = document.getElementById('achievementForm');
    
    if (addAchievementBtn && addAchievementModal) {
        addAchievementBtn.addEventListener('click', function() {
            addAchievementModal.classList.add('active');
        });
    }
    
    if (closeAchievementModal && addAchievementModal) {
        closeAchievementModal.addEventListener('click', function() {
            addAchievementModal.classList.remove('active');
        });
    }
    
    if (cancelAchievementBtn && addAchievementModal) {
        cancelAchievementBtn.addEventListener('click', function() {
            addAchievementModal.classList.remove('active');
        });
    }
    
    if (achievementForm) {
        achievementForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveAchievement();
        });
    }
    
    // Compare Players button
    const compareBtn = document.getElementById('compareBtn');
    if (compareBtn) {
        compareBtn.addEventListener('click', function() {
            showToast('Player comparison feature coming soon!', 'info');
        });
    }
    
    // Logout buttons
    const logoutBtn = document.getElementById('logoutBtn');
    const logoutDropdown = document.getElementById('logoutDropdown');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            confirmLogout();
        });
    }
    
    if (logoutDropdown) {
        logoutDropdown.addEventListener('click', function() {
            confirmLogout();
        });
    }
    
    // Toast close button
    const toastClose = document.getElementById('toastClose');
    if (toastClose) {
        toastClose.addEventListener('click', function() {
            hideToast();
        });
    }
}

function loadDashboardData() {
    console.log('Loading dashboard data...');
    // In a real application, this would fetch data from an API
    
    // Simulate loading data
    setTimeout(() => {
        // Update any dynamic content here
    }, 500);
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    const themeIcon = document.querySelector('.theme-icon');
    
    html.setAttribute('data-theme', newTheme);
    
    // Update theme icon
    if (themeIcon) {
        if (newTheme === 'dark') {
            themeIcon.className = 'fas fa-sun theme-icon';
        } else {
            themeIcon.className = 'fas fa-moon theme-icon';
        }
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
}

function switchTab(activeBtn, tabId) {
    // Remove active class from all tab buttons and panes
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => btn.classList.remove('active'));
    tabPanes.forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked tab button and corresponding pane
    activeBtn.classList.add('active');
    const targetPane = document.getElementById(tabId);
    if (targetPane) {
        targetPane.classList.add('active');
    }
}

function updatePlayerData(playerId) {
    console.log('Updating data for player:', playerId);
    // In a real application, this would fetch player-specific data from an API
    
    showToast(`Loading data for ${getPlayerName(playerId)}`, 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Update player card and stats based on selected player
        updatePlayerCard(playerId);
        updateTrainingProgress(playerId);
        updateSkillAssessment(playerId);
        updateMatchAnalytics(playerId);
        updatePotentialAnalysis(playerId);
        
        showToast(`Data loaded for ${getPlayerName(playerId)}`, 'success');
    }, 800);
}

function getPlayerName(playerId) {
    const playerSelect = document.getElementById('playerSelect');
    if (playerSelect) {
        return playerSelect.options[playerSelect.selectedIndex].text;
    }
    return 'Player';
}

function updatePlayerCard(playerId) {
    // In a real app, this would update with actual player data
    const playerCard = document.querySelector('.player-card');
    if (playerCard) {
        // Update player photo, name, details, etc.
        console.log('Updating player card for:', playerId);
    }
}

function updateTrainingProgress(playerId) {
    // Update training progress chart with player-specific data
    console.log('Updating training progress for:', playerId);
    initTrainingProgressChart(); // Reinitialize with new data
}

function updateSkillAssessment(playerId) {
    // Update skill assessment with player-specific data
    console.log('Updating skill assessment for:', playerId);
    
    // Simulate updating skill ratings
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        const ratingBar = item.querySelector('.rating-fill');
        const ratingValue = item.querySelector('.rating-value');
        
        if (ratingBar && ratingValue) {
            // Generate random new value for demo purposes
            const currentValue = parseInt(ratingValue.textContent);
            const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
            const newValue = Math.max(0, Math.min(100, currentValue + change));
            
            // Animate the change
            animateValue(ratingValue, currentValue, newValue, 500);
            setTimeout(() => {
                ratingBar.style.width = newValue + '%';
            }, 500);
        }
    });
}

function updateMatchAnalytics(playerId) {
    // Update match analytics with player-specific data
    console.log('Updating match analytics for:', playerId);
}

function updatePotentialAnalysis(playerId) {
    // Update potential analysis with player-specific data
    console.log('Updating potential analysis for:', playerId);
    initPotentialRadarChart(); // Reinitialize with new data
}

function updateAnalyticsData(period) {
    console.log('Updating analytics for period:', period);
    // In a real application, this would fetch period-specific data
    
    showToast(`Loading ${period} analytics...`, 'info');
    
    // Simulate API call
    setTimeout(() => {
        // Update charts and stats based on selected period
        updateTrainingProgress('current');
        updateMatchAnalytics('current');
        
        showToast(`${period} analytics loaded`, 'success');
    }, 800);
}

function initTrainingProgressChart() {
    const chartContainer = document.getElementById('trainingProgressChart');
    if (!chartContainer) return;
    
    // In a real application, this would use a charting library like Chart.js
    // For this demo, we'll create a simple SVG chart
    
    chartContainer.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 400 200">
            <!-- Grid lines -->
            <line x1="50" y1="50" x2="350" y2="50" stroke="#E0E0E0" stroke-width="1" />
            <line x1="50" y1="100" x2="350" y2="100" stroke="#E0E0E0" stroke-width="1" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#E0E0E0" stroke-width="1" />
            
            <!-- Data points -->
            <circle cx="100" cy="120" r="4" fill="#4CAF50" />
            <circle cx="150" cy="100" r="4" fill="#4CAF50" />
            <circle cx="200" cy="80" r="4" fill="#4CAF50" />
            <circle cx="250" cy="110" r="4" fill="#4CAF50" />
            <circle cx="300" cy="90" r="4" fill="#4CAF50" />
            
            <!-- Line connecting points -->
            <polyline points="100,120 150,100 200,80 250,110 300,90" 
                     fill="none" stroke="#4CAF50" stroke-width="2" />
            
            <!-- Axes labels -->
            <text x="30" y="50" text-anchor="end" fill="#666" font-size="12">10</text>
            <text x="30" y="100" text-anchor="end" fill="#666" font-size="12">5</text>
            <text x="30" y="150" text-anchor="end" fill="#666" font-size="12">0</text>
            
            <text x="100" y="180" text-anchor="middle" fill="#666" font-size="12">Jan</text>
            <text x="150" y="180" text-anchor="middle" fill="#666" font-size="12">Feb</text>
            <text x="200" y="180" text-anchor="middle" fill="#666" font-size="12">Mar</text>
            <text x="250" y="180" text-anchor="middle" fill="#666" font-size="12">Apr</text>
            <text x="300" y="180" text-anchor="middle" fill="#666" font-size="12">May</text>
        </svg>
        <div style="text-align: center; margin-top: 10px; color: #666;">
            Training Performance Over Time
        </div>
    `;
}

function initPotentialRadarChart() {
    const chartContainer = document.getElementById('potentialRadar');
    if (!chartContainer) return;
    
    // In a real application, this would use a charting library
    // For this demo, we'll create a simple SVG radar chart
    
    chartContainer.innerHTML = `
        <svg width="100%" height="100%" viewBox="0 0 300 300">
            <!-- Radar grid -->
            <polygon points="150,50 220,90 240,170 180,240 120,240 60,170 80,90" 
                     fill="none" stroke="#E0E0E0" stroke-width="1" />
            <polygon points="150,100 190,120 200,160 170,190 130,190 100,160 110,120" 
                     fill="none" stroke="#E0E0E0" stroke-width="1" />
            <polygon points="150,150 160,140 160,160 140,160 140,140" 
                     fill="none" stroke="#E0E0E0" stroke-width="1" />
            
            <!-- Data polygon -->
            <polygon points="150,70 200,110 220,160 170,200 130,200 90,160 100,110" 
                     fill="rgba(76, 175, 80, 0.3)" stroke="#4CAF50" stroke-width="2" />
            
            <!-- Axis labels -->
            <text x="150" y="30" text-anchor="middle" fill="#666" font-size="12">Technical</text>
            <text x="260" y="100" text-anchor="middle" fill="#666" font-size="12">Physical</text>
            <text x="250" y="200" text-anchor="middle" fill="#666" font-size="12">Tactical</text>
            <text x="150" y="270" text-anchor="middle" fill="#666" font-size="12">Mental</text>
            <text x="50" y="200" text-anchor="middle" fill="#666" font-size="12">Defensive</text>
            <text x="40" y="100" text-anchor="middle" fill="#666" font-size="12">Offensive</text>
        </svg>
        <div style="text-align: center; margin-top: 10px; color: #666;">
            Player Potential Radar
        </div>
    `;
}

function saveTrainingSession() {
    const sessionDate = document.getElementById('sessionDate').value;
    const sessionType = document.getElementById('sessionType').value;
    const sessionRating = document.getElementById('sessionRating').value;
    const sessionNotes = document.getElementById('sessionNotes').value;
    
    // In a real application, this would send data to an API
    console.log('Saving training session:', {
        date: sessionDate,
        type: sessionType,
        rating: sessionRating,
        notes: sessionNotes
    });
    
    // Close modal
    const addTrainingModal = document.getElementById('addTrainingModal');
    if (addTrainingModal) {
        addTrainingModal.classList.remove('active');
    }
    
    // Reset form
    const trainingForm = document.getElementById('trainingForm');
    if (trainingForm) {
        trainingForm.reset();
    }
    
    // Show success message
    showToast('Training session saved successfully!', 'success');
    
    // Refresh training data
    updateTrainingProgress('current');
}

function saveAchievement() {
    const achievementType = document.getElementById('achievementType').value;
    const achievementTitle = document.getElementById('achievementTitle').value;
    const achievementDescription = document.getElementById('achievementDescription').value;
    const achievementYear = document.getElementById('achievementYear').value;
    
    // In a real application, this would send data to an API
    console.log('Saving achievement:', {
        type: achievementType,
        title: achievementTitle,
        description: achievementDescription,
        year: achievementYear
    });
    
    // Close modal
    const addAchievementModal = document.getElementById('addAchievementModal');
    if (addAchievementModal) {
        addAchievementModal.classList.remove('active');
    }
    
    // Reset form
    const achievementForm = document.getElementById('achievementForm');
    if (achievementForm) {
        achievementForm.reset();
    }
    
    // Show success message
    showToast('Achievement saved successfully!', 'success');
    
    // Refresh achievements list
    // In a real app, this would reload the achievements from the server
}

function confirmLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real application, this would call a logout API
        console.log('Logging out...');
        
        showToast('Logging out...', 'info');
        
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.querySelector('.toast-message');
    const toastIcon = document.querySelector('.toast-icon');
    
    if (!toast || !toastMessage || !toastIcon) return;
    
    // Set message and icon based on type
    toastMessage.textContent = message;
    
    // Set icon based on type
    let iconClass = '';
    switch (type) {
        case 'success':
            iconClass = 'fas fa-check-circle';
            toast.style.borderLeft = '4px solid var(--success-color)';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-circle';
            toast.style.borderLeft = '4px solid var(--error-color)';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-triangle';
            toast.style.borderLeft = '4px solid var(--warning-color)';
            break;
        default:
            iconClass = 'fas fa-info-circle';
            toast.style.borderLeft = '4px solid var(--info-color)';
    }
    
    toastIcon.className = `toast-icon ${iconClass}`;
    
    // Show toast
    toast.classList.add('active');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.classList.remove('active');
    }
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const startTime = performance.now();
    
    function updateValue(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (range * easeOutQuart));
        
        element.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updateValue);
        }
    }
    
    requestAnimationFrame(updateValue);
}

// Load saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            if (savedTheme === 'dark') {
                themeIcon.className = 'fas fa-sun theme-icon';
            } else {
                themeIcon.className = 'fas fa-moon theme-icon';
            }
        }
    }
}

// Initialize theme on load
loadThemePreference();