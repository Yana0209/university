
export function setupSmoothScroll(): void {
    const navLinks = document.querySelectorAll('#nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event: Event) => {
            event.preventDefault();
            const targetId = (event.currentTarget as HTMLAnchorElement).getAttribute('href');
            if (targetId) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}
