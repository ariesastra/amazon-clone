import React from 'react'

// Style
import '../../scss/products.scss'

// Material UI
import { Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { useStateValue } from '../../redux/StateProvider';
import { keys } from '@material-ui/core/styles/createBreakpoints';

function Products({id, title, image, price, rating}) {
    const [{basket}, dispatch] = useStateValue();
    // console.log(basket);//Debuging basket data layer

    const addToBasket = () => {
        // dispatch item to the data layer
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating,
            },
        });
    };

    return (
        <div className="products">
            <div className="product__info">
                {/* title */}
                <p>{title}</p>
                {/* price */}
                <p className="product__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                {/* star rating */}
                <div className="product__rating">
                    {Array(rating).fill().map((_, i) => (
                        <p><StarIcon/></p>
                    ))}
                </div>
                {/* Product image */}
            </div>
            <img src={image} alt="product"/>
            {/* basket button */}
            <Button className="product__button" onClick={addToBasket}>
                Add to Chart
                <ShoppingCartIcon className="cart__icon"/>
            </Button>
        </div>
    )
}

export default Products
