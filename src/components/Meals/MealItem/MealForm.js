import { useContext, useRef } from "react";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import classes from './MealForm.module.css';
import cartContext from "../../../store/Cart-Context";

const MealForm = (props) => {
  const cartctx = useContext(cartContext);
  const inputRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    cartctx.addItem(props.meal, +inputRef.current.value );
  }

  return(
    <form className={classes.form} onSubmit={submitHandler}>
      {/* ref={`${inputRef} + ${props.meal.id}`} */}
    <CustomInput 
      label="Amount"
      ref={inputRef}
      input={{
        id:'amount_' + Math.random().toFixed(4),
        type: 'number',
        max: 5,
        min: 1,
        step: 1,
        defaultValue: 1,
      }}
    />
    <button type="submit">+ Add</button>
  </form>
  )
}

export default MealForm;