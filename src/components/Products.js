import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import ProductItem from './ProductItem'

const Products = () => {
	const { products } = useContext(ShopContext)

	return (
		<div className="Products-wrapper">
			<div className="Product-wrapper">
				{products && products.map((product, i) => (
					<ProductItem key={product.id + i} product={product} />
				))}
			</div>
		</div>
	)
}

export default Products

