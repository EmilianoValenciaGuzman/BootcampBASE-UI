import { IconCoin } from "@tabler/icons-react";
import { DropdownOrderBy, Header, SearchInput } from "../components";
import { useEffect, useState } from "react";
import {Currency as ICurrency} from "../interfaces"
import {currenciesMock} from "../mocks";
import { Currency } from "../components/Currency";

export const Currencies = () => {

	const [currencies, setCurrency] = useState<ICurrency[]>([]);
	const [currenOrderOption, setCurrenOrderOption] = useState("symbol");
	const orderOptions : {label: string; value: string}[]=[
        {label: "Nombre",value: "name",},
        {label: "Simbolo", value: "symbol",},
        {label: "valor",value: "value",}
    ];
	
	useEffect(() => {
        setCurrency(currenciesMock);
        setCurrency((prevState) => orderCurrency(prevState, currenOrderOption));
    }, []);

	const orderCurrency = (clients: ICurrency[], currenOrderOption: string,): ICurrency[] => {
		const key = currenOrderOption as keyof (typeof clients)[0];
		const newClients: ICurrency[] = clients.sort((a: ICurrency, b: ICurrency) => {
            if (a[key] > b[key]) return 1;
            if (a[key] < b[key]) return -1;
            return 0;
        });
        return newClients;
    };

	const handleDropdown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrenOrderOption(e.target.value);
		setCurrency(orderCurrency(currencies, e.target.value));
    };

	const handleSearchC = (SearchWord : string) => {
		if(SearchWord === ""){
			setCurrency(currenciesMock);
		}else{
			const newCurrency = currenciesMock.filter((currenc)=>{
				if(SearchWord === currenc.symbol){
					return currenc;
				}
			});
			setCurrency(newCurrency);
		}
    };

	return (
		<>
			<Header>
				<h1 className="text-3xl font-bold tracking-tight text-gray-900">
					Divisas
				</h1>
				<div className="flex sm:w-96 w-full gap-2">
					<DropdownOrderBy
						onChange={handleDropdown}
						options={orderOptions}
						value={currenOrderOption}
					/>
					<SearchInput
						Icon={IconCoin}
						onSearch={(e)=>handleSearchC(e.target.value)}
						propertie="divisa"
					/>
				</div>
			</Header>

			<section className="flex flex-col items-center h-[calc(100vh-10rem)] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<ul
					role="list"
					className="grid w-full gap-3 overflow-auto divide-y divide-gray-100 sm:grid-cols-2 xl:grid-cols-4 my-7"
				>
					{

					currencies.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full">
					<p className="text-3xl font-bold text-center">
						¡Ay no! :(
					</p>
					<p className="mt-5 text-lg text-center">
						No se ven divisas, ya fuiste
					</p>

					</div>) : 
					currencies.map ((currency) => (
						< Currency currency={currency} key= {currency.symbol} />
					))
					}
				</ul>
			</section>
		</>
	);
};
