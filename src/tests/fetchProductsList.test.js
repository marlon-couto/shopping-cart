import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function');
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toBeCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toBeCalledWith(endpoint);
  });

  it('fetchProductsList retorna a estrutura de dados correta ao receber o argumento "computador"', async () => {
    const data = await fetchProductsList('computador');
    expect(data).toEqual(computadorSearch);
  });

  it('fetchProductsList retorna um erro com a mensagem "Termo de busca não informado" ao ser chamada sem argumentos', () => {
    const regex = /^Termo de busca não informado$/;
    expect(fetchProductsList()).rejects.toThrow(regex);
  });
});
