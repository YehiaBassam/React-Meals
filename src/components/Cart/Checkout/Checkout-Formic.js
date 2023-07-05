import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classes from './Checkout.module.css';
import { useContext } from 'react';
import { ToastContext } from '../../../store/Toast-Context';
import cartContext from '../../../store/Cart-Context';
import axios from 'axios';

function Checkout() {
  const cartctx = useContext(cartContext);
  const { openToast } = useContext(ToastContext);
  const [isHiddenFieldShow, setIsHiddenFieldShow] = useState(false);
  
  const customValidationSchema = Yup.object().shape({
    name: Yup.string().required("please enter your name"),
    email: Yup.string().email("please enter valid email").required("required"),
    postal: Yup.number('must be number').test('len', 'Must be greater 2 digits', val => val.toString().length > 2).positive().integer().required("required"),
    password: Yup.string().min(8,"min 8 :)").max(999999999,"max 999999999 :)").required(),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), "not match with password"]).required("required"),
    phone: Yup.string().matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im, "must be a phone number").required(),
    // acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
    signature: Yup.string().when("acceptTerms", {
      is: true,
      then: () => Yup.string().required("signature is required")
    }),
  });

  const myFormicForm = useFormik({
    initialValues: {
      name: '',
      postal: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      signature: '',
      acceptTerms: false,
    },
    validationSchema : customValidationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: (data) => {
      sendOrder(data);
      myFormicForm.handleReset();
    },
  });

  const sendOrder = (newData) => {
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

  useEffect(() => {
    myFormicForm.values.acceptTerms ? setIsHiddenFieldShow(true) : setIsHiddenFieldShow(false);
  }, [myFormicForm.values.acceptTerms]);


  return (
    <div className={classes['register-form']}>
      <form onSubmit={myFormicForm.handleSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            type="text"
            className={
              'form-control' +
              (myFormicForm.errors.name && myFormicForm.touched.name
                ? ' is-invalid'
                : myFormicForm.touched.name ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.name}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.name && myFormicForm.touched.name
              ? myFormicForm.errors.name
              : null}
          </div>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="postal"> postal </label>
          <input
            name="postal"
            type="number"
            className={
              'form-control' +
              (myFormicForm.errors.postal && myFormicForm.touched.postal
                ? ' is-invalid'
                : myFormicForm.touched.postal ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.postal}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.postal && myFormicForm.touched.postal
              ? myFormicForm.errors.postal
              : null}
          </div>
        </div>
        
        <div className="form-group mb-2">
          <label htmlFor="phone"> phone </label>
          <input
            name="phone"
            type="number"
            className={
              'form-control' +
              (myFormicForm.errors.phone && myFormicForm.touched.phone
                ? ' is-invalid'
                : myFormicForm.touched.phone ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.phone}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.phone && myFormicForm.touched.phone
              ? myFormicForm.errors.phone
              : null}
          </div>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="email"> Email </label>
          <input
            name="email"
            type="email"
            className={
              'form-control' +
              (myFormicForm.errors.email && myFormicForm.touched.email
                ? ' is-invalid'
                : myFormicForm.touched.email ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.email}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.email && myFormicForm.touched.email
              ? myFormicForm.errors.email
              : null}
          </div>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="password"> Password </label>
          <input
            name="password"
            type="password"
            className={
              'form-control' +
              (myFormicForm.errors.password && myFormicForm.touched.password
                ? ' is-invalid'
                : myFormicForm.touched.password ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.password}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.password && myFormicForm.touched.password
              ? myFormicForm.errors.password
              : null}
          </div>
        </div>

        <div className="form-group mb-2">
          <label htmlFor="confirmPassword"> Confirm Password </label>
          <input
            name="confirmPassword"
            type="password"
            className={
              'form-control' +
              (myFormicForm.errors.confirmPassword && myFormicForm.touched.confirmPassword
                ? ' is-invalid'
                : myFormicForm.touched.confirmPassword ? ' is-valid' : '')
            }
            onChange={myFormicForm.handleChange}
            value={myFormicForm.values.confirmPassword}
          />
          <div className="invalid-feedback">
            {myFormicForm.errors.confirmPassword && myFormicForm.touched.confirmPassword
              ? myFormicForm.errors.confirmPassword
              : null}
          </div>
        </div>

        <div className="form-group my-3 form-check">
          <input
            name="acceptTerms"
            type="checkbox"
            className='form-check-input' 
            onChange={myFormicForm.handleChange}
            checked={myFormicForm.values.acceptTerms} // Note: checked not value !!
          />
          <label htmlFor="acceptTerms" className="form-check-label">
            I have read and agree to the Terms
          </label>
          <div className="invalid-feedback">
            {myFormicForm.errors.acceptTerms && myFormicForm.touched.acceptTerms
              ? myFormicForm.errors.acceptTerms
              : null}
          </div>
        </div>

        {
          isHiddenFieldShow &&
          <div className="form-group mb-2">
            <label htmlFor="signature">signature</label>
            <input
              name="signature"
              type="text"
              className={
                'form-control' +
                (myFormicForm.errors.signature && myFormicForm.touched.signature
                  ? ' is-invalid'
                  : myFormicForm.touched.signature ? ' is-valid' : '')
              }
              onChange={myFormicForm.handleChange}
              value={myFormicForm.values.signature}
            />
            <div className="invalid-feedback">
              {myFormicForm.errors.signature && myFormicForm.touched.signature
                ? myFormicForm.errors.signature
                : null}
            </div>
          </div>
        }

        <div className={`${classes.actions} form-group mt-3`}>
          <button type="submit" className={`${classes.submit} btn btn-primary me-4`}>Confirm</button>
          <button className="btn btn-warning float-right" onClick={myFormicForm.handleReset}>Reset</button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
