import React,{useEffect,useState} from 'react';
import {BrowserRouter as Router, useHistory, Route, Link, Redirect} from 'react-router-dom';
import Navbar1 from '../Navbar1';

export default function AdminDash() {
 let [categories, setCategories] = useState([]);
 let [products, setProducts] = useState([]);
 const [loading, setLoading] = useState(false); 
 const history = useHistory();

 useEffect(async()=>{
  setLoading(true);
  let auth = localStorage.getItem('Authorisation');
   let url = 'https://quick-rental-server.herokuapp.com/get-categories';
  let res = await fetch(url,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorisation': auth
    }
  })
  res = await res.json()
  console.log(res.categories);
  setCategories((arr)=>[...res.categories]);   

  let url1 = 'https://quick-rental-server.herokuapp.com/products';
  let res1 = await fetch(url1,{
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'Authorisation': auth
   }

 })
 res1 = await res1.json()
 console.log(res1.products);
 setProducts((arr)=>[...res1.products]);   
 setLoading(false);
   },[])

  const goToView = (id)=>{  
   history.push('/product/'+ +id);       
  } 
  
  return (
    <div className="App">
        <Navbar1 categories={categories}/>
        {
        loading?
              <div className="d-flex mt-3 justify-content-center">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </div>
              :null
        } 
        <div className="mt-3 offset-3">
          <div className="col-8">
           <div className="row ">
          {
          products.map((e,i)=>{
            return<div className="border border-dark m-2 p-2" style={{width:"18rem", position:'relative', borderRadius:"20px"}} key={i}>
            <img src={e.url} width="150" height="200" className="card-img-top" alt="..."/>
            <div className="">
            <h5>{e.model_no}</h5>
            <p style={{fontSize:"15px"}}>{e.description}</p>
            <span className="p-1" style={{ border:"1px solid black", borderRadius:"19px"}}>Rs. {e.charges} per day</span> 
            <p className="mt-2 p-2 d-flex justify-content-between" style={{postion:"absolute", bottom:"0px"}}>
              <button className="btn btn-info btn-md">Edit</button>
              <button className="btn btn-info btn-md" onClick={()=>goToView(e.id)}>View</button>
              <button className="btn btn-info btn-md">Delete</button>
            </p>
            </div>
            
            </div>
          })
          
          }
          </div>   
          </div>
        </div>

    </div>

  );
}

