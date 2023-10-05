import { IError, IFormData } from "../interfaces";

const emailRegExp = /^[\w\d]+@\w+\.\w{2,4}$/;
const phoneRegExp = /^\+?\d{10}$/;

export default  function checkErrors(formData: IFormData): IError[] {
   const errors: Array<IError> = [];

   if (formData.name.trim() === "") {
     errors.push({ name: "name", message: "This field is required" });
   }

   if (formData.email.trim() === "") {
     errors.push({ name: "email", message: "This field is required" });
   } else if (!emailRegExp.test(formData.email)) {
     errors.push({ name: "email", message: "Invalid email" });
   }

   if (formData.phoneNumber.trim() === "") {
     errors.push({ name: "phoneNumber", message: "This field is required" });
   } else if (!phoneRegExp.test(formData.phoneNumber.replaceAll(" ", ""))) {
     errors.push({ name: "phoneNumber", message: "Invalid phone number" });
   }

   return errors;
 };