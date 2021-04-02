import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home/Home';
import Orders from './components/Orders/Orders'
import Admin from './components/Admin/Admin'
import Deals from './components/Deals/Deals'
import Login from './components/Login/Login'
import { createContext, useState } from 'react';
import Welcome from './components/Welcome/Welcome';
import Profile from './components/Profile/Profile';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Cart from './components/Cart/Cart';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {

  const [authentication, setAuthentication] = useState({
    loggedIn: false,
    email: '',
    displayName: '',
    photoUrl: ''
  });

  const [cartItems, setCartItems] = useState([])

  return (
    <UserContext.Provider value={[authentication, setAuthentication, cartItems, setCartItems]}>
      <Router>
        <Switch>

          <Route path="/home">
            <Home />
          </Route>

          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>

          <Route path="/admin">
            <Admin />
          </Route>

          <Route path="/deals">
            <Deals />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>

          <Route path="/create-account">
            <CreateAccount />
          </Route>

          <PrivateRoute path="/cart">
            <Cart />
          </PrivateRoute>

          <Route exact path="/">
            <Welcome />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
