// player-statistics.js
// Statistics page specific functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize statistics page
    initStatisticsPage();
    
    // Set up period filter
    const statsPeriod = document.getElementById('statsPeriod');
    if (statsPeriod) {
        statsPeriod.addEventListener('change', function() {
            updateStatisticsData(this.value);
        });
    }
});

function initStatisticsPage() {
    // Load statistics data
    loadStatisticsData();
    
    // Set up upgrade button
    const upgradeBtn = document.getElementById('upgradeBtn');
    if (upgradeBtn) {
        upgradeBtn.addEventListener('click', function() {
            const upgradeModal = document.getElementById('upgradeModal');
            if (upgradeModal) {
                upgradeModal.classList.add('active');
            }
        });
    }
}

function loadStatisticsData() {
    // In a real application, this would fetch data from an API
    console.log('Loading statistics data...');
    
    // Update overview cards with animated counting
    const stats = {
        appearances: 45,
        goals: 12,
        assists: 8,
        minutes: 3240
    };
    
    // Animate the numbers
    animateNumber(document.getElementById('totalAppearances'), 0, stats.appearances);
    animateNumber(document.getElementById('totalGoals'), 0, stats.goals);
    animateNumber(document.getElementById('totalAssists'), 0, stats.assists);
    animateNumber(document.getElementById('totalMinutes'), 0, stats.minutes);
}

function updateStatisticsData(period) {
    // Update statistics based on selected period
    console.log('Updating statistics for period:', period);
    
    // Show loading state
    // In a real app, this would fetch new data from the server
    setTimeout(() => {
        // Update metrics based on period
        const metrics = document.querySelectorAll('.metric-value');
        if (metrics.length > 0) {
            // Simulate data update
            metrics.forEach(metric => {
                const currentValue = parseInt(metric.textContent);
                const change = Math.floor(Math.random() * 5) - 2; // Random change between -2 and +2
                const newValue = Math.max(0, currentValue + change);
                metric.textContent = newValue + '%';
                
                // Update progress bar
                const progressBar = metric.nextElementSibling.querySelector('.progress-fill');
                if (progressBar) {
                    progressBar.style.width = newValue + '%';
                }
            });
        }
    }, 500);
}

function animateNumber(element, start, end, duration = 1000) {
    if (!element) return;
    
    const startTime = performance.now();
    const difference = end - start;

    const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (difference * easeOutQuart));
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };
    
    requestAnimationFrame(step);
}