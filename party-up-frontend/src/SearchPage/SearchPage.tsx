import React, {Component, Fragment} from 'react';

import './SearchPage.scss';
import SearchBar from './SearchBar/SearchBar';
import ToolBar from './ToolBar/ToolBar';



class SearchPage extends Component{
    render(){
        return(
            <Fragment>
                <ToolBar/>
                <SearchBar/>
            </Fragment>           
        )
    }
}

export default SearchPage;