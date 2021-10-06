import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Chat from "./pages/chat/Chat";

export default function RouterComponent(params) {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>

        <Route path='/chat'>
          <Chat />
        </Route>
      </Switch>
    </Router>
  );
}
