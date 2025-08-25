import {
  Field as FieldSchema,
  FieldType,
  OrderType,
  SelectType
} from './field.schema';

export interface FieldDocument extends Omit<FieldSchema, '_id'> {
  _id: string;
  id: string;
}

export interface CreateFieldInput {
  label: string;
  type: FieldType;
  isValueRequired?: boolean;
  defaultValue?: string;
  options?: string[];
  orderType?: OrderType;
  placeholder?: string;
  selectType?: SelectType;
}

export interface UpdateFieldInput {
  label?: string;
  type?: FieldType;
  isValueRequired?: boolean;
  defaultValue?: string;
  options?: string[];
  orderType?: OrderType;
  placeholder?: string;
  selectType?: SelectType;
}
