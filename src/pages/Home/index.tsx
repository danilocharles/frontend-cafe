import { FaShoppingCart } from "react-icons/fa";
import coffeHome from "../../images/CoffeeHome.jpg";

export function Home() {
	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-full flex justify-center relative">
				<a href="/cart">
					<div className="relative left-[24.5rem] top-2 cursor-pointer">
						<FaShoppingCart color="white" size={28} className="absolute" />
					</div>
				</a>

				<img src={coffeHome} alt="café quentinho" className="w-[430px]" />
			</div>

			<div className="flex flex-col items-center w-full gap-16 py-28">
				<a href="/gourmet">
					<button
						type="button"
						className="h-[100px] w-[408px]  bg-app-secondary text-slate-50 rounded-lg cursor-pointer text-2xl"
					>
						Café Gourmet
					</button>
				</a>

				<a href="/traditional">
					<button
						type="button"
						className="h-[107px] w-[408px] bg-app-secondary text-slate-50 rounded-lg cursor-pointer text-2xl"
					>
						Cafés Tradicionais
					</button>
				</a>

				<a href="/history">
					<button
						type="button"
						className="h-[107px] w-[408px]  bg-app-secondary text-slate-50 rounded-lg cursor-pointer text-2xl"
					>
						Meus Pedidos
					</button>
				</a>
			</div>
		</div>
	);
}
