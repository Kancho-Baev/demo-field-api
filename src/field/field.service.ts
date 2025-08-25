import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from './field.schema';
import { CreateFieldInput, UpdateFieldInput } from './field.types';

@Injectable()
export class FieldService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  async findAll(): Promise<Field[]> {
    return this.fieldModel.find().exec();
  }

  async findById(id: string): Promise<Field | null> {
    return this.fieldModel.findById(id).exec();
  }

  async create(fieldData: CreateFieldInput): Promise<Field> {
    const field = new this.fieldModel(fieldData);
    return field.save();
  }

  async update(id: string, fieldData: UpdateFieldInput): Promise<Field | null> {
    return this.fieldModel
      .findByIdAndUpdate(id, fieldData, { new: true })
      .exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.fieldModel.findByIdAndDelete(id).exec();
    return !!result;
  }
}
