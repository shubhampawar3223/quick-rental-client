import React,{useState} from 'react';
import {BrowserRouter as Router,useHistory, Route, Link, Redirect} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

export default function Navbar1(props) {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const toggle = () => setIsOpen(!isOpen);
  
  const logout = (e)=>{
    e.preventDefault();
    localStorage.removeItem("Authorisation");
    localStorage.removeItem("Email");
    localStorage.removeItem("Role");
    history.push('/home');
  }



  return (
    
    <div>
      
      {
      localStorage.getItem('Authorisation') === null
      ?  
      <Navbar color="info" light expand="md">
       <Link to='/home'><NavbarBrand >Quick-Rentals</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          <Link to="/login"><button className="btn btn-sm btn-secondary mr-2" >Login</button></Link>
          <Link to="/signup"><button className="btn btn-sm btn-secondary mr-2">Signup</button></Link>
        </Collapse>
      </Navbar>
      :<>
      {
        localStorage.getItem("Role") === 'user'
        ?
        <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand href="/home">Quick Rentals</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <NavLink href="/user-dashboard">Dashboard</NavLink>
          </NavItem>            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
              {
                props.categories.map((e,i)=>{
                 return <DropdownItem key={i}>
                   {e}
                  </DropdownItem>
                })  
                 }
                <DropdownItem divider />
                <DropdownItem>
                  Reset
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <button className="btn btn-sm btn-secondary mr-2" onClick={logout}>Logout</button>
        </Collapse>
      </Navbar>
    </div>
     :   
     <div>
      <Navbar color="info" light expand="md">
        <NavbarBrand >Quick Rentals</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
        <NavItem>
              <NavLink href="/admin-dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
              <NavLink href="/create-post">Create Post</NavLink>
        </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Categories
              </DropdownToggle>
              <DropdownMenu right>
                {
                props.categories.map((e,i)=>{
                 return <DropdownItem key={i}>
                   {e}
                  </DropdownItem>
                })  
                 }
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <button className="btn btn-sm btn-secondary mr-2" onClick={logout}>Logout</button>
        </Collapse>
      </Navbar>
    </div>    
      }
      </>
    }
    </div>
  );
}        
