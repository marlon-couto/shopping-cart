import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Seletores globais
const sectionProducts = document.querySelector('section.products');

// Mostra mensagens de aviso na página
function createSpan() {
  const span = document.createElement('span');
  sectionProducts.appendChild(span);
}

function displayLoadingText() {
  createSpan();

  const loadingSpan = sectionProducts.lastChild;

  loadingSpan.textContent = 'carregando...';
  loadingSpan.classList.add('loading');
}

function displayErrorText(errorMessage) {
  createSpan();

  const errorSpan = sectionProducts.lastChild;

  errorSpan.textContent = errorMessage;
  errorSpan.classList.add('error');
}

const hideLoadingText = () => document.querySelector('.loading').remove();

// Adiciona produtos ao carrinho de compras
async function addProductToCart(product) {
  const newProduct = createCartProductElement(product);
  const cartProducts = document.querySelector('.cart__products');

  cartProducts.appendChild(newProduct);
}

// Adiciona produtos à página
function createProduct(product) {
  const newElement = createProductElement(product);
  sectionProducts.appendChild(newElement);

  const buttonProductAdd = sectionProducts.lastChild.lastChild;

  buttonProductAdd.addEventListener('click', async () => {
    const productData = await fetchProduct(product.id);
    addProductToCart(productData);
    saveCartID(product.id);
  });
}

// Popula a página com os produtos
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

// Restaura o Local Storage
function restoreCart() {
  const savedProducts = getSavedCartIDs();

  const promises = savedProducts.map((savedProduct) => fetchProduct(savedProduct));

  Promise.all(promises).then((values) => {
    values.forEach((value) => {
      addProductToCart(value);
    });
  });
}

// Chama as funções
if (sectionProducts.children.length < 1) {
  displayLoadingText();
}

populateSectionProducts('computador');

if (localStorage.getItem('cartProducts')) {
  restoreCart();
}
