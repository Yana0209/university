import { Post } from '../types/dataTypes';

export async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        const dataContainer = document.getElementById('data-container');
        if (dataContainer) {
            data.forEach((post: Post) => {
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
