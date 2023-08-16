import { FormEvent, useState } from "react";
import { Modal } from ".";
import { httpClient } from "../http";
import { ClientDTO } from "../interfaces";


interface Props {
	isOpen: boolean;
	onClose: () => void;
	mutateInfoClients: () => void;
}

export const CreateClientModal = ({ isOpen, onClose, mutateInfoClients}: Props) => {

	const [info, setInfo] = useState({
		name: "",
		curp: "",
		gender: "",
		birthdate: ""
	});

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault();

		await httpClient.post<ClientDTO>("customers",{...info});

		onClose();


		setInfo({
			name: "",
			curp: "",
			gender: "",
			birthdate: ""
		});

		mutateInfoClients();

	}

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={onSubmit}>
				<div className="mb-6">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-white"
					>
						Nombre completo
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="name"
						placeholder="Abraham Espinosa Mendoza"
						required
						name="name"
						type="text"
						onChange={(e)=> setInfo({...info, name: e.target.value})}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="curp"
						className="block mb-2 text-sm font-medium text-white"
					>
						CURP
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="curp"
						placeholder="EIMA011116HCCSNBA8"
						required
						name="curp"
						type="text"
						onChange={(e)=> setInfo({...info, curp: e.target.value})}
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="gender"
						className="block mb-2 text-sm font-medium text-white"
					>
						Sexo
					</label>
					<select
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="gender"
						required
						name="gender"
						onChange={(e)=> setInfo({...info, gender: e.target.value})}
						value={info.gender}
					>
						<option value="" disabled>Seleciona</option>
						<option value="HOMBRE">Masculino</option>
						<option value="MUJER">Femenino</option>
					</select>
				</div>
				<div className="mb-6">
					<label
						htmlFor="birthdate"
						className="block mb-2 text-sm font-medium text-white"
					>
						Fecha de nacimiento
					</label>
					<input
						className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
						id="birthdate"
						required
						name="birthdate"
						type="date"
						onChange={(e)=> setInfo({...info, birthdate: e.target.value})}
					/>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
				>
					Añadir cliente
				</button>
			</form>
		</Modal>
	);
};
