import { searchCep } from './helpers/cepFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { saveCartID } from './helpers/cartFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Seletores globais
const sectionProducts = document.querySelector('section.products');

// Mostra mensagens de aviso na página
function displayLoadingText() {
  const span = document.createElement('span');
  sectionProducts.appendChild(span);

  const loadingSpan = sectionProducts.lastChild;
  loadingSpan.textContent = 'carregando...';
  loadingSpan.classList.add('loading');
}

const hideLoadingText = () => document.querySelector('.loading').remove();

function displayErrorText(errorMessage) {
  const span = document.createElement('span');
  sectionProducts.appendChild(span);

  const errorSpan = sectionProducts.lastChild;
  errorSpan.textContent = errorMessage;
  errorSpan.classList.add('error');
}

// Adiciona produtos ao carrinho de compras
async function addProductToCart(id) {
  const productData = await fetchProduct(id);
  const newProduct = createCartProductElement(productData);

  const cartProducts = document.querySelector('.cart__products');
  cartProducts.appendChild(newProduct);
}

// Popula a página com os produtos
function createProduct(product) {
  const newElement = createProductElement(product);
  sectionProducts.appendChild(newElement);

  const buttonProductAdd = sectionProducts.lastChild.lastChild;

  buttonProductAdd.addEventListener('click', () => {
    saveCartID(product.id);
    addProductToCart(product.id);
  });
}

async function getProductsList(searchTerm) {
  const products = await fetchProductsList(searchTerm)
    .catch(() => {
      displayErrorText('Algum erro ocorreu, recarregue a página e tente novamente');
    });
  return products;
}

async function populateSectionProducts(searchTerm) {
  const products = await getProductsList(searchTerm);
  products.forEach((product) => createProduct(product));
  hideLoadingText();
}

// Chama as funções
if (sectionProducts.children.length < 1) {
  displayLoadingText();
}

populateSectionProducts('computador');
