/// <reference types="node" />
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = {
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/dynamic-forms',
    dbName: process.env.MONGODB_DB_NAME || 'dynamic-forms'
  },
  services: {
    gateway: {
      port: parseInt(process.env.GATEWAY_PORT || '3332'),
      url: process.env.GATEWAY_URL || 'http://localhost:3332/graphql'
    },
    field: {
      port: parseInt(process.env.FIELD_PORT || '3333'),
      url: process.env.FIELD_URL || 'http://localhost:3333/graphql'
    }
  }
};
