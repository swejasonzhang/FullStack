import SignUp from './components/SignUpPage/SignUp';
import {Switch, Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        {/* <Route path="/login" component={LoginPage}></Route> */}
        <Route path="/signup" component={SignUp}>
          <SignUp/>
        </Route>
        {/* <Route path="/" component={HomePage}></Route> */}
      </Switch>
    </>
  );
}

export default App;
