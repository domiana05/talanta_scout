// TalantaScout Player Dashboard JavaScript
// Enhanced functionality with modern ES6+ features

// Kenyan Football Data
const kenyanTeams = [
    'Gor Mahia FC', 'AFC Leopards', 'Tusker FC', 'KCB FC', 'Bandari FC',
    'Sofapaka FC', 'Mathare United', 'Wazito FC', 'Kakamega Homeboyz',
    'Ulinzi Stars', 'Nzoia Sugar FC', 'Posta Rangers', 'Zoo FC',
    'Bidco United', 'Nairobi City Stars', 'Vihiga United'
];

const kenyanPlayers = [
    'Brian Otieno', 'Michael Wanyama', 'Dennis Oliech', 'Allan Wanga',
    'Jesse Were', 'Clifton Miheso', 'Eric Johanna', 'Kenneth Muguna',
    'Francis Kahata', 'Meddie Kagere', 'George Odhiambo', 'David Owino',
    'Joash Onyango', 'Musa Mohammed', 'Collins Okoth', 'Timothy Otieno',
    'Lawrence Juma', 'Boniface Muchiri', 'Elvis Rupia', 'John Makwatta'
];

const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret', 'Kakamega',
    'Machakos', 'Meru', 'Nyeri', 'Thika', 'Kitale', 'Garissa',
    'Malindi', 'Lamu', 'Isiolo', 'Marsabit', 'Wajir', 'Mandera'
];

const kenyanCoaches = [
    'Coach Wambua', 'Coach Kimanzi', 'Coach Migne', 'Coach Ouma',
    'Coach Nyangweso', 'Coach Matano', 'Coach Baraza', 'Coach Okumbi',
    'Coach Mulei', 'Coach Nandwa', 'Coach Omollo', 'Coach Kamau'
];

const trainingTypes = [
    'Technical Skills', 'Physical Fitness', 'Tactical Training', 'Match Preparation',
    'Recovery Session', 'Strength Training', 'Speed & Agility', 'Ball Control',
    'Shooting Practice', 'Passing Drills', 'Defensive Training', 'Set Pieces'
];

const venues = [
    'Kasarani Stadium', 'Nyayo Stadium', 'Moi International Sports Centre',
    'Bukhungu Stadium', 'Afraha Stadium', 'Machakos Stadium',
    'Kenyatta Stadium', 'Kipchoge Keino Stadium', 'Kinoru Stadium',
    'Mumias Sports Complex', 'Thika Stadium', 'ASK Showground'
];

// Application State
class DashboardState {
    constructor() {
        this.currentUser = {
            name: 'Brian Otieno',
            package: 'basic',
            avatar: 'https://via.placeholder.com/40x40/4CAF50/FFFFFF?text=BO'
        };
        this.theme = localStorage.getItem('theme') || 'light';
        this.notifications = [];
        this.isLoading = false;
    }

    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    addNotification(message, type = 'info') {
        const notification = {
            id: Date.now(),
            message,
            type,
            timestamp: new Date()
        };
        this.notifications.unshift(notification);
        this.showToast(message, type);
    }

    showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        const toastIcon = toast.querySelector('.toast-icon');
        const toastMessage = toast.querySelector('.toast-message');

        // Set icon based on type
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };

        toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
        toastMessage.textContent = message;
        
        // Add type-specific styling
        toast.className = `toast ${type}`;
        
        // Show toast
        toast.classList.add('active');
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);
    }
}

// Initialize application state
const appState = new DashboardState();

// DOM Elements Cache
const elements = {
    // Loading and overlays
    morphOverlay: null,
    
    // Navigation
    sidebar: null,
    mobileMenuToggle: null,
    navItems: null,
    
    // Header
    themeToggle: null,
    profileBtn: null,
    profileDropdown: null,
    dashboardDate: null,
    
    // Logout buttons
    logoutBtn: null,
    logoutDropdown: null,
    
    // Stats cards
    totalMatches: null,
    goalsScored: null,
    assists: null,
    trainingSessions: null,
    
    // Content sections
    skillTable: null,
    ratingList: null,
    trainingTable: null,
    matchCards: null,
    videoGrid: null,
    scoutInteractions: null,
    
    // Modals
    matchModal: null,
    upgradeModal: null,
    closeMatchModal: null,
    closeUpgradeModal: null,
    upgradeBtn: null,
    
    // Toast
    toast: null,
    toastClose: null
};

