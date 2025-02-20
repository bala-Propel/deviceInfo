import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { RateLimiterMiddleware } from './middleware/rate-limiter.middleware';

dotenv.config(); // Load environment variables

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply the rate limiter middleware globally
  app.use(new RateLimiterMiddleware().use.bind(new RateLimiterMiddleware()));

  await app.listen(3005);
  console.log(`🚀 Server running on http://localhost:3005`);
}

bootstrap();
