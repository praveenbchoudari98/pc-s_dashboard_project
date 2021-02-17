import React from 'react';
import './css/Dashboard.css'
import {firebaseDB} from './firebase'
import {Link} from "react-router-dom";
import Navbar from './components/Navbar'


class Dashboard extends React.Component
{
constructor() {
    super();
    this.state={
        users:[]
    }
}
componentDidMount(){
    firebaseDB.ref('data').once("value").then(snapshot=>{
        let users=[];
    snapshot.forEach(snap => {
        users.push(snap.key)
    });  
    this.setState({
        users:users
    })
}) 
}
render()
{
return (
            <div>
            <Navbar/>
            <button className='adduser'><Link style={{textDecoration:'none',color:'inherit'}} to="/adduser">Add New User</Link></button>
            <br/>
            <br/>
            <br/>
            <div className="main__cards">
            <div className="card">
            <Link style={{textDecoration:'none',color:'inherit'}} to="/users">
            <i
                className="fa fa-user fa-2x text-cyan icons"
                aria-hidden="true"
              />
              <div className="card_inner">
                <h3 className="text-primary-p">Registered Users</h3>
                
              <span className="font-bold text-title">{this.state.users.length}</span>
              </div>
              </Link>
            </div>

            <div className="card">
            <Link style={{textDecoration:'none',color:'inherit'}} to="/transactions">
            <span className="icons text-purple material-icons">credit_card</span>
              <div className="card_inner">
                <h3 className="text-primary-p" >Transactions</h3>
                <span className="font-bold text-title">44</span>
              </div>
              </Link>
            </div>

            <div className="card">
            <span className="icons text-green material-icons">settings</span>
              <div className="card_inner">
                <h3 className="text-primary-p" >Services</h3>
                <span className="font-bold text-title">340</span>
              </div>
            </div>

            <div className="card">
              <span className="icons text-orange material-icons">analytics</span>
              <div className="card_inner">
                <h3 className="text-primary-p" >Analytics</h3>
                <span className="font-bold text-title">645</span>
              </div>
            </div>
          </div>
          </div>
        );
    }
}

export default Dashboard;