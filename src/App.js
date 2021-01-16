import './App.css';
import { BrowserRouter } from "react-router-dom";
import Route from "./router";
import { Typography } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      {/* <Typography variant="h4">TIC TAC TOE</Typography> */}
      <BrowserRouter>
        <Route />
      </BrowserRouter>
    </div>
  );
}

export default App;
