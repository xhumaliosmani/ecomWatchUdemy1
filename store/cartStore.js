import {create} from 'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'

const useCartStore = create(
    persist((set,get)=> ({
        items: [],
        addItem: (item)=> set((state)=> {
            const existingItem = state.items.find((i)=> i._id === item._id);
            if(existingItem){
                return {items: state.items.map((i)=> i._id === item._id ? {...i, quantity: (i.quantity || 1) +1} : i),};
            }
            return {items: [...state.items, {...item, quantity: 1}]};

        }),
        removeItem: (itemId)=> 
            set((state)=> ({
                items: state.items.filter((item)=> item._id !== itemId),
                
            })),
            updateItemQuantity: (itemId, quantity)=> 
                set((state)=>({
                    items: state.items.map((item)=> item._id === itemId ? {...item, quantity: quantity} : item),
                })),
                clearCart: ()=> set({items: []}),
                getTotalItems: ()=> get().items.reduce((total, item)=> total + (item.quantity || 1), 0),
                getTotalPrice: ()=> get().items.reduce((total,item)=> total + item.price * (item.quantity || 1), 0),
    }), {
        name: "cart-storage",
        storage: createJSONStorage(()=> {
            if(typeof window !== "undefined") {
                return window.localStorage;
            }
            return {
                getItem: ()=> null,
                setItem: ()=>{},
                removeItem: ()=> {},
            }
        })
    })
);

export default useCartStore;