// Utility Functions
const utils = {
    // Get random element from array
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    // Format date to Kenyan locale
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Generate random number between min and max
    randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Generate random stats
    generateRandomStats() {
        return {
            matches: this.randomBetween(35, 55),
            goals: this.randomBetween(8, 20),
            assists: this.randomBetween(5, 15),
            training: this.randomBetween(20, 35)
        };
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Animate number counting
    animateNumber(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const difference = end - start;

        const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (difference * easeOutQuart));
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        
        requestAnimationFrame(step);
    }
};

// Event Handlers
const eventHandlers = {
    // Initialize all event listeners
    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupProfileDropdown();
        this.setupLogout();
        this.setupModals();
        this.setupToast();
        this.setupNavigation();
        this.setupDateFilter();
        this.setupUpgradeButton();
    },

    setupThemeToggle() {
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', () => {
                const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
                appState.setTheme(newTheme);
                
                const icon = elements.themeToggle.querySelector('i');
                if (icon) {
                    icon.className = newTheme === 'dark' ? 'fas fa-sun theme-icon' : 'fas fa-moon theme-icon';
                }
                
                appState.addNotification(`Switched to ${newTheme} theme`, 'success');
            });
        }
    },

    setupMobileMenu() {
        if (elements.mobileMenuToggle && elements.sidebar) {
            elements.mobileMenuToggle.addEventListener('click', () => {
                elements.sidebar.classList.toggle('open');
                const icon = elements.mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = elements.sidebar.classList.contains('open') 
                        ? 'fas fa-times' 
                        : 'fas fa-bars';
                }
            });

            // Close sidebar when clicking outside on mobile
            document.addEventListener('click', (event) => {
                if (window.innerWidth <= 768 && 
                    !elements.sidebar.contains(event.target) && 
                    !elements.mobileMenuToggle.contains(event.target)) {
                    elements.sidebar.classList.remove('open');
                    const icon = elements.mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });
        }
    },

    setupProfileDropdown() {
        if (elements.profileBtn && elements.profileDropdown) {
            elements.profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                elements.profileDropdown.classList.toggle('active');
                elements.profileBtn.setAttribute('aria-expanded', 
                    elements.profileDropdown.classList.contains('active'));
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (event) => {
                if (!elements.profileBtn.contains(event.target)) {
                    elements.profileDropdown.classList.remove('active');
                    elements.profileBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }
    },

    setupLogout() {
        const logoutHandler = () => {
            if (confirm('Are you sure you want to logout?')) {
                appState.addNotification('Logging out...', 'info');
                localStorage.removeItem('userSession');
                
                // Simulate logout delay
                setTimeout(() => {
                    appState.addNotification('Logged out successfully', 'success');
                    // In a real app, redirect to login page
                    console.log('Redirecting to login page...');
                }, 1000);
            }
        };

        if (elements.logoutBtn) {
            elements.logoutBtn.addEventListener('click', logoutHandler);
        }
        
        if (elements.logoutDropdown) {
            elements.logoutDropdown.addEventListener('click', logoutHandler);
        }
    },

    setupModals() {
        // Match modal
        if (elements.closeMatchModal && elements.matchModal) {
            elements.closeMatchModal.addEventListener('click', () => {
                elements.matchModal.classList.remove('active');
            });
        }

        // Upgrade modal
        if (elements.closeUpgradeModal && elements.upgradeModal) {
            elements.closeUpgradeModal.addEventListener('click', () => {
                elements.upgradeModal.classList.remove('active');
            });
        }

        // Close modals when clicking overlay
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('click', (event) => {
                if (event.target === overlay) {
                    overlay.classList.remove('active');
                }
            });
        });

        // ESC key to close modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    },

    setupToast() {
        if (elements.toastClose && elements.toast) {
            elements.toastClose.addEventListener('click', () => {
                elements.toast.classList.remove('active');
            });
        }
    },

    setupNavigation() {
        if (elements.navItems) {
            elements.navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remove active class from all items
                    elements.navItems.forEach(navItem => {
                        navItem.parentElement.classList.remove('active');
                    });
                    
                    // Add active class to clicked item
                    item.parentElement.classList.add('active');
                    
                    // Get the href and show notification
                    const href = item.getAttribute('href');
                    const text = item.querySelector('span').textContent;
                    appState.addNotification(`Navigating to ${text}`, 'info');
                    
                    // Close mobile menu if open
                    if (window.innerWidth <= 768 && elements.sidebar) {
                        elements.sidebar.classList.remove('open');
                    }
                });
            });
        }
    },

    setupDateFilter() {
        if (elements.dashboardDate) {
            elements.dashboardDate.addEventListener('change', (e) => {
                const selectedDate = e.target.value;
                appState.addNotification(`Date filter updated to ${utils.formatDate(selectedDate)}`, 'info');
                // In a real app, this would trigger data refresh
                dataManager.refreshData();
            });
        }
    },

    setupUpgradeButton() {
        if (elements.upgradeBtn && elements.upgradeModal) {
            elements.upgradeBtn.addEventListener('click', () => {
                elements.upgradeModal.classList.add('active');
            });
        }
    }
};

