export interface IAddress {
   id: number;
   line_1: string;
   line_2?: string;
   city?: string;
   state?: string;
   zip_code?: string;
   latitude?: string;
   longitude?: string;
   description?: string;
}
