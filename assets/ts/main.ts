
// Smooth transition to sections
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

// Function to open the modal window
function openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block'; // Відкрити модальне вікно
    }
}

// Function to close the modal window
function closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none'; // Закрити модальне вікно
    }
}

// Event listeners for modals
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



// Fetch data and display it
async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataContainer = document.getElementById('data-container');
        if (dataContainer) {
            data.forEach((post: { title: string; body: string }) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                dataContainer.appendChild(postElement);
            });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Call the fetchData function
fetchData();