// Data Management
const dataManager = {
    // Load all dashboard data
    async loadDashboardData() {
        try {
            appState.isLoading = true;
            
            await Promise.all([
                this.loadSkillProgression(),
                this.loadMatchRatings(),
                this.loadTrainingSessions(),
                this.loadMatchHighlights(),
                this.loadVideoPortfolio(),
                this.loadScoutInteractions(),
                this.updateOverviewCards()
            ]);
            
            appState.isLoading = false;
            appState.addNotification('Dashboard data loaded successfully', 'success');
        } catch (error) {
            console.error('Error loading dashboard data:', error);
            appState.addNotification('Error loading dashboard data', 'error');
            appState.isLoading = false;
        }
    },

    // Update overview statistics cards
    updateOverviewCards() {
        const stats = utils.generateRandomStats();
        
        if (elements.totalMatches) {
            utils.animateNumber(elements.totalMatches, 0, stats.matches);
        }
        if (elements.goalsScored) {
            utils.animateNumber(elements.goalsScored, 0, stats.goals);
        }
        if (elements.assists) {
            utils.animateNumber(elements.assists, 0, stats.assists);
        }
        if (elements.trainingSessions) {
            utils.animateNumber(elements.trainingSessions, 0, stats.training);
        }
    },

    // Load skill progression data
    loadSkillProgression() {
        if (!elements.skillTable) return;
        
        const skills = [
            { name: 'Shooting', level: 'Intermediate', rating: 7.2, updated: '2025-01-05', progress: 72 },
            { name: 'Passing', level: 'Advanced', rating: 8.1, updated: '2025-01-06', progress: 81 },
            { name: 'Dribbling', level: 'Intermediate', rating: 6.8, updated: '2025-01-04', progress: 68 },
            { name: 'Defense', level: 'Beginner', rating: 5.5, updated: '2025-01-03', progress: 55 },
            { name: 'Speed', level: 'Advanced', rating: 8.5, updated: '2025-01-07', progress: 85 },
            { name: 'Stamina', level: 'Intermediate', rating: 7.0, updated: '2025-01-02', progress: 70 }
        ];
        
        const tbody = elements.skillTable.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = skills.map(skill => `
                <tr>
                    <td><strong>${skill.name}</strong></td>
                    <td><span class="level-badge ${skill.level.toLowerCase()}">${skill.level}</span></td>
                    <td><span class="rating">${skill.rating}/10</span></td>
                    <td>${utils.formatDate(skill.updated)}</td>
                    <td>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${skill.progress}%"></div>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
    },

    // Load match ratings
    loadMatchRatings() {
        if (!elements.ratingList) return;
        
        const ratings = [
            { date: '2025-01-05', opponent: 'AFC Leopards', rating: 8.2, result: 'Win 2-1' },
            { date: '2024-12-28', opponent: 'Tusker FC', rating: 7.5, result: 'Draw 1-1' },
            { date: '2024-12-21', opponent: 'KCB FC', rating: 6.8, result: 'Loss 0-2' },
            { date: '2024-12-14', opponent: 'Bandari FC', rating: 8.7, result: 'Win 3-0' },
            { date: '2024-12-07', opponent: 'Sofapaka FC', rating: 7.9, result: 'Win 2-0' }
        ];
        
        elements.ratingList.innerHTML = ratings.map(match => `
            <div class="rating-item">
                <div class="rating-header">
                    <span class="rating-date">${utils.formatDate(match.date)}</span>
                    <span class="rating-score ${this.getRatingClass(match.rating)}">${match.rating}/10</span>
                </div>
                <div class="rating-match">vs ${match.opponent}</div>
                <div class="rating-result">${match.result}</div>
            </div>
        `).join('');
    },

    // Load training sessions
    loadTrainingSessions() {
        if (!elements.trainingTable) return;
        
        const sessions = [
            {
                date: '2025-01-09',
                time: '16:00',
                type: utils.getRandomElement(trainingTypes),
                coach: utils.getRandomElement(kenyanCoaches),
                location: utils.getRandomElement(venues),
                status: 'Scheduled'
            },
            {
                date: '2025-01-11',
                time: '09:00',
                type: utils.getRandomElement(trainingTypes),
                coach: utils.getRandomElement(kenyanCoaches),
                location: utils.getRandomElement(venues),
                status: 'Confirmed'
            },
            {
                date: '2025-01-13',
                time: '15:30',
                type: utils.getRandomElement(trainingTypes),
                coach: utils.getRandomElement(kenyanCoaches),
                location: utils.getRandomElement(venues),
                status: 'Pending'
            },
            {
                date: '2025-01-15',
                time: '17:00',
                type: utils.getRandomElement(trainingTypes),
                coach: utils.getRandomElement(kenyanCoaches),
                location: utils.getRandomElement(venues),
                status: 'Scheduled'
            },
            {
                date: '2025-01-17',
                time: '10:00',
                type: utils.getRandomElement(trainingTypes),
                coach: utils.getRandomElement(kenyanCoaches),
                location: utils.getRandomElement(venues),
                status: 'Optional'
            }
        ];
        
        const tbody = elements.trainingTable.querySelector('tbody');
        if (tbody) {
            tbody.innerHTML = sessions.map(session => `
                <tr>
                    <td>${utils.formatDate(session.date)}</td>
                    <td>${session.time}</td>
                    <td>${session.type}</td>
                    <td>${session.coach}</td>
                    <td>${session.location}</td>
                    <td><span class="status-badge ${session.status.toLowerCase()}">${session.status}</span></td>
                </tr>
            `).join('');
        }
    },

    // Load match highlights
    loadMatchHighlights() {
        if (!elements.matchCards) return;
        
        const matches = [
            {
                date: '2025-01-05',
                teams: 'Gor Mahia FC vs AFC Leopards',
                score: '2-1',
                goals: 1,
                assists: 1,
                rating: 8.2
            },
            {
                date: '2024-12-28',
                teams: 'Tusker FC vs Gor Mahia FC',
                score: '1-1',
                goals: 0,
                assists: 1,
                rating: 7.5
            },
            {
                date: '2024-12-21',
                teams: 'KCB FC vs Gor Mahia FC',
                score: '2-0',
                goals: 0,
                assists: 0,
                rating: 6.8
            },
            {
                date: '2024-12-14',
                teams: 'Bandari FC vs Gor Mahia FC',
                score: '0-3',
                goals: 2,
                assists: 0,
                rating: 8.7
            }
        ];
        
        elements.matchCards.innerHTML = matches.map(match => `
            <div class="match-card" onclick="modalManager.showMatchDetails('${match.date}', '${match.teams}', '${match.score}', ${match.goals}, ${match.assists}, ${match.rating})">
                <div class="match-header">
                    <span class="match-date">${utils.formatDate(match.date)}</span>
                    <span class="match-score">${match.score}</span>
                </div>
                <div class="match-teams">${match.teams}</div>
                <div class="match-stats">
                    <span>Goals: ${match.goals}</span>
                    <span>Assists: ${match.assists}</span>
                    <span>Rating: ${match.rating}/10</span>
                </div>
            </div>
        `).join('');
    },

    // Load video portfolio
    loadVideoPortfolio() {
        if (!elements.videoGrid) return;
        
        const videos = [
            { title: 'Training Highlights', duration: '2:30', type: 'training' },
            { title: 'Match Performance vs AFC Leopards', duration: '1:45', type: 'match' },
            { title: 'Skill Demonstration', duration: '3:15', type: 'skills' },
            { title: 'Goal Compilation', duration: '4:20', type: 'goals' }
        ];
        
        elements.videoGrid.innerHTML = videos.map(video => `
            <div class="video-item">
                <div class="video-thumbnail">
                    <i class="fas fa-play"></i>
                </div>
                <div class="video-info">
                    <div class="video-title">${video.title}</div>
                    <div class="video-duration">${video.duration}</div>
                    <div class="basic-limitation">
                        <i class="fas fa-lock"></i>
                        <span>View Only</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Load scout interactions
    loadScoutInteractions() {
        if (!elements.scoutInteractions) return;
        
        const scouts = [
            { name: 'Samuel Ochieng', organization: 'Gor Mahia FC', date: '2025-01-06' },
            { name: 'Mary Wanjiku', organization: 'AFC Leopards', date: '2025-01-04' },
            { name: 'Peter Kimani', organization: 'Tusker FC', date: '2025-01-02' },
            { name: 'Grace Akinyi', organization: 'KCB FC', date: '2024-12-30' },
            { name: 'John Mwangi', organization: 'Bandari FC', date: '2024-12-28' }
        ];
        
        elements.scoutInteractions.innerHTML = scouts.map(scout => `
            <div class="scout-item">
                <div class="scout-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="scout-info">
                    <h4>${scout.name}</h4>
                    <p>${scout.organization} • Viewed on ${utils.formatDate(scout.date)}</p>
                    <div class="basic-limitation">
                        <i class="fas fa-eye"></i>
                        <span>View Only - Upgrade for messaging</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Get rating class based on score
    getRatingClass(rating) {
        if (rating >= 8) return 'excellent';
        if (rating >= 7) return 'good';
        return 'average';
    },

    // Refresh all data
    refreshData: utils.debounce(function() {
        dataManager.loadDashboardData();
    }, 300)
};

// Modal Management
const modalManager = {
    showMatchDetails(date, teams, score, goals, assists, rating) {
        if (!elements.matchModal) return;
        
        const modalElements = {
            date: document.getElementById('modalMatchDate'),
            opponent: document.getElementById('modalOpponent'),
            score: document.getElementById('modalScore'),
            goals: document.getElementById('modalGoals'),
            assists: document.getElementById('modalAssists'),
            rating: document.getElementById('modalRating')
        };
        
        if (modalElements.date) modalElements.date.textContent = utils.formatDate(date);
        if (modalElements.opponent) modalElements.opponent.textContent = teams;
        if (modalElements.score) modalElements.score.textContent = score;
        if (modalElements.goals) modalElements.goals.textContent = goals;
        if (modalElements.assists) modalElements.assists.textContent = assists;
        if (modalElements.rating) modalElements.rating.textContent = `${rating}/10`;
        
        elements.matchModal.classList.add('active');
    }
};

// Performance Monitoring
const performanceMonitor = {
    init() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Dashboard loaded in ${loadTime.toFixed(2)}ms`);
            
            if (loadTime > 3000) {
                appState.addNotification('Dashboard loaded slowly. Consider optimizing.', 'warning');
            }
        });

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                const memory = performance.memory;
                if (memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    console.warn('High memory usage detected');
                }
            }, 30000);
        }
    }
};

