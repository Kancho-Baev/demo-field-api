import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig
} from '@nestjs/apollo';
import { FieldService } from './field.service';
import { FieldResolver } from './field.resolver';
import { Field, FieldSchema } from './field.schema';
import { config } from '../config/environment';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongodb.uri, {
      dbName: config.mongodb.dbName
    }),
    MongooseModule.forFeature([{ name: Field.name, schema: FieldSchema }]),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    })
  ],
  providers: [FieldService, FieldResolver],
  exports: [FieldService]
})
export class FieldModule {}
