// Enhanced Coach Profile JavaScript with Charts
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    initializeCharts();
    hideLoadingOverlay();
});

function initializeElements() {
    morphOverlay = document.getElementById('morphOverlay');
    themeToggle = document.getElementById('themeToggle');
    profileBtn = document.getElementById('profileBtn');
    profileDropdown = document.getElementById('profileDropdown');
    logoutBtn = document.getElementById('logoutBtn');
    logoutDropdown = document.getElementById('logoutDropdown');
    changePhotoBtn = document.getElementById('changePhotoBtn');
    editPersonalBtn = document.getElementById('editPersonalBtn');
    editCoachingBtn = document.getElementById('editCoachingBtn');
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
    
    // Edit buttons
    if (editPersonalBtn) {
        editPersonalBtn.addEventListener('click', () => showEditModal('personal'));
    }
    
    if (editCoachingBtn) {
        editCoachingBtn.addEventListener('click', () => showEditModal('coaching'));
    }
    
    // Change photo button
    if (changePhotoBtn) {
        changePhotoBtn.addEventListener('click', changeProfilePhoto);
    }
    
    // Video upload
    const uploadVideo = document.querySelector('.upload-video');
    if (uploadVideo) {
        uploadVideo.addEventListener('click', uploadNewVideo);
    }
    
    // Add player functionality
    const addPlayerBtn = document.querySelector('.enhanced-feature');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', addNewPlayer);
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

function showEditModal(type) {
    alert(`Edit ${type} information functionality would be implemented here.`);
}

function changeProfilePhoto() {
    alert('Change profile photo functionality would be implemented here.');
}

function uploadNewVideo() {
    alert('Video upload functionality would be implemented here.');
}

function addNewPlayer() {
    alert('Add new player functionality would be implemented here.');
}

function initializeCharts() {
    createTeamPerformanceChart();
    createPlayerDevelopmentChart();
    createTacticalEffectivenessChart();
    createMatchResultsChart();
}

function createTeamPerformanceChart() {
    const ctx = document.getElementById('teamPerformanceChart').getContext('2d');
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Win Rate',
                    data: [55, 60, 65, 68, 70, 72, 68],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Goals Scored',
                    data: [8, 12, 10, 15, 18, 16, 14],
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Goals Conceded',
                    data: [6, 5, 4, 3, 2, 3, 4],
                    borderColor: '#F44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function createPlayerDevelopmentChart() {
    const ctx = document.getElementById('playerDevelopmentChart').getContext('2d');
    
    const players = ['Player A', 'Player B', 'Player C', 'Player D', 'Player E'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: players,
            datasets: [{
                label: 'Skill Improvement (%)',
                data: [25, 40, 35, 50, 30],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)'
                ],
                borderColor: [
                    'rgb(76, 175, 80)',
                    'rgb(76, 175, 80)',
                    'rgb(76, 175, 80)',
                    'rgb(76, 175, 80)',
                    'rgb(76, 175, 80)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function createTacticalEffectivenessChart() {
    const ctx = document.getElementById('tacticalEffectivenessChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Possession', 'Pressing', 'Transition', 'Set Pieces', 'Defensive Organization', 'Attacking Patterns'],
            datasets: [{
                label: 'Current Effectiveness',
                data: [85, 78, 82, 75, 80, 78],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgb(76, 175, 80)',
                pointBackgroundColor: 'rgb(76, 175, 80)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(76, 175, 80)'
            }, {
                label: 'Target Effectiveness',
                data: [90, 85, 88, 85, 85, 85],
                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                borderColor: 'rgb(255, 193, 7)',
                pointBackgroundColor: 'rgb(255, 193, 7)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 193, 7)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        display: true
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            }
        }
    });
}

function createMatchResultsChart() {
    const ctx = document.getElementById('matchResultsChart').getContext('2d');
    
    const results = ['Wins', 'Draws', 'Losses'];
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: results,
            datasets: [{
                data: [68, 20, 12],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(255, 193, 7, 0.7)',
                    'rgba(244, 67, 54, 0.7)'
                ],
                borderColor: [
                    'rgb(76, 175, 80)',
                    'rgb(255, 193, 7)',
                    'rgb(244, 67, 54)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                }
            }
        }
    });
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

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// Initialize animation when page loads
window.addEventListener('load', animateSkillBars);

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeElements,
        setupEventListeners,
        initializeCharts,
        hideLoadingOverlay,
        toggleTheme,
        toggleProfileDropdown,
        logout,
        showEditModal,
        changeProfilePhoto,
        uploadNewVideo,
        addNewPlayer,
        createTeamPerformanceChart,
        createPlayerDevelopmentChart,
        createTacticalEffectivenessChart,
        createMatchResultsChart,
        animateSkillBars
    };
}