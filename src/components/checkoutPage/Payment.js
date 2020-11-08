import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'

// component
import { useStateValue } from '../../redux/StateProvider'
import CheckoutProducts from './CheckoutProducts';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {getBasketTotal} from '../../redux/reducer'
import axios from '../../api/axios'
import {db} from '../../api/firebase'

// sytle
import '../../scss/payment.scss'

// material ui


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();
    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);
    const [succeeded, setSucceeded] = useState(true);
    const [processing, setProcessing] = useState('');
    const [clientSecret, setClientSecret] = useState(true);
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
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket]);

    // console.log('THE SECRET IS >>>', clientSecret);//debug
    console.log('user :', user?.uid);

    const handleSubmit = async (event) => {
        // All about Stripe function
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            // put user data to firestroe db
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created,
            });

            // this is payment confirmation
            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_BASKET'
            });

            history.replace('/orders');
        });
    }

    const handleChange = event => {
        // Listen for change in card element
        if (event.complete) {
            // console.log(document.querySelectorAll('form > button'));
            document.querySelectorAll('form > button')[0].removeAttribute('disabled');
            // document.querySelectorAll('form > button')[0].classList.remove('Mui-disabled');
        }

        // display error
        setDisable(event.empty);
        setError(event.error ? event.error.message : "");
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
                            {/* Card Element from Stripe */}
                            <CardElement onChange={handleChange}/>
                            
                            {/* Subtotal */}
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
                            
                            <button disabled>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now '}</span>
                            </button>
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
