import { setupSmoothScroll } from './modules/navigation/navigation.js';
import { setupModalEventListeners } from './modules/modal/modal.js';
import { fetchData } from './modules/fetchData/fetchData.js';
setupSmoothScroll();
setupModalEventListeners();
fetchData();
