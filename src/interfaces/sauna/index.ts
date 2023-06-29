import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface SaunaInterface {
  id?: string;
  type: string;
  door: string;
  window: string;
  wood: string;
  fabric: string;
  roof: string;
  color: string;
  warm_generator: string;
  company_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  _count?: {};
}

export interface SaunaGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  door?: string;
  window?: string;
  wood?: string;
  fabric?: string;
  roof?: string;
  color?: string;
  warm_generator?: string;
  company_id?: string;
}
