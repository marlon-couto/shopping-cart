import { getSavedCartIDs, saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

// Seletores DOM
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

// Remove mensagem de carregamento
const hideLoadingText = () => document.querySelector('.loading').remove();

// Calcula o valor total do carrinho
async function getPrices() {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

  if (cartProducts.length !== 0) {
    const prices = await Promise.all(cartProducts.map(async (cartProduct) => {
      const productPrice = (await fetchProduct(cartProduct)).price;
      return productPrice;
    }));

    const total = prices.reduce((acc, cur) => acc + cur);

    return total.toFixed(2);
  }

  return 0;
}

function setTotal(total) {
  const totalPrice = document.querySelector('.total-price');
  totalPrice.textContent = total;

  localStorage.setItem('cartTotal', total);
}

// Atualiza o carrinho de compras
async function updateTotal() {
  const total = await getPrices();
  setTotal(total);
}

function updateOnRemove() {
  const cartProducts = document.querySelectorAll('.cart__product');

  cartProducts.forEach((cartProduct) => {
    cartProduct.addEventListener('click', async () => {
      updateTotal();
    });
  });
}

async function addProductToCart(product) {
  const newProduct = createCartProductElement(product);

  const cartProducts = document.querySelector('.cart__products');

  cartProducts.appendChild(newProduct);

  updateTotal();
  updateOnRemove();
}

// Adiciona produtos à página
function createProduct(product) {
  const newElement = createProductElement(product);
  sectionProducts.appendChild(newElement);

  const buttonProductAdd = sectionProducts.lastChild.lastChild;

  buttonProductAdd.addEventListener('click', async () => {
    const productData = await fetchProduct(product.id);
    saveCartID(product.id);
    addProductToCart(productData);
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

// Restaura o carrinho do Local Storage
function restoreCart() {
  const savedProducts = getSavedCartIDs();

  const promises = savedProducts.map((savedProduct) => fetchProduct(savedProduct));

  Promise.all(promises).then((values) => {
    values.forEach((value) => {
      addProductToCart(value);
    });
  });
}

const restoreCartTotal = () => setTotal(localStorage.getItem('cartTotal'));

// Chama as funções
if (sectionProducts.children.length < 1) {
  displayLoadingText();
}

populateSectionProducts('computador');

if (localStorage.getItem('cartProducts')) {
  restoreCart();
  restoreCartTotal();
}
