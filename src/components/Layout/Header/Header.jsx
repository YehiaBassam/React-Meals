import meals from '../../../assets/images/meals.jpg';
import classes from './header.module.css';
import HeaderCartBtn from './HeaderCartBtn';
import { Fragment } from "react";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header} >
        <h1>Meals</h1>
        <HeaderCartBtn showCartModal={props.showCartModal}/>
      </header>
      <div className={classes['main-image']}>
        <img src={meals} alt='meals'/>
      </div>
    </Fragment>
  )
};

export default Header;

