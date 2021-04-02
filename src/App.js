import React from 'react';
import {BrowserRouter as Router, Route,Switch, Link, Redirect} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserDash from './Components/User/UserDash';
import AdminDash from './Components/Admin/AdminDash';
import CreatePost from './Components/Admin/CreatePost'
import Product from  './Components/Product';
import './App.css';

const WrapperRoute= ({render, ...restProps}) => {
   return(
     <Route 
      {...restProps}
      render={
        (props)=>{
          if(localStorage.getItem('Authorisation') !== null){
            if(localStorage.getItem('role') === 'admin'){
              return <Redirect to={`/admin-dashboard`}/>
            }
            else{
              return <Redirect to={`/user-dashboard`}/>
            }   
          }
         else{
          return render(props);
         }
        }
      }
     />
   )
}

const ProtectedRoute = ({component:Component, ...restProps})=>{
     return(
       <Route
          {...restProps}
          render={
              (props) =>{
                 if(localStorage.getItem('Authorisation') === null){
                  return <Redirect to="/login"/>
                 }
                 else{
                     return (
                       <>
                          <Component {...props}/>
                       </>
                     )
                 }
              }
          }
       />
     )   
}

function App() {
  
  return (
    <Router>
      
      <Switch>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/home' component={Home}/>
        <WrapperRoute
        path="/login"
        render={(props) =><Login {...props} />}
        />
        <ProtectedRoute exact path='/admin-dashboard' component={AdminDash}/>
        <ProtectedRoute exact path='/user-dashboard' component={UserDash}/>
        <ProtectedRoute exact path='/create-post' component={CreatePost}/>
        <ProtectedRoute exact path='/product/:id' component={Product}/> 
      </Switch>      
    </Router>
  );
}

export default App;
