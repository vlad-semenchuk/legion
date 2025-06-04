# Legion Home Task - NestJS Achievements System

A NestJS-based achievements system that rewards users with badges based on their activity across different platforms (on-chain, Discord, Twitter, Telegram).

## 🎯 Task Overview

This project implements **Legion Achievements** - a foundational system for managing user badges and achievements. The system includes:

- ✅ **Badge Management**: Define and create badge types in the database
- ✅ **CSV-based Badge Assignment**: Scripts to assign badges using CSV data files
- ✅ **RESTful API**: Endpoints to retrieve user achievements and available badges
- ✅ **Swagger Documentation**: Complete API documentation
- ✅ **E2E Testing**: Comprehensive test coverage
- ✅ **Automatic Badge Assignment**: Auto-assign badges to new users when they match achievement criteria

## 🚀 Key Features

### Badge Types Supported

- **On-chain Badges**: For users with Ethereum wallets (Early Staker)
- **Twitter Badges**: For users with active Twitter presence (Ecosystem Voice)
- **Extensible**: Ready for Discord and Telegram badges

### Available Badges

#### 🔗 On-chain Badge: "Early Staker"

- **ID**: `onchain-early-staker`
- **Description**: Awarded for staking tokens within the first 100 blocks of genesis
- **Lore**: "When the chain was but a spark, you forged the first commitment. Validators still whisper of your courage."

#### 🐦 Twitter Badge: "Ecosystem Voice"

- **ID**: `twitter-ecosystem-voice`
- **Description**: Awarded for tweeting consistently about the protocol and hitting 10,000+ impressions
- **Lore**: "In the realm of hashtags and handles, your words echoed far and wide, rallying the curious and the bold."

## 📋 Prerequisites

- Node.js (v18+)
- pnpm
- PostgreSQL

## 🛠️ Installation & Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables (see .env.example)
cp .env.example .env

# Start PostgreSQL and create database
# Run database migrations (if needed)

# Start the achievements service
pnpm run start achievements
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/legion
DATABASE_LOGGING=false
DATABASE_SCHEMA=public
DATABASE_RUN_MIGRATIONS=false

# Application
NODE_ENV=development
PORT=3000
```

## 🔧 Script Commands

> **📂 Important**: Before running the scripts below, ensure you have placed the CSV files in the `/data` folder:
>
> - `data/users.csv` - User registration data
> - `data/ethereum_wallets_100k.csv` - Ethereum wallet addresses for on-chain badges
> - `data/twitter_usernames_100k.csv` - Twitter usernames for Twitter badges

### User Registration

Register users from CSV file:

```bash
pnpm run register-users data/users.csv
```

### Badge Assignment

Assign badges to users based on CSV data:

```bash
# Assign on-chain badges to Ethereum wallet holders
pnpm run assign-badges data/ethereum_wallets_100k.csv onchain-early-staker

# Assign Twitter badges to Twitter users
pnpm run assign-badges data/twitter_usernames_100k.csv twitter-ecosystem-voice
```

### Application Control

```bash
# Start the achievements service
pnpm run start achievements

# Start in development mode with hot reload
pnpm run start:dev achievements

# Run E2E tests
pnpm run test:e2e:achievements
```

## 📡 API Endpoints

The achievements API provides the following endpoints:

### User Achievements

- **GET** `/achievements/:userId` - Retrieve specific user's achievements

### Badge Management

- **GET** `/achievements/badges` - Fetch all available badges grouped by badge type

### API Documentation

When running, access the interactive Swagger documentation at:

- **Swagger UI**: http://localhost:3000/api/docs

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run E2E tests for achievements
pnpm run test:e2e:achievements

# Run tests with coverage
pnpm run test:cov
```

## 🏗️ Project Structure

```
legion/
├── apps/
│   └── achievements/           # Main achievements API service
│       ├── src/
│       │   ├── main.ts        # Application entry point
│       │   └── app/
│       │       ├── achievements/           # Core achievements module
│       │       │   ├── achievements.controller.ts
│       │       │   ├── achievements.service.ts
│       │       │   ├── badges.service.ts
│       │       │   └── dto/               # Data Transfer Objects
│       │       └── scripts/               # CLI scripts
│       │           ├── register-users.cli.ts
│       │           └── assign-badges.cli.ts
│       └── test/              # E2E tests
├── libs/
│   ├── database/              # Database configuration & entities
│   └── core/                  # Shared utilities & configurations
└── data/                      # CSV data files
    ├── users.csv
    ├── ethereum_wallets_100k.csv
    └── twitter_usernames_100k.csv
```

## 🔄 Development Workflow

1. **Register Users**: Use the CSV file to populate initial user data
2. **Assign Badges**: Run badge assignment scripts for different platforms
3. **Test API**: Use Swagger UI to test endpoints
4. **Run Tests**: Ensure E2E tests pass

## 🎯 Technical Implementation

### Technologies Used

- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe development
- **TypeORM**: Database ORM with PostgreSQL
- **Class Validator**: DTO validation
- **Swagger**: API documentation
- **Jest & Supertest**: Testing framework

### Key Features Implemented

- ✅ Database schema for badges and user achievements
- ✅ CSV parsing and batch operations
- ✅ RESTful API with proper DTOs
- ✅ Swagger documentation
- ✅ E2E test coverage
- ✅ CLI scripts for data management
- ✅ Automatic badge assignment for new users

## 🔮 Bonus Features

- **Swagger Documentation**: Complete API documentation with examples
- **Automatic Badge Assignment**: New users automatically receive badges if they match criteria in achievement lists
- **Extensible Architecture**: Ready for additional badge types (Discord, Telegram)
- **Performance Optimized**: Efficient batch operations for large CSV files

## 📝 License

This project is part of the Legion Home Task implementation.

---

**Note**: This is a home task implementation demonstrating NestJS proficiency, database design, API development, and testing practices.
