import { Injectable } from '@nestjs/common';

@Injectable()
export class NearbySearchService {
  getHello(): string {
    return 'Hello World!';
  }
}
