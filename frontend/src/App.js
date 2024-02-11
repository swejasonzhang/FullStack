import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import SignUp from './components/SignUpPage/SignUp';
import ItemShow from "./components/Items/ItemShow";
import Cart from "./components/CartItems/CartItems"
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/items/:itemId" component={ItemShow}></Route>
        <Route exact path="/cart" component={Cart}></Route>
      </Switch>
    </>
  );
}

export default App;
