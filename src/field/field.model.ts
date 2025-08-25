import {
  ObjectType,
  Field,
  ID,
  Directive,
  registerEnumType,
  InputType
} from '@nestjs/graphql';

export enum FieldType {
  TEXT = 'text',
  SELECT = 'select'
}

export enum OrderType {
  NONE = 'none',
  ALPHABETICAL = 'alphabetical',
  REVERSE_ALPHABETICAL = 'reverse_alphabetical',
  CUSTOM = 'custom'
}

export enum SelectType {
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT'
}

registerEnumType(FieldType, {
  name: 'FieldType',
  description: 'The type of field'
});

registerEnumType(OrderType, {
  name: 'OrderType',
  description: 'The ordering type for field options'
});

registerEnumType(SelectType, {
  name: 'SelectType',
  description: 'The type of select field'
});

@InputType()
export class CreateFieldInput {
  @Field(() => String, { nullable: false })
  label: string;

  @Field(() => FieldType, { nullable: false })
  type: FieldType;

  @Field(() => Boolean, { nullable: true })
  isValueRequired?: boolean;

  @Field(() => String, { nullable: true })
  defaultValue?: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field(() => OrderType, { nullable: true })
  orderType?: OrderType;

  @Field({ nullable: true })
  placeholder?: string;

  @Field(() => SelectType, { nullable: true })
  selectType?: SelectType;
}

@InputType()
export class UpdateFieldInput {
  @Field({ nullable: true })
  label?: string;

  @Field(() => FieldType, { nullable: true })
  type?: FieldType;

  @Field({ nullable: true })
  isValueRequired?: boolean;

  @Field({ nullable: true })
  defaultValue?: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field(() => OrderType, { nullable: true })
  orderType?: OrderType;

  @Field({ nullable: true })
  placeholder?: string;

  @Field(() => SelectType, { nullable: true })
  selectType?: SelectType;
}

@ObjectType()
@Directive('@key(fields: "id")')
export class FieldModel {
  @Field(() => ID)
  id: string;

  @Field()
  label: string;

  @Field(() => FieldType)
  type: FieldType;

  @Field()
  isValueRequired: boolean;

  @Field()
  defaultValue: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field(() => OrderType)
  orderType: OrderType;

  @Field({ nullable: true })
  placeholder?: string;

  @Field(() => SelectType, { nullable: true })
  selectType?: SelectType;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
