import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AchievementsController } from '../src/app/controllers/achievements.controller';
import { RootController } from '../src/app/controllers/root.controller';
import { AchievementsService } from '../src/app/services/achievements.service';
import { BadgeService } from '../src/app/services/badge.service';
import { UserBadgesService } from '../src/app/services/user-badges.service';
import { UserService } from '../src/app/services/user.service';

const mockBadgeEntities = {
  onchain: [
    {
      id: 'onchain-early-staker',
      type: 'onchain',
      icon: 'onchain-icon.png',
      title: 'Early Staker',
      description:
        'Awarded for staking tokens within the first 100 blocks of genesis.',
      lore: 'When the chain was but a spark, you forged the first commitment.',
      created_at: new Date(),
    },
  ],
  twitter: [
    {
      id: 'twitter-ecosystem-voice',
      type: 'twitter',
      icon: 'twitter-icon.png',
      title: 'Ecosystem Voice',
      description: 'Awarded for tweeting consistently about the protocol.',
      lore: 'In the realm of hashtags and handles, your words echoed far and wide.',
      created_at: new Date(),
    },
  ],
};

const mockUserBadgeEntities = [
  {
    user_id: 1,
    badge_id: 'onchain-early-staker',
    created_at: new Date('2025-06-03T20:48:38.043Z'),
    badge: mockBadgeEntities.onchain[0],
  },
];

describe('AchievementsController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RootController, AchievementsController],
      providers: [
        AchievementsService,
        {
          provide: BadgeService,
          useValue: {
            findById: jest.fn(),
            findByTitle: jest.fn(),
            findByIdOrTitle: jest.fn(),
            findAll: jest.fn().mockResolvedValue(mockBadgeEntities),
          },
        },
        {
          provide: UserBadgesService,
          useValue: {
            findByUserId: jest.fn().mockImplementation((userId: number) => {
              if (userId === 1) {
                return Promise.resolve(mockUserBadgeEntities);
              }
              return Promise.resolve([]);
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  describe('Root Controller', () => {
    it('GET / should return welcome message', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Legion Achievements says: Hello World!');
    });
  });

  describe('Achievements Controller', () => {
    describe('GET /achievements/badges', () => {
      it('should return badges grouped by type', async () => {
        const response = await request(app.getHttpServer())
          .get('/achievements/badges')
          .expect(200);

        expect(response.body).toBeDefined();
        expect(typeof response.body).toBe('object');

        expect(response.body.onchain).toBeDefined();
        expect(Array.isArray(response.body.onchain)).toBe(true);
        expect(response.body.onchain).toHaveLength(1);
        expect(response.body.onchain[0]).toMatchObject({
          id: 'onchain-early-staker',
          type: 'onchain',
          title: 'Early Staker',
          iconUrl: expect.stringContaining('/assets/icons/onchain-icon.png'),
        });

        expect(response.body.twitter).toBeDefined();
        expect(Array.isArray(response.body.twitter)).toBe(true);
        expect(response.body.twitter).toHaveLength(1);
        expect(response.body.twitter[0]).toMatchObject({
          id: 'twitter-ecosystem-voice',
          type: 'twitter',
          title: 'Ecosystem Voice',
          iconUrl: expect.stringContaining('/assets/icons/twitter-icon.png'),
        });
      });

      it('should return content-type application/json', () => {
        return request(app.getHttpServer())
          .get('/achievements/badges')
          .expect(200)
          .expect('Content-Type', /json/);
      });
    });

    describe('GET /achievements/:userId', () => {
      it('should return user achievements for valid user ID', async () => {
        const userId = 1;
        const response = await request(app.getHttpServer())
          .get(`/achievements/${userId}`)
          .expect(200);

        expect(response.body).toBeDefined();
        expect(response.body).toHaveProperty('userId');
        expect(response.body).toHaveProperty('badges');
        expect(response.body).toHaveProperty('totalCount');
        expect(response.body.userId).toBe(userId);
        expect(Array.isArray(response.body.badges)).toBe(true);
        expect(typeof response.body.totalCount).toBe('number');
        expect(response.body.totalCount).toBe(response.body.badges.length);

        expect(response.body.badges).toHaveLength(1);
        expect(response.body.badges[0]).toMatchObject({
          user_id: 1,
          badge_id: 'onchain-early-staker',
          earned_at: '2025-06-03T20:48:38.043Z',
          badge: {
            id: 'onchain-early-staker',
            type: 'onchain',
            title: 'Early Staker',
            iconUrl: expect.stringContaining('onchain-icon.png'),
          },
        });
      });

      it('should return 400 for invalid user ID (non-numeric)', () => {
        return request(app.getHttpServer())
          .get('/achievements/invalid-user-id')
          .expect(400);
      });

      it('should return empty achievements for non-existent user', async () => {
        const userId = 999999;
        const response = await request(app.getHttpServer())
          .get(`/achievements/${userId}`)
          .expect(200);

        expect(response.body.userId).toBe(userId);
        expect(response.body.badges).toEqual([]);
        expect(response.body.totalCount).toBe(0);
      });

      it('should return content-type application/json', () => {
        return request(app.getHttpServer())
          .get('/achievements/1')
          .expect(200)
          .expect('Content-Type', /json/);
      });
    });

    describe('Error handling', () => {
      it('should return 400 for non-numeric route parameters', () => {
        return request(app.getHttpServer())
          .get('/achievements/non-existent-route')
          .expect(400);
      });

      it('should return 404 for POST requests to achievements endpoints', () => {
        return request(app.getHttpServer())
          .post('/achievements/badges')
          .expect(404);
      });
    });
  });
});
