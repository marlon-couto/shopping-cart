export const getAddress = async (postalCode) => {
  const url1 = `https://cep.awesomeapi.com.br/json/${postalCode}`;
  const url2 = `https://brasilapi.com.br/api/cep/v2/${postalCode}`;

  const response = await Promise.any([fetch(url1), fetch(url2)]);
  const data = await response.json();

  return data;
};

export const searchCep = () => {
  const postalCode = document.querySelector('.cep-input').value;
  const cartAdress = document.querySelector('.cart__address');

  getAddress(postalCode)
    .then((data) => {
      const { address, district, city, state } = data;
      cartAdress.textContent = `${address} - ${district} - ${city} - ${state}`;
    })
    .catch(() => {
      cartAdress.textContent = 'CEP não encontrado';
    });
};
