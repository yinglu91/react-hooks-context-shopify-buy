import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'

const Home = () => {
	const { shop: shopDetails } = useContext(ShopContext)

	return (
		<div>
			<header className="App__header">
				<div className="App__title">
					<h1>{shopDetails.name}: React / Redux Example</h1>
					<h2>{shopDetails.description}</h2>
				</div>
			</header>
		</div>
	)
}

export default Home
