import React, {Component} from 'react';
import './ToolBar.css'

class ToolBar extends Component{
    render(){
        return(
            <div className="topnav">
                    <a href="#home">PartyUp</a>
                    <a href="#Account">Account</a>
                    <a className='active'href="#Search">Game Search</a>
            </div>
        )
    }
}

export default ToolBar;