import React from 'react'
import { useStateValue } from '../../redux/StateProvider';

// Style
import '../../scss/checkoutProduct.scss'
// Material UI
import { Button } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star'

function CheckoutProducts({id, image, title, price, rating}) {
    const [{basket}, dispatch] = useStateValue();
    const removeFromBasket = () => {
        // remove an item from basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        });
    };

    return (
        <div className="checkoutProduct" key={id}>
            <img src={image} 
                alt={title} 
                className="checkoutProduct__image"
            />
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">
                    {title}
                </p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p><StarIcon/></p>
                        ))
                    }
                </p>
                <Button className="checkoutProduct__btn" onClick={removeFromBasket}>
                    Remove from Basket
                </Button>
            </div>
        </div>
    )
}

export default CheckoutProducts
