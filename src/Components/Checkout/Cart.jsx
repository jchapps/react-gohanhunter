import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CheckoutContext from "../../Store/checkout-context";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const checkoutctx = useContext(CheckoutContext);
  const totalPrice = `$${checkoutctx.totalAmount.toFixed(2)}`;
  const hasItems = checkoutctx.items.length > 0;

  function checkoutItemRemoveHandler(id) {
    checkoutctx.removeItem(id);
  }

  function checkoutItemAddHandler(item) {
    checkoutctx.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {checkoutctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={checkoutItemRemoveHandler.bind(null, item.id)}
          onAdd={checkoutItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const orderHandler = () => {
    setIsCheckingOut(true);
  };

  const modalButtons = (
    <div className={styles.actions}>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
      <button className={styles["button--alt"]} onClick={props.onCloseCheckout}>
        Close
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onCloseCheckout}>
      {cartItems}
      <div className={styles.total}>
        <span>Total:</span>
        <span>{totalPrice}</span>
      </div>
      {isCheckingOut && <Checkout onCancel={props.onCloseCheckout}/>}
      {!isCheckingOut && modalButtons}
    </Modal>
  );
}

export default Cart;
