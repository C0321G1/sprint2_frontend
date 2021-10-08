import {Customer} from '../customer/customer';
import {StatusContract} from './status-contract';
import {TypeContract} from './type-contract';
import {TypeProduct} from './type-product';

export interface Contract {
  contractId: number;
  contractCode: string;
  startDate: string;
  endDate: string;
  dateLiquidation: string;
  flag: number;
  loan: number;
  productImage: string;
  productName: string;
  profit: number;
  totalMoney: number;
  customer: Customer;
  statusContract: StatusContract;
  typeContract: TypeContract;
  typeProduct: TypeProduct;
}
