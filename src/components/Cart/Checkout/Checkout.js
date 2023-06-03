import { useState, useRef, useContext } from "react";
import classes from "./Checkout.module.css";
import axios from "axios";
import cartContext from "../../../store/Cart-Context";
import { Toast } from 'react-bootstrap';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("please enter your name"),
  email: yup.string().email("please enter valid email").required("required"),
  postal: yup.number('must be number').test('len', 'Must be greater 2 digits', val => val.toString().length > 2).positive().integer().required("required"),
  password: yup.string().min(8,"min 8 :)").max(999999999,"max 999999999 :)").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), "not match with password"]).required("required"),
  phone: yup.string().matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im, "must be a phone number").required(),
})
  
  const Checkout = (props) => {
  // Validations
  const { register, handleSubmit, trigger, formState: { errors }} = useForm({ resolver: yupResolver(schema) });

  // State
  const [isToastShow, setIsToastShow] = useState(false);
  const [toast, setToast] = useState({});
  const [isPhoneToggle, setIsPhoneToggle] = useState(false);

  const cartctx = useContext(cartContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const postalRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneRef = useRef();
  
  // Submit
  const submitOrder = (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const postal = postalRef.current.value;
    const password = passwordRef.current.value;
    const phoneValue = phoneRef.current?.value;
    
    // if (!name || !email || !postal || !password || (isPhoneToggle && !phoneValue)){
    //   showToast('Failed !!', 'please, fill all inputs', 'danger');
    // } 
    // else {
      let phone = isPhoneToggle ? phoneValue : null;
      snedOrder({name, email, postal, password, phone});
      event.target.reset(); 
    // }
  };
  
  const snedOrder = (newData) => {
    const url = "https://react-meals-7b0d3-default-rtdb.firebaseio.com/orders.json";
    // remove null values
    const FormData = Object.fromEntries( 
      Object.entries(newData).filter(([key, value]) => value !== null)
      );
      
      const data = {
        userData: FormData,
        items: cartctx.items,
      }
      
    axios.post(url, data)
      .then((res) => {
        res.status === 200 &&
        showToast('Success !!', 'Send To Firebase Successfully', 'success');
      })
    };
    
    // Show Toast
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
    <form className={classes.form} onSubmit={handleSubmit(submitOrder)}>
      <div className={ errors.name ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} {...register('name')}/>
        <p className="text-danger"> { errors.name?.message } </p>
      </div>
      <div className={ errors.email ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
        <label htmlFor="email">Your Email</label>
        <input type="text" id="email" ref={emailRef} {...register('email')}/>
        <p className="text-danger"> { errors.email?.message } </p>
      </div>
      <div className={ errors.postal ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
        <label htmlFor="postal">Postal Code</label>
        <input type="number" id="postal" ref={postalRef} {...register('postal')}/>
        <p className="text-danger"> { errors.postal?.message } </p>
      </div>
      <div className={ errors.password ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
        <label htmlFor="password">password</label>
        <input type="password" id="password" ref={passwordRef} {...register('password')} />
        <p className="text-danger"> { errors.password?.message } </p>
      </div>
      <div className={ errors.confirmPassword ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
        <label htmlFor="confirmPassword">confirm Password</label>
        <input type="password" id="confirmPassword" ref={confirmPasswordRef} {...register('confirmPassword')} />
        <p className="text-danger"> { errors.confirmPassword?.type === 'oneOf' ? 'confirm password must match password' : errors.confirmPassword?.message  } </p>
      </div>
      <button 
        type="button" 
        className={`btn my-4 ${isPhoneToggle ? 'btn-danger' : 'btn-success'}`} 
        onClick={() => {setIsPhoneToggle(!isPhoneToggle); trigger('phone');}}
      >
        { isPhoneToggle ? 'Remove Phone' : 'Add Phone' }
      </button>
      {
        isPhoneToggle &&  
        <div className={ errors.phone ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
          <label htmlFor="phone">phone</label>
          <input type="tel" id="phone" ref={phoneRef} 
            {...register('phone', { required: true })}
            // {...register('phone', {
            //   required: watch('isPhoneToggle', true), // Validate only if the isPhoneToggle == true
            // })}
          />
          <p className="text-danger"> { errors.phone?.message } </p>
        </div>
      }

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
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
