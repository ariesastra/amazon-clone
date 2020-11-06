import React from 'react'

// component
import Subtotal from './Subtotal'
import CheckoutProducts from './CheckoutProducts'
import { useStateValue } from '../../redux/StateProvider'
// style
import '../../scss/checkout.scss'

// material ui

function CheckoutPage() {
    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className="checkoutPage" key={user?.email}>
            <div className="checkoutPage__left">
                <img src="https://images-na.ssl-images-amazon.com/images/G/01/kindle/apub/2020HolidayKEXDeals/20201103_US_P40996903-Holiday-KEX-Weekly-Deal_600x45-ILM._CB417918412_.jpg" alt="amazon ad" className="checkoutPage__ad"/>
                <div>
                    <h2 className="checkoutPage__title">
                        <h3>Hello, {user?.email}</h3>
                        Your Shopping Basket
                    </h2>
                    {/* Checkout Product */}
                    {basket.map(item => (
                        <CheckoutProducts className=""
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            rating={item.rating}
                            image={item.image}
                        />
                    ))}

                </div>
            </div>
            <div className="checkoutPage__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default CheckoutPage
