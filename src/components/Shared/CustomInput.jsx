import classes from './CustomInput.module.css';
import { forwardRef } from 'react';

const CustomInput = forwardRef((props, ref) => {
  return(
    <div className={classes.input}>
      <label htmlFor={props.input.id} >{ props.label } </label>
      <input {...props.input} ref={ref}/>
    </div>
  )
})

export default CustomInput