// Accessibility Features
const accessibility = {
    init() {
        // Add keyboard navigation support
        this.setupKeyboardNavigation();
        
        // Add screen reader support
        this.setupScreenReaderSupport();
        
        // Add focus management
        this.setupFocusManagement();
    },

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (event) => {
            // ESC key handling is already in modal setup
            
            // Tab navigation enhancement
            if (event.key === 'Tab') {
                // Ensure focus is visible
                document.body.classList.add('keyboard-navigation');
            }
        });

        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    },

    setupScreenReaderSupport() {
        // Add ARIA labels where needed
        const buttons = document.querySelectorAll('button:not([aria-label])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim() || button.title || 'Button';
                button.setAttribute('aria-label', text);
            }
        });
    },

    setupFocusManagement() {
        // Trap focus in modals
        document.querySelectorAll('.modal').forEach(modal => {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                modal.addEventListener('keydown', (event) => {
                    if (event.key === 'Tab') {
                        if (event.shiftKey) {
                            if (document.activeElement === firstElement) {
                                event.preventDefault();
                                lastElement.focus();
                            }
                        } else {
                            if (document.activeElement === lastElement) {
                                event.preventDefault();
                                firstElement.focus();
                            }
                        }
                    }
                });
            }
        });
    }
};

// Application Initialization
class DashboardApp {
    constructor() {
        this.initialized = false;
    }

