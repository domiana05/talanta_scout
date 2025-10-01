// Coach Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings page
    initCoachSettingsPage();
    
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 1000);
});

function initCoachSettingsPage() {
    // Tab Navigation
    const navItems = document.querySelectorAll('.settings-nav-item');
    const tabs = document.querySelectorAll('.settings-tab');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab') + '-tab';
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.id === tabId) {
                    tab.classList.add('active');
                }
            });
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = this.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        showToast('Theme updated successfully!');
    });
    
    // Profile Photo Upload
    const photoUpload = document.getElementById('photoUpload');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
    const removePhotoBtn = document.getElementById('removePhotoBtn');
    const profilePhoto = document.getElementById('profilePhoto');
    const photoPreview = document.querySelector('.photo-preview');
    
    uploadPhotoBtn.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoPreview.addEventListener('click', function() {
        photoUpload.click();
    });
    
    photoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                profilePhoto.src = event.target.result;
                showToast('Profile photo updated successfully!');
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    removePhotoBtn.addEventListener('click', function() {
        profilePhoto.src = 'https://via.placeholder.com/150';
        showToast('Profile photo removed!');
    });
    
    // Team Logo Upload
    const logoUpload = document.getElementById('logoUpload');
    const uploadLogoBtn = document.getElementById('uploadLogoBtn');
    const removeLogoBtn = document.getElementById('removeLogoBtn');
    const teamLogoPreview = document.getElementById('teamLogoPreview');
    const logoPreview = document.querySelector('.logo-preview');
    
    uploadLogoBtn.addEventListener('click', function() {
        logoUpload.click();
    });
    
    logoPreview.addEventListener('click', function() {
        logoUpload.click();
    });
    
    logoUpload.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(event) {
                teamLogoPreview.src = event.target.result;
                showToast('Team logo updated successfully!');
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });
    
    removeLogoBtn.addEventListener('click', function() {
        teamLogoPreview.src = 'https://via.placeholder.com/100';
        showToast('Team logo removed!');
    });
    
    // Team Color Picker
    const primaryColor = document.getElementById('primaryColor');
    const secondaryColor = document.getElementById('secondaryColor');
    
    primaryColor.addEventListener('change', function() {
        document.documentElement.style.setProperty('--primary-color', this.value);
        showToast('Primary color updated!');
    });
    
    secondaryColor.addEventListener('change', function() {
        document.documentElement.style.setProperty('--secondary-color', this.value);
        showToast('Secondary color updated!');
    });
    
    // Staff Management
    const addStaffBtn = document.getElementById('addStaffBtn');
    const staffItems = document.querySelectorAll('.staff-item');
    
    addStaffBtn.addEventListener('click', function() {
        showToast('Add staff functionality would open a form here');
        // In a real implementation, this would open a modal or form
        // to add new staff members
    });
    
    staffItems.forEach(item => {
        const editBtn = item.querySelector('.btn-icon:first-child');
        const deleteBtn = item.querySelector('.btn-icon:last-child');
        
        editBtn.addEventListener('click', function() {
            showToast('Edit staff functionality would open here');
        });
        
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this staff member?')) {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.remove();
                    showToast('Staff member removed successfully');
                }, 300);
            }
        });
    });
    
    // Scouting Criteria Weight Sliders
    const criteriaSliders = document.querySelectorAll('.criteria-item input[type="range"]');
    
    criteriaSliders.forEach(slider => {
        const valueDisplay = slider.parentElement.querySelector('.weight-value');
        
        // Update display on input
        slider.addEventListener('input', function() {
            valueDisplay.textContent = this.value + '%';
            updateTotalWeight();
        });
        
        // Initialize display
        valueDisplay.textContent = slider.value + '%';
    });
    
    // Update total weight and adjust if needed
    function updateTotalWeight() {
        let total = 0;
        criteriaSliders.forEach(slider => {
            total += parseInt(slider.value);
        });
        
        // If total is not 100%, show a warning
        if (total !== 100) {
            document.querySelector('.criteria-weight').style.border = '1px solid var(--warning-color)';
        } else {
            document.querySelector('.criteria-weight').style.border = '1px solid var(--border-color)';
        }
    }
    
    // Password Strength Indicator
    const newPassword = document.getElementById('newPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordStrengthText = document.getElementById('passwordStrengthText');
    
    if (newPassword) {
        newPassword.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            let text = 'Password Strength';
            
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
            if (password.match(/\d/)) strength += 1;
            if (password.match(/[^a-zA-Z\d]/)) strength += 1;
            
            // Update strength indicator
            passwordStrength.className = 'strength-fill';
            
            if (password.length === 0) {
                text = 'Password Strength';
            } else if (strength <= 1) {
                passwordStrength.classList.add('weak');
                text = 'Weak Password';
            } else if (strength <= 3) {
                passwordStrength.classList.add('medium');
                text = 'Medium Password';
            } else {
                passwordStrength.classList.add('strong');
                text = 'Strong Password';
            }
            
            passwordStrengthText.textContent = text;
        });
    }
    
    // Save Buttons
    const saveButtons = document.querySelectorAll('.btn-primary[id^="save"]');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simulate saving
            const saveText = this.textContent;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = saveText;
                this.disabled = false;
                showToast('Settings saved successfully!');
            }, 1500);
        });
    });
    
    // Cancel Buttons
    const cancelButtons = document.querySelectorAll('.btn-secondary[id$="Btn"]');
    cancelButtons.forEach(button => {
        if (button.id.includes('cancel') && !button.id.includes('delete')) {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                    window.location.reload();
                }
            });
        }
    });
    
    // Reset Buttons
    const resetButtons = document.querySelectorAll('.btn-secondary[id^="reset"]');
    resetButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all settings to default values?')) {
                const tabId = this.closest('.settings-tab').id;
                resetTabToDefaults(tabId);
                showToast('Settings reset to defaults!');
            }
        });
    });
    
    // Reset tab to default values
    function resetTabToDefaults(tabId) {
        const tab = document.getElementById(tabId);
        const checkboxes = tab.querySelectorAll('input[type="checkbox"]');
        const selects = tab.querySelectorAll('select');
        const inputs = tab.querySelectorAll('input[type="text"], input[type="number"], input[type="email"], input[type="tel"]');
        const textareas = tab.querySelectorAll('textarea');
        
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
        
        inputs.forEach(input => {
            if (input.type !== 'password') {
                input.value = '';
            }
        });
        
        textareas.forEach(textarea => {
            textarea.value = '';
        });
        
        // Keep dark mode as is
        const darkModeCheckbox = document.getElementById('darkMode');
        if (darkModeCheckbox) {
            darkModeCheckbox.checked = document.documentElement.getAttribute('data-theme') === 'dark';
        }
    }
    
    // Upgrade Plan
    const upgradeBtns = document.querySelectorAll('#upgradeBtn, #upgradePlanBtn');
    const upgradeModal = document.getElementById('upgradeModal');
    const closeUpgradeModal = document.getElementById('upgradeModalClose');
    
    upgradeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            upgradeModal.style.display = 'flex';
        });
    });
    
    closeUpgradeModal.addEventListener('click', function() {
        upgradeModal.style.display = 'none';
    });
    
    // Delete Account
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const deleteAccountModal = document.getElementById('deleteAccountModal');
    const closeDeleteModal = document.getElementById('closeDeleteModal');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const deleteConfirmation = document.getElementById('deleteConfirmation');
    
    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', function() {
            deleteAccountModal.style.display = 'flex';
        });
    }
    
    if (closeDeleteModal) {
        closeDeleteModal.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    }
    
    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', function() {
            deleteAccountModal.style.display = 'none';
        });
    }
    
    if (deleteConfirmation) {
        deleteConfirmation.addEventListener('input', function() {
            confirmDeleteBtn.disabled = this.value !== 'DELETE';
        });
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            if (confirmDeleteBtn.disabled) return;
            
            // Simulate account deletion
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Deleting...';
            
            setTimeout(() => {
                showToast('Account deleted successfully!', 'error');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 2000);
        });
    }
    
    // Verify Email and Phone
    const verifyEmailBtn = document.getElementById('verifyEmailBtn');
    const verifyPhoneBtn = document.getElementById('verifyPhoneBtn');
    
    if (verifyEmailBtn) {
        verifyEmailBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                this.innerHTML = 'Verify Email';
                showToast('Verification email sent! Please check your inbox.');
            }, 1500);
        });
    }
    
    if (verifyPhoneBtn) {
        verifyPhoneBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            setTimeout(() => {
                this.innerHTML = 'Verify Phone';
                showToast('Verification code sent to your phone!');
            }, 1500);
        });
    }
    
    // Data Management
    const exportDataBtn = document.getElementById('exportDataBtn');
    const clearTrainingBtn = document.getElementById('clearTrainingBtn');
    
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
            
            setTimeout(() => {
                this.innerHTML = 'Export Data';
                showToast('Data export started! You will receive an email with your data shortly.');
            }, 2000);
        });
    }
    
    if (clearTrainingBtn) {
        clearTrainingBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear all training data? This action cannot be undone.')) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Clearing...';
                
                setTimeout(() => {
                    this.innerHTML = 'Clear Training Data';
                    showToast('Training data cleared successfully!');
                }, 2000);
            }
        });
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.getElementById('sidebar');
    
    mobileMenuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });
    
    // Profile Dropdown
    const profileBtn = document.getElementById('profileBtn');
    const profileDropdown = document.getElementById('profileDropdown');
    
    profileBtn.addEventListener('click', function() {
        profileDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
        
        // Close modals when clicking outside
        if (e.target === upgradeModal) {
            upgradeModal.style.display = 'none';
        }
        
        if (deleteAccountModal && e.target === deleteAccountModal) {
            deleteAccountModal.style.display = 'none';
        }
    });
    
    // Logout functionality
    const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutDropdownBtn');
    
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to logout?')) {
                document.getElementById('loadingOverlay').style.display = 'flex';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    });
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    const themeIcon = themeToggle.querySelector('i');
    themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Toast Notification Function
function showToast(message, type = 'success') {
    // Create toast if it doesn't exist
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'toast';
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-check-circle toast-icon"></i>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.body.appendChild(toast);
    }
    
    const toastMessage = toast.querySelector('.toast-message');
    const toastClose = toast.querySelector('.toast-close');
    const toastIcon = toast.querySelector('.toast-icon');
    
    // Update message and type
    toastMessage.textContent = message;
    
    // Update icon based on type
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon error';
    } else if (type === 'warning') {
        toastIcon.className = 'fas fa-exclamation-triangle toast-icon warning';
    } else {
        toastIcon.className = 'fas fa-check-circle toast-icon';
    }
    
    // Show toast
    toast.classList.add('show');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
    
    // Close button
    toastClose.addEventListener('click', function() {
        toast.classList.remove('show');
    });
}