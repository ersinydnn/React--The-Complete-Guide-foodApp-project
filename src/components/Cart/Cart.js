import Modal from "../UI/Modal";
import classes from "./Cart.module.css"
import React ,{ useContext, useState } from "react";
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length>0;

  const cartItemRemoveHandler = (id)=> {
   cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item)=> {
    cartCtx.addItem({...item, amount:1})
  };
 const orderHandler = () => {
  setIsCheckout(true);
 };

const submitOrderHandler = async (userData) => {
  setIsSubmitting(true);
  await fetch("https://food-order-app-fd6ea-default-rtdb.firebaseio.com/orders.json",{
 method : "POST",
 body : JSON.stringify({
  user: userData,
  orderedItems: cartCtx.items
 })
});
setIsSubmitting(false);
setDidSubmit(true);
cartCtx.clearCart();
}

  const CartItems = (
 <ul 
    className={classes["cart-items"]}>
    {cartCtx.items.map(
    (item) => 
     <CartItem 
     key={item.id} 
     name ={item.name} 
     amount={item.amount} 
     price = {item.price} 
     onRemove = {cartItemRemoveHandler.bind(null,item.id)}
     onAdd = {cartItemAddHandler.bind(null,item)}
     />
     )}
    </ul> );

const modalActions = (
<div className={classes.actions}>
<button className={classes["button--alt"]} onClick={props.onClose} 
>Close
</button>
 {hasItems && (
   <button onClick={orderHandler} className={classes.button}>
    Order
    </button>
    )};
</div>
);
const cartModalContent =(
 <React.Fragment> 
  {CartItems}
<div className={classes.total}>
 <span>Total Amount</span>
 <span>{totalAmount}</span>
</div>
 { isCheckout &&( 
 <Checkout onSubmit = {submitOrderHandler}  onCancel = {props.onClose} /> 
)};
 {!isCheckout && modalActions}
</React.Fragment>
 );
const isSubmittingModalContent = <p>Sending order data...</p>;

const didSubmitModalContent = ( 
<React.Fragment> 
  <p>Succesfully sent the order !</p>
  <div className={classes.actions}>
<button className={classes.button} onClick={props.onClose}>
Close
</button>
 </div>
</React.Fragment>
);

return <Modal onClose={props.onClose}>
    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && isSubmittingModalContent}
    {!isSubmitting && didSubmit && didSubmitModalContent}
 </Modal>
}
export default Cart;