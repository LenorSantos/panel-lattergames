import { modules } from "./modules/index.";
import './styles/_main.css';

function App() {
  return (
    <div className="App">
      <h1 className="headerText">Painel de controle</h1>
      {/* Datetime */}
      <modules.Datetime />

      {/* promo */}
      <modules.Promo />

      <div className="line"></div>

      {/* inicio news */}
      <modules.News />
    </div>
  );
}

export default App;
