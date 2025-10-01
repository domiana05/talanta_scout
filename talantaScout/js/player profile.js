// Enhanced Player Profile JavaScript with Charts
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
    const editPersonalBtn = document.getElementById('editPersonalBtn');
    const editFootballBtn = document.getElementById('editFootballBtn');
    
    if (editPersonalBtn) {
        editPersonalBtn.addEventListener('click', () => showEditModal('personal'));
    }
    
    if (editFootballBtn) {
        editFootballBtn.addEventListener('click', () => showEditModal('football'));
    }
    
    // Video upload
    const uploadVideo = document.querySelector('.upload-video');
    if (uploadVideo) {
        uploadVideo.addEventListener('click', uploadNewVideo);
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

function uploadNewVideo() {
    alert('Video upload functionality would be implemented here.');
}

function initializeCharts() {
    createSkillProgressionChart();
    createPerformanceTrendChart();
    createPhysicalAttributesChart();
    createGoalsAssistsChart();
}

function createSkillProgressionChart() {
    const ctx = document.getElementById('skillProgressionChart').getContext('2d');
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Passing',
                    data: [7.2, 7.5, 7.8, 7.9, 8.0, 8.1, 8.1],
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Shooting',
                    data: [6.5, 6.8, 7.0, 7.1, 7.1, 7.2, 7.2],
                    borderColor: '#FF9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Dribbling',
                    data: [6.2, 6.4, 6.5, 6.6, 6.7, 6.8, 6.8],
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
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
                    min: 5,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function createPerformanceTrendChart() {
    const ctx = document.getElementById('performanceTrendChart').getContext('2d');
    
    const matches = ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5', 'Match 6'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: matches,
            datasets: [{
                label: 'Match Rating',
                data: [7.2, 8.1, 6.8, 7.9, 8.5, 8.2],
                backgroundColor: [
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(244, 67, 54, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)',
                    'rgba(76, 175, 80, 0.7)'
                ],
                borderColor: [
                    'rgb(76, 175, 80)',
                    'rgb(76, 175, 80)',
                    'rgb(244, 67, 54)',
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
                    max: 10
                }
            }
        }
    });
}

function createPhysicalAttributesChart() {
    const ctx = document.getElementById('physicalAttributesChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Speed', 'Strength', 'Stamina', 'Agility', 'Jumping', 'Balance'],
            datasets: [{
                label: 'Current',
                data: [85, 70, 80, 75, 65, 80],
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                borderColor: 'rgb(76, 175, 80)',
                pointBackgroundColor: 'rgb(76, 175, 80)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(76, 175, 80)'
            }, {
                label: 'Target',
                data: [90, 80, 85, 85, 75, 85],
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

function createGoalsAssistsChart() {
    const ctx = document.getElementById('goalsAssistsChart').getContext('2d');
    
    const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: 'Goals',
                data: [2, 1, 3, 2, 1, 2, 1],
                backgroundColor: 'rgba(76, 175, 80, 0.7)',
                borderColor: 'rgb(76, 175, 80)',
                borderWidth: 1
            }, {
                label: 'Assists',
                data: [1, 2, 1, 1, 2, 0, 1],
                backgroundColor: 'rgba(255, 193, 7, 0.7)',
                borderColor: 'rgb(255, 193, 7)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
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
