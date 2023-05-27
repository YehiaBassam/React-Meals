import { Fragment, useState } from "react";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartModal from "./components/Cart/CartModal";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isModalShow, setIsModalShow] = useState(false);
  const showModal = (bool) =>{
    setIsModalShow(bool)
  }

  return (
    <Fragment>
      <Header showCartModal={showModal} />
      <Meals />
      <CartModal showModal={isModalShow}/>
    </Fragment>
  );
}

export default App;
