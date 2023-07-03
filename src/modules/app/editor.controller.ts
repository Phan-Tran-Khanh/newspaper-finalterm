import { Controller, Get, Render, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Controller('editor')
export class EditorController {
  constructor(private readonly appService: AppService) {}
  @Get('approve')
  @Render('editor/approve')
  async editorView(@Req() req: Request) {
    // TODO
  }

  @Get('disapprove')
  @Render('editor/disapprove')
  async disapproveView(@Req() req: Request) {
    // TODO
  }

  @Get('detail')
  @Render('editor/detail')
  async detailView(@Req() req: Request) {
    // TODO
  }

  @Get('list')
  @Render('editor/list')
  async listView(@Req() req: Request) {
    // TODO
  }
}
