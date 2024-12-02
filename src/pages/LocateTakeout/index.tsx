import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../lib/axios";

export function LocateTakeout() {
	const navigate = useNavigate();

	async function order(): Promise<void> {
		try {
			const order = await axios.post(`/order`, {ok: 'ok'}, {withCredentials: true});
			navigate(`/takeout/${order.data.id}`);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			console.log(e);
			return;
		}
	}
	return (
		<div className="min-h-screen bg-app-primary">
			<div className="w-[430px] m-auto">
				<h1 className="text-3xl py-4 px-6 w-[320px]">
					Lojas para retirar o pedido
				</h1>

				<p className="px-6 pb-6 text-xl">Parceiras em todo Brasil</p>

				<div className="flex flex-col gap-4">
					<div className="flex justify-between px-6">
						<h2 className="w-[310px] h-[130px] text-xl">
							Unidade do Manaíra shopping, R. Manoel Arruda Cavalcante, 805 -
							Manaíra, João Pessoa - PB, 58033-455
						</h2>
						<div>
							<input
								type="radio"
								name="a"
								id="a"
								checked
								className="w-16 h-16 rounded-full cursor-pointer flex items-center justify-center accent-[#1E7BAE]"
							/>
						</div>
					</div>
				</div>

				<div className="flex justify-center">
					<button
						type="button"
						className="h-14 w-60 bg-app-secondary text-slate-50 rounded-lg cursor-pointer"
						onClick={() => order()}
					>
						Finalizar pedido
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
