import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Injectable()
export class AppService {
  getHome(res: Response) {
    const indexHtml = join(__dirname, '..', 'public', 'static', 'index.html');

    return res.sendFile(indexHtml, {
      headers: {
        contentType: 'text/html',
      },
    });
  }
}
