import { createSlice, current } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      // Redux Toolkit uses immer BTS
      // mutating the state here(directly modifying the existing state)
      state.items.push(action.payload);
    },
    removeItem: (state) => {
      state.items.pop();
    },
    // originalState= {item: ['pizza']}
    clearCart: (state) => {
      // RTK - either Mutate the existing state or return a new State

      // Mutating the state
      //   console.log(current(state));
      //   state = [];
      //   console.log(state);

      //   state.items.length = 0;
      //            ^
      //            |
      //            |

      return { items: [] }; //this new object will be replaced inside originalState= {[]}
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
