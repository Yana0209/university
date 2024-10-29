
export function openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

export function closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

export function setupModalEventListeners(): void {
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
