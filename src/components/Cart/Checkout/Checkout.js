import { useState, useRef, useContext } from "react";
import classes from "./Checkout.module.css";
import axios from "axios";
import cartContext from "../../../store/Cart-Context";
import { Toast } from 'react-bootstrap';



const Checkout = (props) => {
  const [isToastShow, setIsToastShow] = useState(false);
  const [toast, setToast] = useState({});

  const cartctx = useContext(cartContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const postalRef = useRef();
  const cityRef = useRef();

  const submitOrder = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const postal = postalRef.current.value;
    const city = cityRef.current.value;

    if (!name || !email || !postal || !city){
      showToast('Failed !!', 'please, fill all inputs', 'danger');
    } else {
      snedOrder(name, email, postal, city);
    }
  };

  const snedOrder = (name, email, postal, city) => {
    const url = "https://react-meals-7b0d3-default-rtdb.firebaseio.com/orders.json";
    const data = {
      userData: {
        name,
        email,
        postal,
        city,
      },
      items: cartctx.items,
    }

    axios.post(url, data)
      .then((res) => {
        res.status === 200 &&
          showToast('Success !!', 'Send To Firebase Successfully', 'success');
      })
  };

  const showToast = (status, message, variant) => {
    setIsToastShow(true);
    setToast({
      status ,
      message ,
      variant ,
    })
  };

  return (
    <>
    <form className={classes.form} onSubmit={submitOrder}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="email">Your Email</label>
        <input type="text" id="email" ref={emailRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalRef}/>
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef}/>
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>

    <Toast onClose={() => setIsToastShow(false)} show={isToastShow} delay={3000} autohide bg={toast.variant}>
      <Toast.Header>
        <strong className="me-auto">{toast.status}</strong>
        <small>Now</small>
      </Toast.Header>
      <Toast.Body>{toast.message}</Toast.Body>
    </Toast>
    </>
  );
};

export default Checkout;
