import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import SignUp from './components/SignUpPage/SignUp';
import ItemShow from "./components/Items/ItemShow";
import Cart from "./components/CartItems/CartItems"
import Review from './components/Review/Review';
import {Switch, Route} from 'react-router-dom';
import ReactGA from 'react-ga';

const TRACKING_ID = "428252056"; 
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route exact path="/" component={HomePage}></Route>
        <Route exact path="/items/:itemId" component={ItemShow}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/items/:itemId/review" component={Review}></Route>
      </Switch>
    </>
  );
}

export default App;