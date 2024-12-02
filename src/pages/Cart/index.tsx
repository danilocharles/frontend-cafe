import { FaHome } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import Coffee from "../../images/Coffeegourmet.png";
import Coffee2 from "../../images/CoffeeHome.jpg";



type product = {
	id?: number;
	nome?: string;
	preco?: number;
	descricao?: string;
	id_itemCart?: number;
};

type cart = {
	id?: number;
	id_carrinho?: string;
	id_item?: number;
	quantidade?: string;
};

export function Cart() {
	const [cart, setCart] = useState<cart[]>([]);
	const [products, setProducts] = useState<product[]>([]);
	const [subtotal, setSubtotal] = useState(0);
	const tariff = 1.99;

	useEffect(() => {
		async function cartItems(): Promise<void> {
			try {
				const cart = await axios.get(`/cart`, {
					withCredentials: true
				});
				setCart(cart.data);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				e.response.data.errors.map((erro: string) => alert(erro));
				return;
			}
		}
		cartItems();
		return;
	}, []);

	useEffect(() => {
		async function productDescription(cart: cart[]): Promise<void> {
			try {
				const products: product[] = [];
				for (const product of cart) {
					const item = await axios.get(`/product/${product.id_item}`, {
						withCredentials: true
					});

					products.push({ ...item.data, id_itemCart: product.id });
				}
				
				setProducts(products);
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				e.response.data.errors.map((erro: string) => alert(erro));
				return;
			}
		}
		productDescription(cart);
	}, [cart, setCart]);

	async function deleteProduct(product: product) {
		try {
			await axios.delete(`/cart/${product.id_itemCart}`, {
				withCredentials: true
			});
			const itemDelete = products.findIndex(productCart => Number(productCart.id_itemCart) === Number(product.id_itemCart))
			const newProducts = [...products]
			newProducts.splice(itemDelete, 1)
			setProducts(newProducts)
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		function commandValue() {
			const sumCommand = products.reduce(
				(value, sum) => value + Number(sum.preco),
				0
			);
			setSubtotal(sumCommand)
		}
		commandValue()
	}, [products])



	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<h1 className="text-3xl py-4 px-4">Itens adicionados</h1>

				<ul>
					{products.map((product) => (
						<li className="flex gap-4 py-8 px-4" key={product.id_itemCart}>
							<img
								src={product.id === 1 ? Coffee : Coffee2}
								alt="Café"
								className="size-32 border-y-[1px] border-x-[1px] border-black shadow-md"
							/>

							<div className="flex flex-col">
								<p className="text-xl">{product.nome}</p>
								<p className="text-green-600">{`R$ ${product.preco}`}</p>
								<p
									className="text-red-600 underline cursor-pointer mt-2"
									onClick={() => {
										deleteProduct(product);
										
									}}
								>
									Excluir
								</p>
							</div>
						</li>
					))}
				</ul>

				<div className="text-center py-4">
					<a href="/">Adicionar mais itens</a>
					<div className="bg-black h-[1px] opacity-25"></div>
				</div>

				<div className="px-4 flex flex-col gap-6">
					<h2 className="text-2xl">Resumo de valores</h2>
					<div className="flex justify-between">
						<p className="opacity-35">Subtotal</p>
						<p className="opacity-35">{`R$ ${subtotal}`}</p>
					</div>

					<div className="flex justify-between">
						<p className="opacity-35">Taxa de coveniência</p>
						<p className="opacity-35">R$ 1,99</p>
					</div>

					<div className="flex justify-between">
						<p className="text-xl">Total</p>
						<p className="text-xl">{`R$ ${subtotal + tariff}`}</p>
					</div>

					<a href="/locateTakeout">
						<button
							type="button"
							className="h-[100px] w-[408px] bg-app-secondary text-slate-50 rounded-lg cursor-pointer text-2xl mt-4"
						>
							Retirar na loja
						</button>
					</a>
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
