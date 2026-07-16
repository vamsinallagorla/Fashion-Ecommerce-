import React from "react";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}) => {
  return (
    <div className="cart-card">
      <div className="cart-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-details">
        <h3>{item.name}</h3>

        <p className="cart-category">
          {item.category}
        </p>

        <p className="cart-price">
          ₹ {item.price}
        </p>

        {item.description && (
          <p className="cart-description">{item.description}</p>
        )}

        <div className="quantity-box">
          <button onClick={() => decreaseQuantity(item.id)}>
            -
          </button>

          <span>{item.quantity}</span>

          <button onClick={() => increaseQuantity(item.id)}>
            +
          </button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;