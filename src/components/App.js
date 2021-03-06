import React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Products from "./Products"
import Cart from "./Cart"
import Home from "./Home"
import ProductView from "./ProductView"

const App = () => {
	return (
		<Router>
			<div id="App">
				<Route exact path="/" render={() => <Redirect to="/home" />} />
				<Route path="/home" component={Home} />
				<Route path="/home" component={Products} />
				<Route path="/products/:handle" component={ProductView} />
				<Route path="/" component={Cart} />
			</div>
		</Router>
	)
}

export default App
