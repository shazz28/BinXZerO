import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-4 shadow-lg`;
    alertDiv.style.zIndex = '2000';
    alertDiv.style.borderRadius = '0.5rem';
    alertDiv.style.maxWidth = '500px';
    alertDiv.innerHTML = `
        <div class="d-flex align-items-center p-3">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : 'exclamation-triangle'} me-3" style="font-size: 1.5rem;"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}

function showLoading() {
    const loadingHtml = `
        <div id="loadingOverlay" class="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style="background: rgba(0,0,0,0.7); z-index: 9999; backdrop-filter: blur(4px);">
            <div class="d-flex flex-column align-items-center gap-3">
                <div class="spinner-border" style="color: var(--primary-color); width: 3rem; height: 3rem;" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <span class="text-white" style="font-weight: 500;">Processing...</span>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHtml);
}

function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.transition = 'opacity 0.3s ease-out';
        setTimeout(() => loadingOverlay.remove(), 300);
    }
}

async function initLogout() {
    if (!window.apiKeys || !window.apiKeys.firebase) {
        console.error("API keys not loaded");
        showAlert('danger', 'Authentication service unavailable.');
        return;
    }

    try {
        const app = initializeApp(window.apiKeys.firebase);
        const auth = getAuth(app);

        let attempts = 0;
        let logoutButton = document.getElementById('logout-link');
        while (!logoutButton && attempts < 20) {
            await new Promise(resolve => setTimeout(resolve, 100));
            logoutButton = document.getElementById('logout-link') || document.querySelector('a[href*="/login.html"]');
            attempts++;
        }

        if (!logoutButton) {
            console.warn("Logout button/link not found after waiting.");
            showAlert('warning', 'Logout functionality unavailable. Please navigate to login page manually.');
            return;
        }

        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const existingModal = document.getElementById('logoutModal');
            if (existingModal) existingModal.remove();

            const modalHtml = `
                <div class="modal fade" id="logoutModal" tabindex="-1" aria-labelledby="logoutModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content card shadow-lg border-0" style="border-radius: 0.75rem; overflow: hidden;">
                            <div class="card-header d-flex align-items-center" style="background: linear-gradient(135deg, #28a745, #1e7e34); color: white; padding: 1.25rem;">
                                <i class="fas fa-sign-out-alt me-3" style="font-size: 1.5rem;"></i>
                                <h5 class="modal-title mb-0" id="logoutModalLabel">Confirm Logout</h5>
                                <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="card-body p-4">
                                <p class="mb-0 text-muted" style="line-height: 1.6;">Are you sure you want to log out of BinXZer0? This will end your current session.</p>
                            </div>
                            <div class="card-footer bg-light p-3 d-flex gap-2 justify-content-end border-top">
                                <button type="button" class="btn btn-danger" id="confirm-logout-btn" style="border-radius: 0.5rem; padding: 0.5rem 1.25rem;">
                                    <i class="fas fa-sign-out-alt me-1"></i>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', modalHtml);

            const logoutModalElement = document.getElementById('logoutModal');
            const logoutModal = new bootstrap.Modal(logoutModalElement, { backdrop: 'static', keyboard: false });
            logoutModal.show();

            document.getElementById('confirm-logout-btn').addEventListener('click', async () => {
                logoutModal.hide();
                showLoading();

                try {
                    await signOut(auth);
                    localStorage.clear();
                    showAlert('success', 'Successfully logged out!');
                    setTimeout(() => {
                        window.location.href = "/login.html";
                    }, 1000);
                } catch (error) {
                    console.error("Logout error:", error);
                    hideLoading();
                    showAlert('danger', `Logout failed: ${error.message}`);
                }
            });

            logoutModalElement.addEventListener('hidden.bs.modal', () => {
                logoutModalElement.remove();
            });
        });
    } catch (error) {
        console.error("Logout initialization failed:", error);
        showAlert('danger', 'Authentication service unavailable.');
    }
}

document.addEventListener('DOMContentLoaded', initLogout);