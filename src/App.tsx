import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Page404 } from "./pages/Page404/index";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Traditional } from "./pages/Traditional";
import { Gourmet } from "./pages/Gourmet";
import { History } from "./pages/History";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import { LocateTakeout } from "./pages/LocateTakeout";
import { Takeout } from "./pages/Takeout";


const router = createBrowserRouter([
	{
		path: "*",
		element: <Page404 />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/register",
		element: <Register />
	},
	{
		path: "/",
		element: <Home />
	},
	{
		path: "/traditional",
		element: <Traditional />
	},
	{
		path: "/gourmet",
		element: <Gourmet />
	},
	{
		path: "/history",
		element: <History />
	},
	{
		path: "/cart",
		element: <Cart />
	},
	{
		path: "/product/1",
		element: <Product />
	},
	{
		path: "/product/2",
		element: <Product />
	},
	{
		path: "/locatetakeout",
		element: <LocateTakeout />
	},
	{
		path: "/takeout/:id",
		element: <Takeout />
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
