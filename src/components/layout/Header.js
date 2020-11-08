import React from 'react'
import {Link} from 'react-router-dom'

// Component

// Style
import '../../scss/header.scss'

// Material UI
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useStateValue } from '../../redux/StateProvider';
import { auth } from '../../api/firebase';

function Header() {
    const [{basket, user}, dispatch] = useStateValue();

    const handleAuth = () => {
        if (user) {
            auth.signOut();
        }
    }
    
    return (
        <div className="header">
            <Link to="/">
                <img src="https://www.mabaya.com/wp-content/uploads/2019/10/amazon_PNG25.png" 
                    alt="Amazon Logo" 
                    className="header__logo"
                />
            </Link>
            {/* Search Section */}
            <div className="header__search">
                <input type="text" className="header__searchInput" placeholder="Iphone 13 Pro Max" />
                <SearchIcon className="header__icon" />
            </div>
            {/* Header Nav */}
            <div className="header__nav">
                <Link to="/orders">
                    <div className="header__option">
                        <span className="header__optionLineOne">
                            Returns
                        </span>
                        <span className="header__optionLineTwo">
                            & Orders
                        </span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className="header__optionLineOne">
                        View
                    </span>
                    <span className="header__optionLineTwo">
                        Prime
                    </span>
                </div>
                <Link to={!user && '/login'}>
                    <div className="header__option" onClick={handleAuth}>
                        <span className="header__optionLineOne">
                            {!user ? 'Hello Guest' : `Hello ${user.email}`}
                        </span>
                        <span className="header__optionLineTwo">
                            {/* If there are user, wite Sign Out or write Sign In */}
                            {user ? 'Sign Out' : 'Sign In'}
                        </span>
                    </div>
                </Link>
                <Link to="/checkout">
                    <div className="header__optionBasket">
                        <ShoppingBasketIcon />
                        <span className="header__optionLineTwo header__basketCount">
                            {basket.length ? basket.length : ''}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
