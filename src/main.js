import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

async function populateSectionProducts() {
    const products = await fetchProductsList('computador');
    products.forEach((product) => {
        const sectionProducts = document.querySelector('section.products');
        const newElement = createProductElement(product);
        sectionProducts.appendChild(newElement);
    });
}

populateSectionProducts();