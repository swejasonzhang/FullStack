import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import SignUp from './components/SignUpPage/SignUp';
import {Switch, Route} from 'react-router-dom';
import ItemDisplay from "./components/Items/ItemDisplay";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/" component={HomePage}></Route>
        <Route exact path="/items/:itemId" component={ItemDisplay} />
      </Switch>
    </>
  );
}

export default App;
