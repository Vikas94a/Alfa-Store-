import { useContext, useReducer } from "react";
import { Context } from "../App";

export default function CartView() {
  const context = useContext(Context);
  if (!context) {
    return <div>Loading....</div>;
  }
  const { cartItems, updateQuantity } = context;

  return (

    <div className="container mx-auto p-4 " >
      <h1 className="text-5xl font-bold text-center mb-8">Shopping Cart</h1>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4">Item</th>
            <th className="text-left p-4">Name</th>
            <th className="text-center p-4">Quantity</th>
            <th className="text-right p-4">Price</th>
            <th className="text-right p-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} className="border-b relative">
              <td className="p-4">
                <img
                  className="h-20 w-20 object-cover"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </td>
              <td className="p-4 font-medium">{item.title}</td>
              <div className="flex items-center justify-center gap-4 bg-zinc-300 p-2 rounded">
                <button onClick={() => updateQuantity(item.id, "decrease")}>
                  -
                </button>
                <td className="font-medium">{item.quantity}</td>
                <button
  className="bg-white rounded-full h-4 w-4 flex items-center justify-center text-black  font-bold"
  onClick={() => updateQuantity(item.id, "increase")}
>
  +
</button>
              </div>

              <td className="p-4 text-right">{item.price} kr</td>
              <td className="p-4 text-right font-bold">
                {item.price * item.quantity} kr
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
