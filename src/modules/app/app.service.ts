import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getProfile() {
    throw new Error('Method not implemented.');
  }
  getHome(): string {
    return 'Home';
  }
}
