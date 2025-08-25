# Field Builder API

A GraphQL microservices architecture with Apollo Federation for dynamic form field management.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/dynamic-forms
MONGODB_DB_NAME=dynamic-forms
GATEWAY_PORT=3332
FIELD_PORT=3333
```

## Running the Services

### Start Field Microservice

```bash
npm run start:field
```

The field service will run on port **3333** (or the port specified in `FIELD_PORT` environment variable).

### Start Gateway Service

```bash
npm run start:gateway
```

The gateway service will run on port **3332** (or the port specified in `GATEWAY_PORT` environment variable).

GraphQL Playground will be available at: `http://localhost:3332/graphql`

### Run Both Services Simultaneously

To run both services at the same time, open two terminal windows and run each command in a separate terminal.

## API Endpoints

- **Gateway**: `http://localhost:3332/graphql`
- **Field Service**: `http://localhost:3333/graphql`

## Architecture

This project uses Apollo Federation to combine multiple GraphQL services into a unified API gateway. 