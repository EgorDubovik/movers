export interface IRegisterFormData {
   companyName: string;
   userName: string;
   email: string;
   password: string;
   passwordConfirm: string;
   secretKey: string;
}

export interface ILoginFormData {
   email: string;
   password: string;
}
