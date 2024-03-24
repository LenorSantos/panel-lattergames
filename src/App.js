import Datetime from "./modules/datetime";
import News from "./modules/news";
import Promo from "./modules/promo";
import './styles/_main.css';

function App() {
  return (
    <div className="App">
      <h1 className="headerText">Painel de controle</h1>
      {/* Datetime */}
      <Datetime />

      {/* promo */}
      <Promo />

      <div className="line"></div>

      {/* inicio news */}
      <News />
    </div>
  );
}

export default App;
