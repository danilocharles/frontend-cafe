import validator from "validator";
import coffee from "../../images/Coffee.png";
import axios from "../../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  
	async function loginUser() {
	  if(!validator.isEmail(email)) {
		alert("Insira um e-mail válido")
		return
	  }
  
	  if(password.length < 6) {
		alert("Insira uma senha com 6+ caracteres")
		return
	  }
  
	  try {
		await axios.post('/login', {
		  email,
		  password
		} , {withCredentials: true})
		navigate('/')
	  // eslint-disable-next-line @typescript-eslint/no-explicit-any
	  } catch (e: any) {
		  e.response.data.errors.map((erro:string) => alert(erro))
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
					loginUser()
				}} className="flex flex-col justify-center items-center gap-12">
					<input
						type="text"
						name="email"
						id="email"
						className="bg-app-secondary p-1 shadow-xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						placeholder="Email"
						onChange={event => {setEmail(event.target.value)}}
					/>

					<input
						type="password"
						name="passwordUser"
						id="passwordUser"
						placeholder="Senha"
						className="bg-app-secondary p-1 shadow-2xl px-4 py-2 text-primary placeholder-slate-300 text-white"
						onChange={event => {setPassword(event.target.value)}}
					/>

					<button
	
						className="h-12 w-36 bg-app-secondary text-slate-50 rounded-lg cursor-pointer"
					>
						Entrar
					</button>

                    <a href="/register" className="text-app-orange stroke-app-orange">Registre-se</a>
				</form>
			</div>
		</div>
	);
}