    async init() {
        if (this.initialized) return;
        
        try {
            // Cache DOM elements
            this.cacheElements();
            
            // Set initial theme
            document.documentElement.setAttribute('data-theme', appState.theme);
            this.updateThemeIcon();
            
            // Initialize modules
            eventHandlers.init();
            performanceMonitor.init();
            accessibility.init();
            
            // Load data
            await dataManager.loadDashboardData();
            
            // Hide loading overlay
            this.hideLoadingOverlay();
            
            // Set up auto-refresh
            this.setupAutoRefresh();
            
            this.initialized = true;
            console.log('Dashboard initialized successfully');
            
        } catch (error) {
            console.error('Error initializing dashboard:', error);
            appState.addNotification('Error initializing dashboard', 'error');
        }
    }

    cacheElements() {
        // Cache all DOM elements
        Object.keys(elements).forEach(key => {
            const element = document.getElementById(key) || 
                           document.querySelector(`.${key}`) ||
                           document.querySelector(`[data-element="${key}"]`);
            elements[key] = element;
        });

        // Special cases for elements with different selectors
        elements.navItems = document.querySelectorAll('.nav-item');
        elements.sidebar = document.getElementById('sidebar');
        elements.mobileMenuToggle = document.getElementById('mobileMenuToggle');
    }

