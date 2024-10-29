var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://jsonplaceholder.typicode.com/posts');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            const dataContainer = document.getElementById('data-container');
            if (dataContainer) {
                data.forEach((post) => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post');
                    postElement.innerHTML = `<h2>${post.title}</h2><p>${post.body}</p>`;
                    dataContainer.appendChild(postElement);
                });
            }
        }
        catch (error) {
            console.error('Error fetching data:', error);
        }
    });
}
