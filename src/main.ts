import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const isCronJob = process.env.CRONJOB === 'CRONJOB';
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => {
    if (isCronJob) {
      const statusJob = app.get(AppService);
      statusJob.subscribeToShutdown(async (code) => {
        await app.close();
        console.log('Process exiting...');
        process.exit(code || 0);
      });
      statusJob.foo();
    }
  });
}
bootstrap();
