export function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}
export function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}
export function setupModalEventListeners() {
    document.addEventListener('DOMContentLoaded', () => {
        const openModalButtons = document.querySelectorAll('[data-modal]');
        openModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modalId = button.getAttribute('data-modal');
                if (modalId) {
                    openModal(modalId);
                }
            });
        });
        const closeModalButtons = document.querySelectorAll('.modal .close');
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                const modal = button.closest('.modal');
                if (modal) {
                    closeModal(modal.id);
                }
            });
        });
    });
}
