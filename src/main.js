import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

function createProduct(product) {
  const sectionProducts = document.querySelector('section.products');
  const newElement = createProductElement(product);
  sectionProducts.appendChild(newElement);
}

async function populateSectionProducts() {
  const products = await fetchProductsList('computador');
  products.forEach((product) => createProduct(product));
}

populateSectionProducts();
