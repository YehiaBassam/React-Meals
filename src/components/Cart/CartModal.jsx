import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import classes from './CartModal.module.css';
import CartItem from './CartSummary/CartItem';
import cartContext from '../../store/Cart-Context';
// import Checkout from './Checkout/Checkout-ReactFormHook';
import Checkout from './Checkout/Checkout-Formic';

// const CartModal = ({ showModal }) => {
const CartModal = (props) => {
  const [show, setShow] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartctx = useContext(cartContext);

  const handleClose = () => { 
    setShow(false); 
    props.closeModal();
  };

  useEffect(() => {
    setShow(props.showModal);
  }, [props.showModal]);

  
  const addItem = (item, qty) => {
    cartctx.addItem(item, qty);
  };

  const removeItem = (item, qty) => {
    cartctx.removeItem(item, qty);
  };

  return (
    <>
      {/* <Checkout onCancel={() => setIsCheckout(false)}/> */}
      <Modal show={show} onHide={handleClose} size='lg'>
      {
        isCheckout ? 
          <Checkout onCancel={() => setIsCheckout(false)}/>
        :
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Sushi</Modal.Title>
          </Modal.Header>
          <Modal.Body className={classes.content}>
          <div className='w-100'>
            <ul className={classes['cart-items']}>
              {props.totalAmount > 0 && props.items.map(item => {
                return <CartItem item={item} key={item.id} onAdd={addItem} onRemove={removeItem}/>
              })}
            </ul>
            <div className='w-100 d-flex justify-content-between pt-3'>
              <h5 className='fw-bold'>Total Amount</h5>
              <h5 className='fw-bold'>{ props.totalAmount } $</h5>
            </div>
          </div>
          </Modal.Body>
          <Modal.Footer className={classes['modal-footer']}>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setIsCheckout(true)}>
              Order 
            </Button>
          </Modal.Footer>
        </div>
      }
      </Modal>
    </>
  )
}


export default CartModal;
