import { createSlice } from "@reduxjs/toolkit";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

const initialState = {
  items: [],
  userInfo: {
    _id: "",
    userName: "",
    email: "",
    cart: [],
  },
};


export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push(action.payload);
      }
      syncCartToFirestore(state.items, state.userInfo._id); 
    },
    removeFromCart(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        if (state.items[existingItemIndex].quantity === 1) {
          state.items.splice(existingItemIndex, 1);
        } else {
          state.items[existingItemIndex].quantity--;
        }
      }

      syncCartToFirestore(state.items, state.userInfo._id); 
    },
    deleteItem(state, action) {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        state.items.splice(existingItemIndex, 1);
      }

      syncCartToFirestore(state.items, state.userInfo._id); 
    },
    setUserDetails(state, action) {
      state.userInfo = action.payload;
      state.items = state.items.length ? (state.items) : action.payload.cart;
      syncCartToFirestore(state.items, state.userInfo._id); 

    },
    userLogOut(state) {
      state.userInfo = {
        _id: "",
        userName: "",
        email: "",
        cart: state.userInfo.cart,
      };
      state.items = [];
    },

    clearItems(state){
      state.items = [];
    }
  },
});

const syncCartToFirestore = async (cart, userId) => {
  const db = getFirestore();
  if (userId) {
    const userDocRef = doc(db, "userData", userId);
    await updateDoc(userDocRef, {
      cart: cart,
    });
  }
};

export const amazonSliceActions = amazonSlice.actions;
export default amazonSlice.reducer;
