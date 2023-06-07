import 'bootstrap/dist/css/bootstrap.min.css';
import { Fragment, useState } from "react";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartModal from "./components/Cart/CartModal";
import GlobalToast from "./components/Shared/Toast/GlobalToast.module";

function App() {
  const [isModalShow, setIsModalShow] = useState(false);
  const showModal = (bool) =>{
    setIsModalShow(bool)
  }

  return (
    <Fragment>
      <GlobalToast/>
      <Header showCartModal={showModal} />
      <Meals />
      <CartModal showModal={isModalShow}/>
    </Fragment>
  );
}

export default App;
