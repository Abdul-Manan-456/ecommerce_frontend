import { CartItem } from './cartSlice'
export function getCartFromLocalStorage() {
    const cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    } else {
        return [];
    }
}
export function findItemIndexById(items: CartItem[], id: string) {
    return items.findIndex((item) => item._id === id);
}
// function updateCartItemQuantity(item, quantity) {
//     return { ...item, quantity };
// }
function calculateTotals(items: CartItem[]) {
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return { totalQuantity, totalPrice };
}
export const setCartItems = (payload: CartItem) => {
    let cart = [];
    const getCart = localStorage.getItem("cart");
    if (getCart) {
        const parsedCart: CartItem[] = JSON.parse(getCart);
        const item = parsedCart.find((item) => item._id === payload._id); // finding the particular product
        if (item) {
            // if the product exists
            const filterdCart = parsedCart.filter((value) => value._id !== payload._id);
            item.quantity += 1;
            localStorage.removeItem("cart");
            filterdCart.push(item);
            localStorage.setItem("cart", JSON.stringify(filterdCart));
            return filterdCart
        } else {
            // if the cart exists but the item is empty
            const quantityValue = payload.quantity > 1 ? payload.quantity : 1;
            const cartItem = { ...payload, quantity: quantityValue };
            parsedCart.push(cartItem);
            localStorage.setItem("cart", JSON.stringify(parsedCart));
            return parsedCart;
        }
    } else {
        // if the cart does not exist on localStorage
        const quantityValue = payload.quantity > 1 ? payload.quantity : 1;
        const cartItem = { ...payload, quantity: quantityValue };
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart
    }
};