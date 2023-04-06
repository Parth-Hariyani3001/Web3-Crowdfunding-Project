import React from "react";
import { Menu } from "semantic-ui-react";


const Header = () => {
    return(
        <div class="ui menu" style={ { marginTop : '10px' } }>
            <a class="item">CrowdCoin</a>
            <div class="right menu">
                <a class="item">Campaigns</a>
                <a class="item">+</a>
            </div>
        </div>
    );
}
export default Header;