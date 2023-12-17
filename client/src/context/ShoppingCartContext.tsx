import { ReactNode, createContext, useContext, useState } from "react";
import useLocalStorage from "../hook/useLocalStorage";
import { CartItemProps } from "../models/cartitem";
import { Product } from "../models/product";

// Adding Shopping Cart Provider

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextProps = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void; // <-- Corrected name
  removefromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItemProps[];
  addItemToCart: (product: Product) => void;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

// returning the children object

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  // rendering the cart
  const [isOpen, setIsOpen] = useState(false);
  console.log(`isOpen: ${isOpen}`);
  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>(" ", []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => {
    setIsOpen(false);
  };

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );

      // If the item with the given id is not in the cart, add it
      if (updatedItems.every((item) => item.id !== id)) {
        updatedItems.push({
          id,
          quantity: 1,
          _id: "",
          name: "",
          img: "",
          price: 0,
          parent: "",
        });
      }

      return updatedItems;
    });
  }
  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        }); //return end
      } //ifend
    }); //setend
  } //func end

  function removefromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  function addItemToCart(product: Product) {
    const newItem: Product = {
      id: product.id,
      _id: product._id,
      name: product.name,
      img: product.img,
      price: product.price,
      parent: product.parent,
      quantity: 1, // Set an initial quantity, you can adjust this as needed
    };

    // Add the new item to the cart
    // Ensure that you are updating the cartItems array correctly
    setCartItems((prevItems) => [...prevItems, newItem]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removefromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        addItemToCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
