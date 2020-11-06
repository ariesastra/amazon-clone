import React from 'react'
import CurrencyFormat from 'react-currency-format'

// component

// style
import '../../scss/subtotal.scss'

// material ui
import { Button } from '@material-ui/core';
import { useStateValue } from '../../redux/StateProvider';
import { getBasketTotal } from '../../redux/reducer';

function Subtotal() {
    const [{basket}, dispatch] = useStateValue();

    return (
        <div className="subtotal">
            <CurrencyFormat 
                renderText={(value) => (
                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{value}</strong>
                        </p>
                        <small className="subtotal__gift">
                            <input type="checkbox" /> This Order Contain a gift
                        </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
            <Button className="checkout__button">
                Proceed to Checkout
            </Button>
        </div>
    )
}

export default Subtotal;
