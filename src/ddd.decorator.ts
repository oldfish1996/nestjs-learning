import { SetMetadata } from '@nestjs/common';

export const Ddd = (...args: string[]) => SetMetadata('ddd', args);
