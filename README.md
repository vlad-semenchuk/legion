<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Legion Monorepo

A NestJS monorepo structure with the Achievements API and shared libraries.

## Project Structure

```
legion/
├── apps/
│   ├── achievements/           # Achievements API service
│   │   ├── src/
│   │   │   ├── main.ts        # Application entry point
│   │   │   └── achievements/   # Core achievements module
│   │   │       ├── achievements.controller.ts
│   │   │       ├── achievements.module.ts
│   │   │       ├── badges.service.ts
│   │   │       ├── user-badges.service.ts
│   │   │       ├── dto/        # Data Transfer Objects
│   │   │       │   ├── create-badge.dto.ts
│   │   │       │   ├── assign-badge.dto.ts
│   │   │       │   └── index.ts
│   │   │       └── scripts/    # CLI scripts
│   │   │           └── assign-badge.cli.ts
│   │   └── test/
│   └── legion/                 # Default app (can be removed)
└── libs/
    ├── database/               # Database configuration
    │   ├── src/
    │   │   ├── database.module.ts
    │   │   ├── database.service.ts
    │   │   ├── typeorm.config.ts
    │   │   ├── datasource.ts
    │   │   └── index.ts
    │   └── migrations/         # Database migrations
    └── core/                   # Shared utilities
        └── src/
            ├── core.module.ts
            ├── core.service.ts
            ├── app-builder.ts  # Global pipes, Swagger, CORS setup
            └── index.ts
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL

### Installation

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (make sure it's running)
# Create database: legion_achievements

# Start the achievements service in development mode
pnpm run start:dev achievements
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=legion_achievements

# Application
NODE_ENV=development
PORT=3000

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Available Commands

```bash
# Development
pnpm run start:dev achievements    # Start achievements service in watch mode
pnpm run start:dev legion         # Start default service

# Production
pnpm run build                    # Build all apps and libs
pnpm run start:prod achievements  # Start achievements service in production mode

# Testing
pnpm run test                     # Run unit tests
pnpm run test:e2e                 # Run end-to-end tests

# Linting
pnpm run lint                     # Run ESLint
pnpm run format                   # Run Prettier
```

## API Documentation

When the achievements service is running, you can access:

- **Swagger UI**: http://localhost:3000/api/docs
- **API Base URL**: http://localhost:3000/achievements

### API Endpoints

#### Badges Management
- `GET /achievements/badges` - Get all badges
- `GET /achievements/badges/:id` - Get badge by ID
- `POST /achievements/badges` - Create a new badge

#### User Badges Management
- `GET /achievements/users/:userId/badges` - Get user's badges
- `POST /achievements/users/:userId/badges/:badgeId` - Assign badge to user
- `DELETE /achievements/users/:userId/badges/:badgeId` - Revoke badge from user

## CLI Tools

### Assign Badge CLI

```bash
# Using ts-node directly
npx ts-node apps/achievements/src/achievements/scripts/assign-badge.cli.ts <userId> <badgeId> [assignedBy]

# Example
npx ts-node apps/achievements/src/achievements/scripts/assign-badge.cli.ts user123 1 admin
```

## Architecture

### Shared Libraries

- **@app/core**: Contains the `AppBuilder` utility for setting up global pipes, Swagger documentation, CORS, and other common application configurations.
- **@app/database**: Contains TypeORM configuration, database module, and migration setup.

### Services

- **BadgesService**: Manages badge definitions and CRUD operations
- **UserBadgesService**: Manages user-badge assignments and relationships

### Features

- ✅ Modular monorepo structure
- ✅ TypeScript configuration
- ✅ Swagger API documentation
- ✅ Global validation pipes
- ✅ CORS support
- ✅ Database configuration with TypeORM
- ✅ CLI tools for badge management
- ✅ In-memory data storage (ready for database integration)

## Next Steps

1. **Database Integration**: Replace in-memory storage with actual database entities
2. **Authentication**: Add JWT authentication and authorization
3. **Real-time Updates**: Add WebSocket support for real-time badge notifications
4. **Caching**: Implement Redis caching for performance
5. **Testing**: Add comprehensive unit and integration tests
6. **Deployment**: Add Docker configurations and CI/CD pipelines

## Development

This project follows NestJS conventions and best practices:

- Modular architecture with feature-based organization
- Dependency injection for loose coupling
- DTOs for request/response validation
- Shared libraries for reusable code
- CLI tools for administrative tasks
