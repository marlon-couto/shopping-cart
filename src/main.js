import { searchCep } from './helpers/cepFunctions';
import { createProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import './style.css';

const sectionProducts = document.querySelector('section.products');

document.querySelector('.cep-button').addEventListener('click', searchCep);

function createLoadingText() {
  const span = document.createElement('span');
  sectionProducts.appendChild(span);
  const loadingSpan = sectionProducts.lastChild;
  loadingSpan.textContent = 'carregando...';
  loadingSpan.classList.add('loading');
}

const removeLoadingText = () => document.querySelector('.loading').remove();

function createErrorText(errorMessage) {
  const span = document.createElement('span');
  sectionProducts.appendChild(span);
  const errorSpan = sectionProducts.lastChild;
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add('error');
}

function createProduct(product) {
  const newElement = createProductElement(product);
  sectionProducts.appendChild(newElement);
}

async function populateSectionProducts(searchTerm) {
  const products = await fetchProductsList(searchTerm)
    .catch(() => {
      createErrorText('Algum erro ocorreu, recarregue a página e tente novamente');
    });
  products.forEach((product) => createProduct(product));
  removeLoadingText();
}

if (sectionProducts.children.length < 1) {
  createLoadingText();
}

populateSectionProducts('computador');
