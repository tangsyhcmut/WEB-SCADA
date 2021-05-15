import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from "./Component/Pages/Dashboard";
import Home from "./Component/Pages/Home";
import Landing from './Component/Pages/Landing';
import PowerandTem from "./Component/Pages/PowerandTem";
import Report from "./Component/Pages/Report";
import ProtectedRoute from './Component/routing/ProtectedRoute';
import PlanConTextProvider from './context/PlanContext'
import AuthContextProvider from './context/AuthContext';
import Auth from './Features/Auth/Auth';
import PlanForm from './Component/TodoForm/PlanForm'
import Test from './Component/TemperatureSection/Temperature'



function App() {
  
 
  return (
    <AuthContextProvider>
      <PlanConTextProvider>
      <Router>
    
      <Switch>
      <Route exact path='/' component={Landing} />
						<Route
							exact
							path='/login'
							render={props => <Auth {...props} authRoute='login' />}
						/>
						<Route
							exact
							path='/register'
							render={props => <Auth {...props} authRoute='register' />}
						/>
        <ProtectedRoute  exact path ='/home' exact component ={Home} />
        <ProtectedRoute  exact path ='/dashboard' component ={Dashboard} />
        <ProtectedRoute exact path='/test' component={Test} />
        
        <ProtectedRoute  exact path ='/P-T' exact component ={PowerandTem} />
        
        <ProtectedRoute  exact path ='/report' exact component ={Report} />
        
      </Switch>
    </Router>
    </PlanConTextProvider>

   </AuthContextProvider>
      
  );
}

export default App;