    updateThemeIcon() {
        if (elements.themeToggle) {
            const icon = elements.themeToggle.querySelector('i');
            if (icon) {
                icon.className = appState.theme === 'dark' 
                    ? 'fas fa-sun theme-icon' 
                    : 'fas fa-moon theme-icon';
            }
        }
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('morphOverlay');
        if (overlay) {
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 500);
            }, 1500);
        }
    }

    setupAutoRefresh() {
        // Auto-refresh overview cards every 30 seconds
        setInterval(() => {
            if (!appState.isLoading) {
                dataManager.updateOverviewCards();
            }
        }, 30000);

        // Auto-refresh all data every 5 minutes
        setInterval(() => {
            if (!appState.isLoading) {
                dataManager.refreshData();
            }
        }, 300000);
    }
}

// Global functions for HTML onclick handlers
window.modalManager = modalManager;

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new DashboardApp();
    app.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Page became visible, refresh data
        dataManager.refreshData();
    }
});

// Handle online/offline status
window.addEventListener('online', () => {
    appState.addNotification('Connection restored', 'success');
    dataManager.refreshData();
});

window.addEventListener('offline', () => {
    appState.addNotification('Connection lost. Some features may not work.', 'warning');
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        DashboardApp,
        appState,
        dataManager,
        utils
    };
}
