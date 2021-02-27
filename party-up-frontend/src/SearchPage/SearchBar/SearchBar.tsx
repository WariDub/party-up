import React, { Component } from 'react'

import './SearchBar.scss';

class SearchBar extends Component{
    render(){
        return(
            <div className="container">
                <form>
                    <div className="finder">
                        <div className="finder__outer">
                            <div className="finder__inner">
                                <div className="finder__icon" ref="icon">
                                    <input className="finder__input" type="text" name="q" placeholder="Enter any game name..." />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBar;

