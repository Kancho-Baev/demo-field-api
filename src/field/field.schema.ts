import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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

@Schema({ timestamps: true })
export class Field extends Document {
  @Prop({ required: true, enum: FieldType })
  type: FieldType;

  @Prop({ required: true })
  label: string;

  @Prop({ required: false, default: false })
  isValueRequired?: boolean;

  @Prop({ required: false, default: '' })
  defaultValue?: string;

  @Prop({ required: false })
  placeholder?: string;

  @Prop({ required: false, enum: SelectType })
  selectType?: SelectType;

  @Prop({
    type: [String],
    required: false,
    default: [],
    validate: [
      {
        validator: function (this: Field, options: string[]) {
          if (options && options.length > 0) {
            if (this.type === FieldType.TEXT) {
              return false;
            }
          }
          return true;
        },
        message: 'Options should not be provided for text fields'
      },
      {
        validator: function (options: string[]) {
          if (options && options.length > 0) {
            return options.every(option => option.length <= 40);
          }
          return true;
        },
        message: 'Each option must not exceed 40 characters'
      }
    ]
  })
  options?: string[];

  @Prop({
    required: false,
    enum: OrderType,
    default: OrderType.NONE,
    validate: {
      validator: function (this: Field, orderType: OrderType) {
        if (this.type === FieldType.TEXT) {
          return !orderType || orderType === OrderType.NONE;
        }
        return true;
      },
      message: 'Order type should be NONE or undefined for text fields'
    }
  })
  orderType?: OrderType;
}

export const FieldSchema = SchemaFactory.createForClass(Field);

FieldSchema.set('toJSON', {
  transform: function (doc, ret) {
    if (
      ret.options &&
      ret.options.length > 0 &&
      ret.orderType &&
      ret.orderType !== OrderType.NONE
    ) {
      const options = [...ret.options];

      switch (ret.orderType) {
        case OrderType.ALPHABETICAL:
          ret.options = options.sort((a, b) => a.localeCompare(b));
          break;

        case OrderType.REVERSE_ALPHABETICAL:
          ret.options = options.sort((a, b) => b.localeCompare(a));
          break;

        case OrderType.CUSTOM:
          ret.options = options;
          break;

        default:
          ret.options = options;
      }
    }

    return ret;
  }
});

FieldSchema.set('toObject', {
  transform: FieldSchema.get('toJSON').transform
});
