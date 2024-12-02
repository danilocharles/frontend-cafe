import { FaHome } from "react-icons/fa";
import coffee from "../../images/Coffee.png";
import { useEffect, useState } from "react";
import axios from "../../lib/axios";

type Pedido = {
	id?: number;
	id_cliente?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data_termino?: any;
	status?: string;
};

export function Takeout() {
	const [order, setOrder] = useState<Pedido>({});
	const [withdrawn, setWithdrawn] = useState("Buscar na loja");
	const param = window.location.pathname.split("/")[2];

	async function withdrawOrder() {
		await axios.put(`/order`, { id: param }, { withCredentials: true });
		setWithdrawn("Finalizado");
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function currentDate(dateTime: any) {
		const date = dateTime === null? new Date(): new Date(dateTime)
		const hours = date.getHours();
		const minutes = date.getMinutes();

		return `${hours < 10 ? `0${hours}` : hours}:${
			minutes < 10 ? `0${minutes}` : minutes
		}`;
	}

	useEffect(() => {
		async function getData() {
			const response = await axios.get(`/order/${param}`, {
				withCredentials: true
			});
			setOrder(response.data);
			setWithdrawn(order.status || "Buscar na loja");
			return;
		}
		getData();
	}, [order.status, param, setWithdrawn]);

	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<h1 className="text-center pt-4 text-3xl">Pedido</h1>

				<div className="flex w-full justify-center">
					<img src={coffee} alt="logo" className="size-64" />
				</div>

				<div className="flex justify-center">
					<h2 className="w-[400px] h-[100px] text-xl">
						Pedido para ser retirado no endereço: Unidade do Manaíra shopping,
						R. Manoel Arruda Cavalcante, 805 - Manaíra, João Pessoa - PB,
						58033-455
					</h2>
				</div>

				<div
					className={`w-[400px] h-[50px] ${
						withdrawn !== "Buscar na loja" ? "bg-zinc-600" : "bg-red-500"
					} flex items-center justify-center my-8 m-auto`}
				>
					<p>
						{withdrawn !== "Buscar na loja"
							? "Retirado"
							: "Pedido está sendo preparado"}
					</p>
				</div>

				<div className="flex flex-col gap-2">
					<div className="flex justify-between px-10">
						<p>Pedido criado</p>
						<p>{currentDate(order.data)}</p>
					</div>

					<div className="flex justify-between px-10">
						<p>Pedido retirado</p>
						<p>
							{withdrawn !== "Buscar na loja"
								? currentDate(order.data_termino)
								: "--:--"}
						</p>
					</div>
				</div>

				{withdrawn !== "Buscar na loja" ? (
					""
				) : (
					<div className="flex justify-center pt-8">
						<button
							type="button"
							className="h-14 w-60 bg-app-secondary text-slate-50 rounded-lg cursor-pointer"
							onClick={() => withdrawOrder()}
						>
							Pedido retirado
						</button>
					</div>
				)}

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
