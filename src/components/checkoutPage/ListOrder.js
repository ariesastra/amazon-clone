import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import {getBasketTotal} from '../../redux/reducer'

// style 
import '../../scss/listOrder.scss'
import CheckoutProducts from './CheckoutProducts'

function ListOrder({order, basket}) {
    return (
        <div className="listOrder">
            <h2>Order List</h2>
            <p>
                {moment.unix(order.data.created).format('MMMM Do YYYY, h:mma')}
            </p>
            <p>
                <small className="listOrder__id">{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProducts 
                    id={item.uid}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton 
                />
            ))}

            {/* Using Currency Format from NPM */}
            <CurrencyFormat 
                renderText={(value) => (
                    <h3 className="listOrder__value">Order Total : {value}</h3>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>
    )
}

export default ListOrder
