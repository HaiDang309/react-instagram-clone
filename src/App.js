import "./App.css";

import { Layout,} from "antd";

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Posts';
import Login from './container/Login';
import Register from './container/Register';
import Profile from './components/Profile';
import EditProfile from './components/Profile/EditProfile';

function App() {
  const isAuth = window.localStorage.getItem('isAuth');
  return (
    <div className="app">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={isAuth ? Home : Login} />
            <Route exact path="/sign-up" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/edit" component={isAuth ? EditProfile : Login} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
