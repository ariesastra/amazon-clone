import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'

// component
import { useStateValue } from '../../redux/StateProvider'
import CheckoutProducts from './CheckoutProducts';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {getBasketTotal} from '../../redux/reducer'
import axios from '../../api/axios'

// sytle
import '../../scss/payment.scss'

// material ui
import {Button} from '@material-ui/core'

function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);
    const [succeeded, setSucceeded] = useState(true);
    const [processing, setProcessing] = useState('');
    const [clietSecret, setClientSecret] = useState(true);
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        // generate special stripe secret
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe Expect the total in a currents subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clietSecret);
        }

        getClientSecret();
    }, [basket]);

    const handleSubmit = async (e) => {
        // All about Stripe function
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clietSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // this is payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            history.replaceState('/orders');
        });
    }

    const handleChange = e => {
        // Listen for change in card element

        // display error
        setDisable(e.empty);
        setError(e.error ? e.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                </h1>
                <div className="payment__section">
                    <div className="payment__title">
                        <h4>Delivery Address</h4>
                    </div>
                    <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>
                                Jl. Watubela 2 No. RF-3A, Kec. Rawa Mekar Jaya, Kel. Serpong, Tangerang Selatan (15310)
                            </p>
                        <p>
                                082246120088
                        </p>
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h4>Review Your Items</h4>
                    </div>
                    <div className="payment__items">
                        {
                            basket.map(item => (
                                <CheckoutProducts 
                                    id={item.id}
                                    title={item.title}
                                    image={item.image}
                                    rating={item.rating}
                                    price={item.price}
                                />
                            ))
                        }
                    </div>
                </div>
                <div className="payment__section">
                    <div className="payment__title">
                        <h4>Payment Method</h4>
                    </div>
                    <div className="payment__detail">
                        {/* Stripe magic will go Here ! */}
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>
                            <div className="payment__priceContainer">
                                {/* Using Currency Format from NPM */}
                                <CurrencyFormat 
                                    renderText={(value) => (
                                        <>
                                            <strong>
                                                <p>Subtotal ({basket.length} items): {value},</p>
                                            </strong>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                            </div>
                            <Button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now '}</span>
                            </Button>
                            {/* Error */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
