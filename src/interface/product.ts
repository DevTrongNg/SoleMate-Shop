import { ICategory } from "./category"

export interface IProduct {
  id:string|number,
  name:string,
  price:number,
  image:string,
  // description:string,
  categoryId: string|number
}
export type IProductForm = Omit<IProduct,"id">