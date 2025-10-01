// Player Settings JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize settings page
    initSettingsPage();
    
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.display = 'none';
    }, 1000);
});

function initSettingsPage() {
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
    
    // Password Strength Indicator
    const newPassword = document.getElementById('newPassword');
    const passwordStrength = document.getElementById('passwordStrength');
    const passwordStrengthText = document.getElementById('passwordStrengthText');
    
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
        if (button.id.includes('cancel')) {
            button.addEventListener('click', function() {
                if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
                    window.location.reload();
                }
            });
        }
    });
    
    // Reset Preferences
    const resetPreferencesBtn = document.getElementById('resetPreferencesBtn');
    resetPreferencesBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to reset all preferences to default values?')) {
            const checkboxes = document.querySelectorAll('#preferences-tab input[type="checkbox"]');
            const selects = document.querySelectorAll('#preferences-tab select');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            
            selects.forEach(select => {
                select.selectedIndex = 0;
            });
            
            // Keep dark mode as is
            document.getElementById('darkMode').checked = document.documentElement.getAttribute('data-theme') === 'dark';
            
            showToast('Preferences reset to defaults!');
        }
    });
    
    // Upgrade Plan
    const upgradeBtns = document.querySelectorAll('#upgradeBtn, #upgradePlanBtn');
    const upgradeModal = document.getElementById('upgradeModal');
    const closeUpgradeModal = document.getElementById('closeUpgradeModal');
    
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
    
    deleteAccountBtn.addEventListener('click', function() {
        deleteAccountModal.style.display = 'flex';
    });
    
    closeDeleteModal.addEventListener('click', function() {
        deleteAccountModal.style.display = 'none';
    });
    
    cancelDeleteBtn.addEventListener('click', function() {
        deleteAccountModal.style.display = 'none';
    });
    
    deleteConfirmation.addEventListener('input', function() {
        confirmDeleteBtn.disabled = this.value !== 'DELETE';
    });
    
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
    
    // Verify Email and Phone
    const verifyEmailBtn = document.getElementById('verifyEmailBtn');
    const verifyPhoneBtn = document.getElementById('verifyPhoneBtn');
    
    verifyEmailBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
            this.innerHTML = 'Verify Email';
            showToast('Verification email sent! Please check your inbox.');
        }, 1500);
    });
    
    verifyPhoneBtn.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        setTimeout(() => {
            this.innerHTML = 'Verify Phone';
            showToast('Verification code sent to your phone!');
        }, 1500);
    });
    
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
        
        if (e.target === deleteAccountModal) {
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
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    const toastClose = document.getElementById('toastClose');
    
    // Update message and type
    toastMessage.textContent = message;
    
    // Update icon based on type
    const toastIcon = toast.querySelector('.toast-icon');
    if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon error';
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