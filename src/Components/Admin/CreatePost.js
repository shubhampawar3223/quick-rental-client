import React,{useState} from 'react';
import {BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import Navbar1 from '../Navbar1';
import { Alert } from "reactstrap";

export default function CreatePost() {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const [product_id, setId] = useState();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [model, setModel] = useState();
    const [description, setDescription] = useState();
    const [deposit, setDeposit] = useState();
    const [charges, setCharges] = useState();
    const [ownerName, setOwnerName] = useState();
    const [mobNo, setMobno] = useState();
    const [emailId, setEmailid] = useState();
    const [visible, setVisible] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [loading, setLoading] = useState(false);

    const onDismiss = () => setVisible(false);
    const onDismiss1 = () => setVisible1(false);
    const addData = async (e)=>{
          e.preventDefault();
          setLoading(true);
         const data = new FormData();
         data.append("file",image);
        data.append('upload_preset','quick-rental')
        data.append('cloud_name','shubh8991')
        fetch('	https://api.cloudinary.com/v1_1/shubh8991/image/upload',{
            method: 'POST',
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data.secure_url);
            setUrl(data.secure_url);
        })
        .catch((error)=>{
            console.log(error);
        })
        
       let postData={  
       id:product_id,
       category: category,
       sub_category: subCategory,
       model_no: model,
       description:description,
       deposit: deposit,
       charges: charges,
       ownerName: ownerName,
       mobNo: mobNo,
       emailId: emailId,
       url:url
      }
       const auth = localStorage.getItem('Authorisation');   
      const _url = "https://quick-rental-server.herokuapp.com/add-products";
   
       const response = await fetch(_url, {
       method: 'POST', 
       mode: 'cors', 
       cache: 'no-cache', 
       credentials: 'same-origin', 
       headers: {
         'Content-Type': 'application/json',
         'Authorisation': auth
       },
       referrerPolicy: 'no-referrer', 
       body: JSON.stringify(postData)
    })
    let n = await response.json()
    if(response.status === 200){
          setVisible(true)
    }
    else{
        setVisible1(true)
    }
    setLoading(false);
}

  return (

    <div className="App">
        {/* <Navbar1/> */}
        {
        loading?
              <div className="d-flex mt-3 justify-content-center">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                <span class="sr-only">Loading...</span>
              </div>
              :null
        }

        <Alert color="secondary" isOpen={visible} toggle={onDismiss} fade={false}>
        Data saved Successfully.
      </Alert>
     
      <Alert color="danger" isOpen={visible1} toggle={onDismiss1}>
        Error in uploading data  <Link to='/signup'>Register Here!!</Link>
      </Alert>


       <div className="mt-5 offset-3 col-6 p3 border border-dark" style={{borderRadius:"15px"}}>
        <h4 className="mt-3">Product Info.</h4>   
         <form className="form-group">
         <div className="mt-3">
             <input type="text"   className="form-control" placeholder="Product id " value={product_id} onChange={(e)=>setId(e.target.value)} required/> 
        </div>
        <div className="row mt-3">
             <div className="col-6">
             <input type="text" required className="form-control" placeholder="Product Category" value={category} onChange={(e)=>setCategory(e.target.value)} ></input> 
              </div>
              <div className="col-6">
             <input type="text" required className="form-control" placeholder="Product Sub-Category" value={subCategory} onChange={(e)=>setSubCategory(e.target.value)}></input> 
              </div> 
        </div>
        <div className="mt-3">
             <input type="text" required className="form-control" placeholder="Model Name" value={model} onChange={(e)=>setModel(e.target.value)}></input> 
        </div>    
        <div className="mt-3">
             <textarea type="text" required className="form-control" rows="4" placeholder="Description" value={description} onChange={(e)=>setDescription(e.target.value)}/> 
        </div>
        <div className="row mt-3">
             <div className="col-6">
             <input type="text" required className="form-control" placeholder="Deposit Amount" value={deposit} onChange={(e)=>setDeposit(e.target.value)}></input> 
              </div>
              <div className="col-6">
             <input type="text" required className="form-control" placeholder="Charges/Day" value={charges} onChange={(e)=>setCharges(e.target.value)}></input> 
              </div> 
        </div>   
        <h4 className="mt-3">Owner Info.</h4>
        <div className="mt-2">
             <input type="text" required className="form-control" placeholder="Owner Name" value={ownerName} onChange={(e)=>setOwnerName(e.target.value)}></input> 
        </div>
        <div className="row mt-3">
             <div className="col-6">
             <input type="text" required className="form-control" placeholder="Mobile No." value={mobNo} onChange={(e)=>setMobno(e.target.value)}></input> 
              </div>
              <div className="col-6">
             <input type="text" required className="form-control" placeholder="Email Id." value={emailId} onChange={(e)=>setEmailid(e.target.value)}></input> 
              </div> 
        </div>
        <div className="mt-3 justify-content-center">
         <span>Upload Image</span><br></br>
         <input type="file" accept=".png, .jpg, .jpeg, .gif" required onChange={(e)=>setImage(e.target.files[0])}/>
          
         </div>
         <button className="btn btn-info form-control mt-3 " onClick={addData}>Submit</button>
         </form>
         
       </div>
             
    </div>
  );
}

