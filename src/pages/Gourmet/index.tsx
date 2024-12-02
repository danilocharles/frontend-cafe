import { FaHome, FaShoppingCart } from "react-icons/fa";
import Coffee from "../../images/Coffee.png";
import CoffeGourmet from "../../images/Coffeegourmet.png";

export function Gourmet() {
	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<header className="w-full flex justify-center">
					<h1 className="text-2xl py-4">Cafés gourmets</h1>

					<a href="/cart">
						<FaShoppingCart
							color="black"
							size={28}
							className="relative top-[1rem] left-24 cursor-pointer"
						/>
					</a>
				</header>

				<div className="flex justify-between">
					<img src={Coffee} alt="logo" className="size-64" />

					<div className="flex items-center">
						<p>Os melhores cafés gourmets da Paraíba</p>
					</div>
				</div>

				<main className="flex flex-col gap-y-10 last">
					<a href="/product/1">
						<div className="flex gap-4 px-8 cursor-pointer">
							<img
								src={CoffeGourmet}
								alt="Café gourmet"
								className="size-32 border-y-[1px] border-x-[1px] border-black shadow-md"
							/>

							<p>Café baggio com chocolate trufado e chantily</p>
						</div>
					</a>
				</main>

				<footer className="h-20 flex justify-center">
					<div className="fixed bottom-0 bg-app-primary px-[215px]">
						<a href="/">
							<FaHome className="size-16 cursor-pointer" />
						</a>
					</div>
				</footer>
			</div>
		</div>
	);
}
