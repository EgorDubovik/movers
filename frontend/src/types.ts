export interface IAddress {
   id: number;
   line_1?: string;
   line_2?: string;
   city?: string;
   state?: string;
   zip_code?: string;
   latitude?: string;
   longitude?: string;
   description?: string;
}

export interface ICompany {
   id: number;
   name: string;
}

export interface IJob {
   id: number;
   title: string;
   description?: string;
   company: ICompany;
   status: string;
   pickupLocation: IAddress;
   deliveryAddress: IAddress;
   volume: string;
   price: string;
   deliveryDate?: string;
   posted?: string;
}
