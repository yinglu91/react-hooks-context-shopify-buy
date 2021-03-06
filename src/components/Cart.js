import React, { useEffect } from 'react'
import { useShopContext } from '../context/shopContext'
import { MdShoppingCart, MdRemoveShoppingCart } from "react-icons/md"
import LineItem from "./LineItem"

const Cart = () => {
	const {
		cartStatus,
		closeCart,
		openCart,
		checkout,
		setCount,
	} = useShopContext()

	function handleOpen(e) {
		e.preventDefault()
		openCart()
	}

	function handleClose(e) {
		e.preventDefault()
		closeCart()
	}

	function openCheckout(e) {
		e.preventDefault()
		// window.open(checkout.webUrl) // opens checkout in a new window
		window.location.replace(checkout.webUrl) // opens checkout in same window
	}

	useEffect(() => {
		const button = document.querySelector("button.App__view-cart")
		if (cartStatus === true) {
			button.classList.add("hide")
		} else {
			button.classList.remove("hide")
		}

		function getCount() {
			let lineItems =
				checkout.lineItems && checkout.lineItems.length > 0
					? checkout.lineItems
					: []
			let count = 0
			lineItems.forEach((item) => {
				count += item.quantity
				return count
			})

			setCount(count)
		}

		getCount()
	}, [cartStatus, checkout])

	return (
		<div id="cart">
			<div className={`Cart ${cartStatus ? "Cart--open" : ""}`}>
				<div className="App__view-cart-wrapper2">
					<button className="App__view-cart" onClick={(e) => handleOpen(e)}>
						<MdShoppingCart />
					</button>
				</div>
				<header className="Cart__header">
					<h2>Your cart</h2>
					<button className="Cart__close" onClick={(e) => handleClose(e)}>
						<MdRemoveShoppingCart />
					</button>
				</header>
				<ul className="Cart__line-items">
					<LineItem />
				</ul>
				<footer className="Cart__footer">
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Subtotal</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout.subtotalPrice}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Taxes</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout.totalTax}</span>
						</div>
					</div>
					<div className="Cart-info clearfix">
						<div className="Cart-info__total Cart-info__small">Total</div>
						<div className="Cart-info__pricing">
							<span className="pricing">$ {checkout.totalPrice}</span>
						</div>
					</div>
					<button
						className="Cart__checkout button"
						onClick={(e) => openCheckout(e)}
					>
						Checkout
					</button>
				</footer>
			</div>
		</div>
	)
}

export default Cart
