import CartIcon from '../../Cart/CartSummary/CartIcon';
import classes from './HeaderCartBtn.module.css';
import CartModal from '../../Cart/CartModal';
import { useContext, useEffect, useState } from 'react';
import cartContext from '../../../store/Cart-Context';

const HeaderCartBtn = (props) => {  
  const [isCartShow, setIsCartShow] = useState(false);
  const cartctx = useContext(cartContext);
  const [isBtnAnimated, setIsBtnAnimated] = useState(false);
  const btnClasses = `${classes.button} ${isBtnAnimated ? classes.bump : ''}`;
  
  useEffect(() => { // add animation
    setIsBtnAnimated(true);
    const timer = setTimeout(() => {
      setIsBtnAnimated(false);
    }, 300);
    
    return () => {
      clearTimeout(timer);
    }
  }, [cartctx.items])

  return (
    <>
    <button className={btnClasses} onClick={() => setIsCartShow(true)}>
    {/* <button className={classes.button} onClick={props.showCartModal}> */}
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ cartctx.totalQuantity }</span>  
    </button>

    <CartModal 
      showModal={isCartShow} 
      closeModal={() => setIsCartShow(false)} 
      totalAmount={cartctx.totalAmount}
      items={cartctx.items}
    />

    </>
  );
};

export default HeaderCartBtn;