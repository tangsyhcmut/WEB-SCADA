import firebase from 'firebase';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './Component/Pages/Landing';
import Auth from './Features/Auth/Auth'
import AuthContextProvider from './context/AuthContext'
import Dashboard from "./Component/Pages/Dashboard";
import Home from "./Component/Pages/Home";
import Report from "./Component/Pages/Report";
import PowerandTem from "./Component/Pages/PowerandTem";
import {useEffect} from 'react';
import ProtectedRoute from './Component/routing/ProtectedRoute'
import Test from './Component/test/test'



function App() {
  
 
  return (
    <AuthContextProvider>
      <Router>
      {/* <Navbar/> */}
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
        
        <ProtectedRoute  exact path ='/P-T' exact component ={PowerandTem} />
        
        <ProtectedRoute   exact path ='/test' exact component ={Test} />
        
        <ProtectedRoute  exact path ='/report' exact component ={Report} />
        {/* <Route  exact path ='/home' exact component ={Home} />
        <Route  exact path ='/dashboard' component ={Dashboard} />
        
        <Route  exact path ='/P-T' exact component ={PowerandTem} />
        <Route  exact path ='/test' exact component ={Test} />
        
        <Route  exact path ='/report' exact component ={Report} /> */}
      </Switch>
    </Router>

   </AuthContextProvider>
    
  );
}

export default App;
