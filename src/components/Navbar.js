import React from 'react';
import './../css/Navbar.css';
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
showNavbar = () =>{
    const toggle = document.getElementById('header-toggle'),
    nav = document.getElementById('nav-bar'),
    bodypd = document.getElementById('body-pd'),
  headerpd = document.getElementById('header')
  if(toggle && nav && bodypd && headerpd){
            nav.classList.toggle('show')
            toggle.classList.toggle('bx-x')
            bodypd.classList.toggle('body-pd')
            headerpd.classList.toggle('body-pd')
  }
    }

 colorLink=(e)=>{
    const linkColor = document.querySelectorAll('.nav__link')
    console.log(linkColor);
    if(linkColor){
        linkColor.forEach(l=>l.classList.remove('active'));
    }
    e.target.classList.add('active');
}

render() {
    return (
        <div className='navBody'>      
        <header className="header" id="header">
        <div className="header__toggle">
            <i className='bx bx-menu' id="header-toggle" onClick={this.showNavbar} />
        </div>
        <div className="header__img">
            <img src="image.jpg" alt="" />
        </div>
        </header>

        <div className="l-navbar" id="nav-bar">
        <nav className="nav">
            <div>
                <Link to="/" className="nav__logo">
                    <i className='bx bx-layer nav__logo-icon'/>
                    <span className="nav__logo-name">Project PC</span>
                </Link>

                <div className="nav__list">
                    <Link to='/' className="nav__link active" onClick={(e)=>{this.colorLink(e)}}>
                    <i className='bx bx-grid-alt nav__icon' />
                        <span className="nav__name">Dashboard</span>
                    </Link>

                    <Link to="/users" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                        <i className='bx bx-user nav__icon' />
                        <span className="nav__name">Users</span>
                    </Link>
                    
                    <Link to="/transactions" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                        <span className='material-icons nav__icon'>credit_card</span>
                        <span className="nav__name">Transactions</span>
                    </Link>

                    <Link to="/" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                        <i className='bx bx-bookmark nav__icon' />
                        <span className="nav__name">Favorites</span>
                    </Link>

                    <Link to="/" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                        <i className='bx bx-folder nav__icon' />
                        <span className="nav__name">Data</span>
                    </Link>

                    <Link to="/" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                        <i className='bx bx-bar-chart-alt-2 nav__icon' />
                        <span className="nav__name">Analytics</span>
                    </Link>
                </div>
            </div>

            <Link to="/" className="nav__link" onClick={(e)=>{this.colorLink(e)}}>
                <i className='bx bx-log-out nav__icon' />
                <span className="nav__name">Log Out</span>
            </Link>
        </nav>
        </div>

        </div>
    );
}
}

export default Navbar;
