import { Injectable, Logger } from '@nestjs/common';
import { Subject } from 'rxjs';

@Injectable()
export class AppService {
  private exitCode = 0;
  private readonly logger = new Logger(AppService.name);

  private shutdownListener$: Subject<void> = new Subject();

  subscribeToShutdown(shutdownFn: (code) => void): void {
    this.shutdownListener$.subscribe(() => shutdownFn(this.exitCode));
  }

  foo() {
    this.logger.log('Job running..');
    this.shutdownListener$.next();
  }

  getHello(): string {
    return 'Hello World!';
  }
}
