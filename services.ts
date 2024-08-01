import { api } from "src/boot/axios";   
import { notify } from "src/boot/notify-defaults";
import { IUserRegisterData } from "./interfaces";

export const fetchClients = async() => {
    try {
      const response = await api.get('/clients'); 
      
      return response;
    } catch (error) {
      console.error('Error al obtener clientes:', error);
      return [];
    }
};


export const fetchRoles = async() => {
    try {
      const response = await api.get('/roles'); 
      
      return response;
    } catch (error) {
      console.error('Error al obtener los roles:', error);
      return [];
    }
};

export const registerUserService = async (clientsData: IUserRegisterData): Promise<any> => {
    try{
        return await api.post('/users',clientsData);
    }catch (error: any){
        console.error(error);
        notify(`Ocurrió un error obtener los clientes: ${error?.response?.data?.message || 'Error desconocido'}`, 'negative');
        throw error;
    }
};

export const updateUserService = async(clientsData: IUserRegisterData): Promise<any> =>{
    let id = clientsData.is_da;
    //Update by ID
    return null;
};

export const deleteUserService = async(id: string): Promise<any> =>{
    //delet by ID
    return null;



};
