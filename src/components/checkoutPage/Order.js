import React, { useEffect, useState } from 'react'

//component
import {db} from '../../api/firebase'
import ListOrder from './ListOrder'
import { useStateValue } from '../../redux/StateProvider'

// style
import '../../scss/order.scss'

function Order() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                }))) 
            ))
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="order">
            <h1>Order Page</h1>

            <div className="order__orders">
                {orders?.map(order => (
                    <ListOrder order={order} basket={basket}/>
                ))}
            </div>
        </div>
    )
}

export default Order
