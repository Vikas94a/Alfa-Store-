import { useContext } from "react";
import { Context } from "../App";

export default function CartView() {
  const context = useContext(Context);
  if (!context) {
    return <div>Loading....</div>;
  }
  const { cartItems, updateQuantity } = context;

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto p-4">
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
                  className="h-20 w-20 object-cover rounded"
                  src={item.thumbnail}
                  alt={item.title}
                />
              </td>
              <td className="p-4 font-medium">{item.title}</td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-4 bg-zinc-300 p-2 rounded">
                  <button 
                    onClick={() => updateQuantity(item.id, "decrease")}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "increase")}
                    className="w-6 h-6 flex items-center justify-center bg-white rounded-full hover:bg-green-500 hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="p-4 text-right">{item.price} kr</td>
              <td className="p-4 text-right font-bold">
                {Math.round((item.price * item.quantity)*100)/100} kr
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-800">Total Amount:</p>
          <p className="text-2xl font-bold text-blue-600">{Math.round(totalPrice*100)/100} kr</p>
        </div>
      </div>
    </div>
  );
}
