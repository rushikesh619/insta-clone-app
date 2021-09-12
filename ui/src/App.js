import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" component={LoginPage} />
      </Switch>
    </main>
  );
}

export default App;
