import './App.css';
import { BrowserRouter } from "react-router-dom";
import Route from "./router";
import "./assets/style/custom.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
