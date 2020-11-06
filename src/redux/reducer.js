export const initialState = {
    basket: [],
}

// SELECTOR
export const getBasketTotal = (basket) => basket?.reduce((amount, item) => parseInt(item.price) + amount, 0);

const reducer = (state, action) => {
    // console.log(action);//debugin action in data layer
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket : [...state.basket, action.item],
            }
        case 'REMOVE_FROM_BASKET':
            // Find index with match an ID
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            // create new Basket
            let newBasket = [...state.basket];

            // if there are index / index not undefined
            if (index >= 0) {
                // take out the index from new basket
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `Can't remove product (id: ${action.id}) as its not in basket !`
                );
            }
            return {
                // returning new basket into basket
                ...state,
                basket: newBasket,
            }
        case 'SET_USER':
            return{
                ...state,
                user: action.user,
            }
        default:
            return state;
    }
}

export default reducer;