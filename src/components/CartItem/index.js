import {BiRupee} from 'react-icons/bi'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import KitchenContext from '../../context/KitchenContext'

import './index.css'

const CartItem = props => {
  const {cartDetails, onCartIncrement, onCartDecrement} = props
  const {id, name, imageUrl, cost, quantity} = cartDetails

  const onClickIncrementQuantity = () => {
    onCartIncrement(id)
  }

  const onClickDecrementQuantity = () => {
    onCartDecrement(id)
  }

  return (
    <KitchenContext.Consumer>
      {value => {
        const {activeTheme} = value

        const cartItemHeading = activeTheme === 'light' ? '#183b56' : '#f1f1f1'
        const val = name

        return (
          <li className="cart-list-items" testid="cartItem">
            <div className="cart-logo-container">
              <img src={imageUrl} alt="cart-item" className="cart-item-logo" />
              <h1
                className="cart-item-name-lg"
                style={{color: `${cartItemHeading}`}}
              >
                {name}
              </h1>
            </div>
            <div className="small-cart-container">
              <p
                className="cart-item-name-sm"
                style={{color: `${cartItemHeading}`}}
              >
                {val}
              </p>

              <div className="cart-btn-container">
                <button
                  type="button"
                  testid="decrement-quantity"
                  className="icon-btn-dash"
                  onClick={onClickDecrementQuantity}
                  style={{color: `${cartItemHeading}`}}
                >
                  <BsDashSquare />
                </button>
                <p
                  className="add-item-text"
                  style={{color: `${cartItemHeading}`}}
                  testid="item-quantity"
                >
                  {quantity}
                </p>
                <button
                  type="button"
                  testid="increment-quantity"
                  className="icon-btn-plus"
                  onClick={onClickIncrementQuantity}
                  style={{color: `${cartItemHeading}`}}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <div className="cart-cost">
                <p className="cart-cost-name" testid="total-price">
                  <span className="cart-icon">
                    {' '}
                    <BiRupee />
                  </span>
                  {cost}.00
                </p>
              </div>
            </div>
          </li>
        )
      }}
    </KitchenContext.Consumer>
  )
}

export default CartItem
