import { FaHome, FaShoppingCart } from "react-icons/fa";
import Coffee from "../../images/Coffeegourmet.png";
import Coffee2 from "../../images/CoffeeHome.jpg";
import axios from "../../lib/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type product = {
	id?: number;
	nome?: string;
	preco?: number;
	descricao?: string;
};

export function Product() {
	const param = window.location.pathname.split("/")[2];
	const [product, setProduct] = useState<product>({});
	const navigate = useNavigate()

	useEffect(() => {
		async function productDescription(): Promise<void> {
			try {
				const product = await axios.get(`/product/${param}`, {
					withCredentials: true
				});
				setProduct(product.data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				e.response.data.errors.map((erro: string) => alert(erro));
				return;
			}
		}
		productDescription();
		return;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function buy(): Promise<void> {
		try {
			await axios.post(`/cart`, { id: param }, { withCredentials: true });
			navigate('/cart')
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.log(e)
			return;
		}
	}


	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<div className="border border-black">
					<div className="w-full flex justify-center relative">
						<a href="/cart">
							<div className="relative left-[24.5rem] top-2 cursor-pointer">
								<FaShoppingCart color="brown" size={28} className="absolute" />
							</div>
						</a>

						<img
							src={param === "1" ? Coffee : Coffee2}
							alt="café quentinho"
							className="w-[430px]"
						/>
					</div>
				</div>

				<h2 className="text-center py-4 text-2xl">{product.nome}</h2>

				<h3 className="pl-4 text-2xl">{`R$ ${product.preco}`}</h3>

				<div className="flex items-center justify-center">
					<p className="my-10 w-[300px] h-[140px] text-2xl tracking-tighter">
						{product.descricao}
					</p>
				</div>

				<div className="flex justify-center">
				<button
					type="button"
					className="h-[107px] w-[408px] bg-app-secondary text-slate-50 rounded-lg cursor-pointer text-2xl"
					onClick={() => buy()}
				>
					Adicionar no carrinho
				</button>

				</div>

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
