/**esse é o código da seção 15 que vai explicar API. Está sendo reaproveitado o
 * código do PickPlacer (o site tipo airbnb) mas agora com o App adaptado para fazer
 * requerimentos. É preciso comandar o npm install, o npm run dev para rodar o App,
 * mas também abrir outro terminal, mudar para o cd backend e comandar node app.js
 * para ele rodar também o banco de dados, no meu, a conexão com o banco de dados
 * não está funcionando. De qualquer forma, o código já veio com
 * separação de pastas, com uma contendo o backend que é onde
 * estão os dados, para simular um banco de dados com acesso por API.
 */
/**No componente AvailablePlaces.jsx foi feito o código abaixo para acessar o
 * endpoint, aqui a lógica é controle o estado do array e usar a função async,
 * no entanto, ela não pode ser chamada diretamente, por isso é criada uma outra
 * função que vai conter a resposta do link e a resposta dos dados e vai atualizar
 * o estado com esse json. Mais abaixo é preciso chamar essa função. Reparar também
 * que tudo foi envelopado em um useEffect para evitar o loop infinito.
 */
export default function AvailablePlaces({ onSelectPlace }) {
    const [availablePlaces, setavailablePlaces] = useState ([]);
  
    useEffect(() => {
      async function fetchPlaces (){
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
        setavailablePlaces(resData.places);
      }
  
      fetchPlaces();
    }, []);

    /**Na aula 233 é criada a lógica para mostrar uma mensagem enquanto os dados
     * não são carregados. Primeiro são inseridas as duas variáveis abaixo
     * no return e elas são passadas como props no componente Places.jsx
     */
    isLoading={isFetching}
    loadingText="Fetching place data..."
/**então é criado o useState para controle de estado */
    export default function AvailablePlaces({ onSelectPlace }) {
      const [isFetching, setIsFetching] = useState(false);

    /**então esse estado controle de estado é inserido abaixo, ou seja,
     * é true antes dos dados serem recebidos e volta a ser false depois
      */

    useEffect(() => {
      async function fetchPlaces (){
        setIsFetching(true);
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
        setavailablePlaces(resData.places);
        setIsFetching(false);
      }
  
      fetchPlaces();
    }, []);

/**por fim, no Places.jsx é feita seguinte lógica para mostrar o componente condicionalmente
 * assim, se os dados ainda não foram atingidos, mostra o texto, se atingiu, mostra
 * o texto e os cards (não copiei o código todo aqui) 
  */

{isLoading && <p className="fallback-text">{loadingtext}</p>}
      {!isLoading && places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {!isLoading && places.length > 0 && 

/**Na aula 234 é incluído o código para lidar com erros, primeiro, um novo controle
 * de estado. Vale ressaltar q esses 3 controles, comumente, andam juntos, erro,
 * data e carregamento.
 */

const [error, setError] = useState();

/**Agora vou ter que copiar toda a parte do código atualizada com o try, catch,
 * o código tenta atingir os dados, se a resposta não for ok (o que entendi ser
 * uma sintaxe própria q já verifica se o http request deu 400 ou 500) joga
 * um novo Error (que é um elemento customizado nesse caso), então o catch vai lidar
 * com esse erro para que o código não quebre, exibindo a mensagem de erro ou
 * a outra mensagem padrão
 */

useEffect(() => {
  async function fetchPlaces (){
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:3000/places');
      const resData = await response.json();
    
      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }
    setavailablePlaces(resData.places);
  } catch (error){
    setError({
      message:
        error.message || 'Could not fetch places, please try again later'
    });
  }      
    setIsFetching(false);
  }

  fetchPlaces();
}, []);
/**esse último if é para atualizar a UX caso haja um erro, e utilizando
 * a mensagem acima definida
 */
if (error) {
  return <Error title="An error occured!" message={message.error}/>;
}

/**Na aula 235 foi inserido um código para arrumar (sort) os cards de
 * acordo com a localização do usuário (o que já foi feito antes), mas aqui
 * a lógica e cálculo está toda feitas em um arquivo chamado loc, assim,
 * a primeira linha são comandos built in do navegador e depois é inserida
 * a função importada do componente loc e os locais são então passados
 * para o setAvailablesPlaces já arrumados pela localização do usuário (é
 * aberta uma caixa pedindo autorização). A intenção aqui é mostrar que se pode
 * trabalhar a informação antes de exibi-la. Outra questão é que o setIsFetching(false)
 * foi trazido para o final desse código para ser chamado somente após essa função, ou seja,
 * ressaltando a importância de sabe onde localizar os itens para não serem chamados
 * antes da hora.
 */

navigator.geolocation.getCurrentPosition((position)=> {
  const sortedPlaces = sortPlacesByDistance(
    resData.places,
    position.coords.latitude,
    position.coords.longitude
  );
  setavailablePlaces(sortedPlaces);
  setIsFetching(false);
});

/**Na aula 236 o código é refatorado o código, é criado um novo componente http.js
 * e para lá é transportado o código, assim, no AvailablePlaces, o try fica conforme
 * abaixo, o que me pareceu mais limpo. 
*/

try {
  const places = await fetchAvailablePlaces();

  /**A aula 237 vai estabelecer o código que garante que o Card selecionado
   * seja comunicado ao backend. Assim no componente http.js, que me parece, vai conter
   * toda a lógica de protocolos de transmissão, foi inserido o código abaixo que
   * vai se comunicar com app.js do Backend onde há um código para o PUT, ou seja,
   * para criar um array e inserir (put) informações. Então a função asíncrona guarda
   * a variável abaixo q vai usar o método fetch (que não serve somente para atingir a 
   * informação, mas também para transmiti-la) e o resto dos dados são metadados adaptados
   * Valendo ressaltar que o places está nesse configuração pois o backend quer receber
   * um tipo de objeto chamado places e não diretamente os places...sei lá, mas deu
   * erro fazendo de outra maneira
   */

  export async function updateUserPlaces (places) {
    const response = await fetch ('http://localhost:3000/user-places', {
      method: 'PUT',
      body: JSON.stringify({places: places}),
      headers: {
        'Content-Type': 'aplication/json'
      }
    });
    /**aqui é o código para esperar a resposta da transmissão */
    const resData = await response.json();
  /**aqui é o código para caso dê erro na transmissão */
    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
  /**aqui é a resposta caso dê certo, pois no app.js do backend é setada 
   * uma resposta se o status da transmissão dor 200
   */
    return resData.message;
  }  

  /**no componente App.jsx (notar a diferença para o app.js q é do backend)
   * a função é chamada depois da função q lida com a seleção dos cards, 
   * valendo ressaltara q é preciso a sintaxe abaixo q está dentro do ([]) para 
   * garantir os locais selecionados sejam o da última seleção, o await significa
   * q o código vai esperar essa parte rodar antes de continuar e só foi possível
   * utilizá-lo pois a função principal está com um async, ou seja, é uma função
   * assíncrona e por isso pode-se pedir para esperar alguma ação acontecer antes
   * de continuar. 
   */

  try {
    await updateUserPlaces([selectedPlace, ...userPlaces])

  /**na aula 238 fala de optimistic updating, pois no caso da aula anterior, não
   * foi inserido uma código para controlar o loading, mas o estado foi atualizado
   * antes de mandar o requerimento de atualização. Assim, o catch q vem logo na sequencia
   * do try acima, simplesmente mantém o último estado caso a atualização falhe. Portanto
   * é uma opção à tela de loading. 
   */

  catch (error) {
    setUserPlaces(userPlaces);
  }
  
  /**Apesar de não ter q esperar a opção de loading, ainda é preciso lidar
   * com o possível erro, para isso, no App.jsx, foi incluído mais um controle de
   * estado
   */
  const [errorUpdatingPlaces, seterrorUpdatingPlaces] = useState();

  /**o catch foi então atualizado */

} catch (error) {
  setUserPlaces(userPlaces);
  seterrorUpdatingPlaces({message: error.message || 'Failed to update places.'});
}

/**Para mostrar o erro é inserido o modal abaixo no return do App e é criada a função
 * para fechá-lo
 */
/**função para mudar o estado e fechar o modal no close ou no botão */
function handleError() {
  seterrorUpdatingPlaces(null);
}
/**o Modal vai ser mostrado condicionalmente se o erro foir true, é necessária
 * essa lógica pois mesmo q o Modal só apareça se houver erro, ele já está no DOM
 * e tentará acessar o message imediatamente. 
 *  */
return (
  <>
    <Modal open={errorUpdatingPlaces} onClose={handleError}>
      {errorUpdatingPlaces && <Error title="An error occured!"
      message={errorUpdatingPlaces.message}
      onConfirm={handleError}/>}
    </Modal>

</>

/**Na aula 239 é incluído no App.js o código para deletar um card selecionado e 
 * isso será feito no código abaixo que volta um array igual o anterior, menos o item
 * selecionado
 */

const handleRemovePlace = useCallback(async function handleRemovePlace() {
  setUserPlaces((prevPickedPlaces) =>
    prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
  );

  /**também é adicionado o try/catch abaixo q tenta atualizar e, caso não consiga,
   * mantém o array anterior joga o código de erro.
   */
try
  {await updateUserPlaces (
      userPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );
  } catch (error) {
    setUserPlaces(userPlaces);
    seterrorUpdatingPlaces({message: error.mesage || 'Failed to delete place.'})
  }

/**o useCallback da função é atualizado então se o userPlaces (os locais selecionados)
 * for atualizado, para isso ele foi passado como dependência abaixo.
  */
  
  }, [userPlaces]);
/**Na aula 240 é inserido o código para usar os locais selecionados pelo usuário
 * e guardados no backend, ao invés de somente os locais disponíveis, sendo
 * a lógica quase a mesma. Assim, no http foi criada a função abaixo, cuja diferença
 * para a outra é o endpoint, ou seja, no backend já foi preparado um código para esse
 * endpoint
 */

export async function fetchUserPlaces(){
  const response = await fetch('http://localhost:3000/user-places');
  const resData = await response.json();
    
    if (!response.ok) {
      throw new Error('Failed to fetch user places');
    }

    return resData.places;
}
/**Já no App.jsx é incluída a função abaixo evelopada em um useEffect para
 * evitar o loop infinito, depois é definido o estado de setIsFetching para true, esse
 * estado é que determina se está tentando atingir os dados, o que serve para 
 * mostrar na tela a mensagem (como fosse um loading), então o try usa uma variável
 * para guardar o resultado da função q foi determinada no http (conforme acima)
 * e atualiza o estado do array places ou pega o erro no catch. Reparar que a função
 * tem que ser chamada na sequência.
 */

useEffect(() => {
  async function fetchPlaces(){
    setIsFetching(true);
    try {
    const places = await fetchUserPlaces();
    setUserPlaces(places);}
     catch (error) {
        setError({message: error.mesage || 'Failed to fetch user places.'})
    }
    setIsFetching(false);
  }
  fetchPlaces();
}, []);
