import {
  INestApplication,
  INestApplicationContext,
  Logger,
  ValidationPipe,
  ValidationPipeOptions,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export type BeforeStartHook<T = INestApplicationContext> = (
  app: T,
) => unknown | Promise<unknown>;

export class AppBuilder<T extends INestApplication = INestApplication> {
  private beforeStartHooks: BeforeStartHook<T>[] = [];

  constructor(private readonly module: unknown) {}

  static create(module: unknown) {
    return new AppBuilder(module);
  }

  beforeStart(hook: BeforeStartHook<T>): AppBuilder<T> {
    this.beforeStartHooks.push(hook);
    return this;
  }

  public launch() {
    this.start();
  }

  private async start(): Promise<T> {
    const app = await NestFactory.create(this.module as any);
    await this.runBeforeAppStartHooks(app);

    const port = process.env['PORT'] ?? 3000;

    await app.listen(port, '0.0.0.0');

    Logger.log(`App started listening on ${await app.getUrl()}`);

    return app as T;
  }

  private async runBeforeAppStartHooks(app: INestApplication) {
    for (const hook of this.beforeStartHooks) {
      await hook(app as T);
    }
  }

  setupSwagger(options: { title: string; version: string; path: string }) {
    return this.beforeStart((app) => {
      const config = new DocumentBuilder()
        .setTitle(options.title)
        .setVersion(options.version)
        .build();
      const document = SwaggerModule.createDocument(app, config);

      SwaggerModule.setup(options.path || 'swagger', app, document);
    });
  }

  enableValidation(options: ValidationPipeOptions = {}): AppBuilder<T> {
    return this.beforeStart((app) => {
      app.useGlobalPipes(
        new ValidationPipe({
          transform: true,
          whitelist: true,
          forbidNonWhitelisted: true,
          forbidUnknownValues: true,
          ...options,
        }),
      );
    });
  }
}
