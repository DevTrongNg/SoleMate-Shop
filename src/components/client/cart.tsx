import React, { useEffect, useState } from "react";
import { ICartItem } from "../../interface/cart";

const Cart = () => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemove = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    alert("🗑️ Sản phẩm đã được xoá khỏi giỏ hàng!");
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Giỏ hàng đang trống.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border rounded-md shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <label htmlFor={`qty-${item.id}`}>Số lượng:</label>
                    <input
                      id={`qty-${item.id}`}
                      type="number"
                      min={1}
                      className="w-16 px-2 py-1 border rounded text-center"
                      value={item.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) && value > 0) {
                          const updated = cartItems.map((p) =>
                            p.id === item.id ? { ...p, quantity: value } : p
                          );
                          setCartItems(updated);
                        }
                      }}
                    />
                  </div>

                  <p>Đơn giá: {item.price.toLocaleString()} VND</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">
                  {(item.price * item.quantity).toLocaleString()} VND
                </p>
                <button
                  className="text-red-600 hover:underline mt-2"
                  onClick={() => handleRemove(item.id)}
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-8 border-t pt-4">
            <h3 className="text-xl font-bold">
              Tổng cộng: {totalPrice.toLocaleString()} VND
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
