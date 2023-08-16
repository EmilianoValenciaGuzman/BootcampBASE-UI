import { useMutation } from "@tanstack/react-query";
import { httpClient } from "../http";
import { Account, Client, Currency } from "../interfaces";


export const useGetCustomer = () =>{
    return useMutation({
        mutationKey: ["Customers"],
        mutationFn: async(name: string) => {
            const {data} = await  httpClient.get<Client[]>("/customers",{
                params: { name }
            })

            return data;
        }
    });
}


export const useGetCustomerById = () =>{
    return useMutation({
        mutationKey: ["Customers"],
        mutationFn: async(id: string) => {
            const {data} = await  httpClient.get<Client>("/customers/"+id,{
            })

            return data;
        }
    });
}

export const useGetAccountByIdCustomer = () =>{
    return useMutation({
        mutationKey: ["Accounts"],
        mutationFn: async(id: string) => {
            const {data} = await  httpClient.get<Account[]>("/Account/"+id,{
            })

            return data;
        }
    });
}

export const useGetDivisas = () =>{
    return useMutation({
        mutationKey: ["Currency"],
        mutationFn: async(_id: string) => {
            const {data} = await  httpClient.get<Currency[]>("/currency",{
            })
            return data;
        }
    });
}