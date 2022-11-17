import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });

  it('fetch é chamado ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toBeCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProduct', async () => {
    await fetchProduct('MLB1405519561');
    const endpoint = 'https://api.mercadolibre.com/items/MLB1405519561';
    expect(fetch).toBeCalledWith(endpoint);
  });

  it('fetchProduct retorna a estrutura de dados correta ao receber o argumento "MLB1405519561"', async () => {
    const data = await fetchProduct('MLB1405519561');
    expect(data).toEqual(product);
  });

  it('fetchProduct retorna um erro com a mensagem "ID não informado" ao ser chamada sem argumentos', () => {
    const regex = /^ID não informado$/;
    expect(fetchProduct()).rejects.toThrow(regex);
  });
});
