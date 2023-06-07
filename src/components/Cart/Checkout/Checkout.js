import { useState, useRef, useContext } from "react";
import classes from "./Checkout.module.css";
import axios from "axios";
import cartContext from "../../../store/Cart-Context";
import { ToastContext } from "../../../store/Toast-Context";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("please enter your name"),
  email: yup.string().email("please enter valid email").required("required"),
  postal: yup.number('must be number').test('len', 'Must be greater 2 digits', val => val.toString().length > 2).positive().integer().required("required"),
  password: yup.string().min(8,"min 8 :)").max(999999999,"max 999999999 :)").required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), "not match with password"]).required("required"),
  phone: yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "must be a phone number").required(),
})
  
  const Checkout = (props) => {
  // Validations
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) });
  
  const [isPhoneToggle, setIsPhoneToggle] = useState(false);
  const cartctx = useContext(cartContext);
  const { openToast } = useContext(ToastContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const postalRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const phoneRef = useRef();
  
  // Submit
  const submitOrder = (e) => {
    const name = e.name
    const email = e.email;
    const postal = e.postal;
    const password = e.password;
    const phoneValue = e.confirmPassword;
    // const name = nameRef.current.value;
    // const email = emailRef.current.value;
    // const postal = postalRef.current.value;
    // const password = passwordRef.current.value;
    // const phoneValue = phoneRef.current?.value;
    
    // if (!name || !email || !postal || !password || (isPhoneToggle && !phoneValue)){
      //   showToast('Failed !!', 'please, fill all inputs', 'danger');
      // } 
      // else {
        let phone = isPhoneToggle ? phoneValue : null;
        console.log('object', {name, email, postal, password, phone});
        snedOrder({name, email, postal, password, phone});
        // e.target.reset(); 
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
        openToast({
          variant: 'success',
          status: 'Success !!',
          message: 'Send To Firebase Successfully',
        });
      })
    };
    
  return (
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
        <p className="text-danger"> { errors.postal?.type === 'typeError' ? 'must be number' : errors.postal?.message  } </p>
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
        onClick={() => {setIsPhoneToggle(!isPhoneToggle)}}
      >
        { isPhoneToggle ? 'Remove Phone' : 'Add Phone' }
      </button>
      {
        isPhoneToggle &&  
        <div className={ errors.phone ? `${classes.control} ${classes.invalid}` : `${classes.control}`}>
          <label htmlFor="phone">phone</label>
          <input type="tel" name="phone" ref={phoneRef} 
            {...register('phone', { required: true })}
            // {...register('phone', {
            //   required: watch('isPhoneToggle', true), // Validate only if the isPhoneToggle == true
            // })}
          />

          {/* <input type="tel" id="phone" ref={phoneRef} 
            {...register('phone', { required: true })}
            // {...register('phone', {
            //   required: watch('isPhoneToggle', true), // Validate only if the isPhoneToggle == true
            // })}
          /> */}

          {/* {watch(isPhoneToggle, false) && <input type="tel" {...register("phone", { required: true })} />} */}


          {/* <input
            ref={register({
              validate: {
                required: value => {
                  if (!value && isPhoneToggle) return 'Required when username is provided';
                  // if (!value && getValues('username')) return 'Required when username is provided';
                  return true;
                },
              },
            })}
            name="phone"
            type="tel"
          /> */}

          <p className="text-danger"> { errors.phone?.message } </p>
        </div>
      }

      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
