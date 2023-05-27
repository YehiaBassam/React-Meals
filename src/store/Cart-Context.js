import { createContext, useState } from "react";

const cartContext = createContext({
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
});

export function CartContextProvider(props){
  const [ items, setItems ] = useState([]);
  const [ itemsQuantity, setItemsQuantity ] = useState(0);
  const [ itemsAmount, setItemsAmount ] = useState(0);

  const addItem = (item, quantity) => { 
    let existedItem = items.find(i => i.id === item.id);
    
    if (existedItem) {
      existedItem.quantity = existedItem.quantity + quantity; // Increment the quantity of the existing item
      setItems(oldItems => {
        const updatedItems = oldItems.map(i => i.id === existedItem.id ? existedItem : i);
        return [...updatedItems];
      });
    } else {
      item.quantity = quantity;
      setItems(oldItems => [...oldItems, item]);
      setItemsQuantity(prevQty => {
        return prevQty + 1;
      });
    }
    
    setItemsAmount(prevAmount => { 
      return +(prevAmount + (item.price * quantity)).toFixed(2);
    });
  };
  
  const removeItem = (item) => {
    const existedItem = items.find(i => i.id === item.id);

    if (existedItem.quantity > 1){
      existedItem.quantity--;
      setItems(oldItems => {
        const updatedItems = oldItems.map(i => i.id === existedItem.id ? existedItem : i);
        return [...updatedItems];
      });
    } else {
      const NewItems = items.filter(i => i.id !== item.id);
      setItems(NewItems);
      
      setItemsQuantity(prevQty => {
        return prevQty - 1;
      });
    }

    setItemsAmount(prevAmount => { 
      return +(prevAmount - (item.price)).toFixed(2);
    });
  };
  
  const context = {
    items,
    totalQuantity: itemsQuantity,
    totalAmount: itemsAmount,
    addItem,
    removeItem,
  }

  return (
    <cartContext.Provider value={context}>
      {props.children}
    </cartContext.Provider>
  )
}

export default cartContext;