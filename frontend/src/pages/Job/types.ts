import { IAddress } from '../../types';

export interface IJobFormData {
   address_from: IAddress;
   address_to: IAddress;
   title: string;
   description: string;
   volume: string;
   price: string;
}
