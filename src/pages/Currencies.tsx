import { IconCoin } from "@tabler/icons-react";
import { DropdownOrderBy, Header, SearchInput } from "../components";
import { useEffect, useState } from "react";
import { Currency as ICurrency } from "../interfaces";
import { Currency } from "../components/Currency";
import { useGetDivisas } from "../api";
import { FetchingData } from "../components/FetchingData";

//TODO Renderizar arreglo de currencies
//TODO Crear condicion en caso de que no haya datos
//TODO Hacer el ordenado
//TODO Crear handleDropdown para ordenar
//TODO Crear handleSearch filtrar el arreglo

export const Currencies = () => {
	const [currencies, setcurrency] = useState<ICurrency[]>([]);
    const [currenOrderOption, setCurrenOrderOption] = useState("symbol");

	const orderOptions : {label: string; value: string}[]=[
        {label: "Nombre",value: "name",},
        {label: "Simbolo", value: "symbol",},
        {label: "valor",value: "value",}
    ];

	const [search, setSearch] = useState("");
	const {isError, isLoading, mutate} = useGetDivisas()

	useEffect(() => {
		mutate(search,{
			onSuccess: (data) => setcurrency(data)
		});

    }, [search]);

	const orderCurrency = (clients: ICurrency[], currenOrderOption: string,): ICurrency[] => {
    	let key = currenOrderOption as keyof (typeof clients)[0];
    	const newClients: ICurrency[] = clients.sort((a: ICurrency, b: ICurrency) => {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
        return newClients;
    };

	const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrenOrderOption(e.target.value);
        setcurrency(orderCurrency(currencies, e.target.value));
    };

	
	// const handleSearchC = (SearchWord : string) => {
	// 	if(SearchWord === ""){
	// 		setcurrency(currenciesMock);
	// 	}else{
	// 		let newCurrency = currenciesMock.filter((currenc)=>{
	// 			if(SearchWord === currenc.symbol){
	// 				return currenc;
	// 			}
	// 		});
	// 		setcurrency(newCurrency);
	// 	}
    // };

	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Divisas
				</h1>
				<div className="flex w-full gap-2 sm:w-96">
					<DropdownOrderBy
						onChange={handleDropdown}
						options={orderOptions}
						value={currenOrderOption}
					/>
					<SearchInput
						Icon={IconCoin}
						onSearch={(e)=>setSearch(e.target.value)}
						propertie="divisa"
					/>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<FetchingData isLoading={isLoading} isError={isError}>
					<ul role="list" 
						className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7"
					>
						{currencies.map((currency) => (
							<Currency currency={currency} key = {currency.symbol}/>
						))}
					</ul>
				</FetchingData>
				<ul
					role="list"
					className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7"
				></ul>
			</section>
		</>
	);
};
