export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (searchTerm) => {
  if (!searchTerm) {
    throw new Error('Termo de busca não informado');
  }
  const url = 'https://api.mercadolibre.com/sites/MLB/search?q='
  const response = await fetch(`${url}${searchTerm}`);
  const data = await response.json();
  return data.results;
};
