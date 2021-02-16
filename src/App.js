import './App.css';
import { BrowserRouter,Route,Switch} from "react-router-dom";
import AddUser from './AddUser'
import './firebase'
import Dashboard from './Dashboard'
import Transactions from './Transactions';
import Users from './Users';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Switch>
      <Route path="/adduser" exact component={AddUser}/>
      <Route path="/users" exact component={Users}/>
      <Route path="/" exact component={Dashboard}/>
      <Route path="/transactions" exact component={Transactions}/>
      </Switch>
      </BrowserRouter>
    </div>
  );
    }
export default App;
