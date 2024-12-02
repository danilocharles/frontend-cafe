import { FaHome, FaShoppingCart } from "react-icons/fa";
import coffee from "../../images/Coffee.png";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

type pedido = {
	id?: number;
	id_cliente?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data_termino?: any;
	status?: string;
};

export function History() {
	const navigate = useNavigate();

	const [order, setOrder] = useState<pedido[]>([{}]);
	useEffect(() => {
		async function getData() {
			const order = await axios.get("/order", { withCredentials: true });
			setOrder(order.data);
		}
		getData();
	}, []);

	function acessTakeout(order: pedido) {
		navigate(`/takeout/${order.id}`);
	}

	function data(order: pedido) {
		const date = new Date(order.data);
		const day = date.getDay();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		return `${day < 10? `0${day}`: `${day}`}/${month < 10? `0${month}`: `${month}`}/${year < 10? `0${year}`: `${year}`}`;
	}

	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<header className="flex justify-end py-4 px-4 w-full">
					<a href="/cart">
						<FaShoppingCart
							color="black"
							size={28}
							className="cursor-pointer"
						/>
					</a>
				</header>

				<div className="flex w-full justify-center pb-2">
					<img src={coffee} alt="logo" className="size-64" />
				</div>

				<main className="flex flex-col gap-10 items-center">
					{order.map((order) => (
						<div
							className="w-[400px] h-[150px] bg-coffee bg-cover flex flex-col justify-between text-white cursor-pointer"
							key={order.id}
							onClick={() => acessTakeout(order)}
						>
							<div className="flex justify-between">
								<p
									className={`w-[125px] h-[36px] rounded-br-[20px] flex justify-center items-center  -ml-[1.5px] border-l-2  ${
										order.status !== "Buscar na loja"
											? "bg-zinc-600 border-zinc-600"
											: "bg-red-500 border-red-500"
									}`}
								>
									{order.status}
								</p>
								<p className="break-words w-[160px] h-[38px] ">
									Unidade do Manaíra shopping, R. Manoel Arruda Cavalcante
								</p>
							</div>

							<div className="py-2 px-2">
								<p className="break-words">
									{data(order)}
								</p>
							</div>
						</div>
					))}
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
