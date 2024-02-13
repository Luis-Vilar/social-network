import { Injectable } from '@nestjs/common';

import { name, description, version, author, license } from '../package.json';
import { AppInfo } from '../types';

@Injectable()
export class AppService {
  getHello(): AppInfo {
    return {
      name,
      description,
      version,
      author,
      license,
    };
  }
}
