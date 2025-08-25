import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FieldService } from './field.service';
import {
  FieldModel,
  CreateFieldInput,
  UpdateFieldInput,
  OrderType
} from './field.model';

@Resolver(() => FieldModel)
export class FieldResolver {
  constructor(private fieldService: FieldService) {}

  private transformField(field: any): FieldModel {
    if (!field) return null;

    const serializedField = field.toJSON ? field.toJSON() : field;

    return {
      id: serializedField._id?.toString() || serializedField.id,
      label: serializedField.label || '',
      type: serializedField.type,
      isValueRequired: serializedField.isValueRequired ?? false,
      defaultValue: serializedField.defaultValue ?? '',
      options: serializedField.options || [],
      orderType: serializedField.orderType ?? OrderType.NONE,
      placeholder: serializedField.placeholder || null,
      selectType: serializedField.selectType || null,
      createdAt: serializedField.createdAt,
      updatedAt: serializedField.updatedAt
    };
  }

  @Query(() => [FieldModel])
  async fields(): Promise<FieldModel[]> {
    const fields = await this.fieldService.findAll();
    return fields.map(field => this.transformField(field));
  }

  @Query(() => FieldModel, { nullable: true })
  async field(@Args('id') id: string): Promise<FieldModel | null> {
    const field = await this.fieldService.findById(id);
    return this.transformField(field);
  }

  @Mutation(() => FieldModel)
  async createField(@Args('data') data: CreateFieldInput): Promise<FieldModel> {
    const field = await this.fieldService.create(data);
    return this.transformField(field);
  }

  @Mutation(() => FieldModel, { nullable: true })
  async updateField(
    @Args('id') id: string,
    @Args('data') data: UpdateFieldInput
  ): Promise<FieldModel | null> {
    const field = await this.fieldService.update(id, data);
    return this.transformField(field);
  }

  @Mutation(() => Boolean)
  async deleteField(@Args('id') id: string): Promise<boolean> {
    return this.fieldService.delete(id);
  }
}
