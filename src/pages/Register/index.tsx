import { useState } from "react";
import coffee from "../../images/Coffee.png";
import validator from "validator"
import axios from "../../lib/axios";
import { useNavigate } from "react-router-dom";

export function Register() {
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const [cpf, setCpf] = useState("")

	async function createUser(): Promise<void> {
		
		
		if(!validator.isEmail(email)) {
			alert("Insira um e-mail válido")
			return
		}

		if (password.length < 6) {
			alert("Insira uma senha com 6+ caracteres");
			return;
		  }
	  
		  if (!name) {
			alert("Insira o seu nome");
			return;
		  }

		  try {
			await axios.post("/register", {
				name,
				email,
				password,
				cpf
			})
			alert("Cadastro realizado, vá para área de login")
			navigate('/login')
		  // eslint-disable-next-line @typescript-eslint/no-explicit-any
		  } catch (e: any) {
			e.response.data.errors.map((erro: string) => alert(erro));
			return
		  }
	}

	return (
		<div className="min-h-screen bg-app-primary">
			
			<div className="flex w-full justify-center pt-4">
				<img src={coffee} alt="logo" className="size-64" />
			</div>

			<div className="flex w-full justify-center py-8">
				<form onSubmit={(e) => {
					e.preventDefault()
					createUser()
					}} className="flex flex-col justify-center items-center gap-5">
					<input
						type="text"
						name="email"
						id="email"
						className="bg-app-secondary p-1 shadow-xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
					/>

					<input
						type="text"
						name="name"
						id="name"
						placeholder="Nome"
						className="bg-app-secondary p-1 shadow-2xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						onChange={(e) => {
							setName(e.target.value)
						}}
					/>

<input
						type="password"
						name="passwordUser"
						id="passwordUser"
						placeholder="Senha"
						className="bg-app-secondary p-1 shadow-2xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						onChange={(e) => {
							setPassword(e.target.value)
						}}
					/>

<input
						type="text"
						name="cpf"
						id="cpf"
						placeholder="CPF"
						className="bg-app-secondary p-1 shadow-2xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						onChange={(e) => {
							setCpf(e.target.value)
						}}
					/>

					<button
						
						className="h-12 w-36 bg-app-secondary text-slate-50 rounded-lg cursor-pointer"
					>
						Criar
					</button>

                    <a href="/login" className="text-app-orange stroke-app-orange">Login</a>
				</form>
			</div>
			
		</div>
	);
}
