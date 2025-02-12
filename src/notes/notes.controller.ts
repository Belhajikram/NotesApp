import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createNoteDto: CreateNoteDto) {
    if (!req.user || !req.user.userId) {
      throw new Error('User is not authenticated');
    }
    return this.notesService.create(req.user.userId, createNoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.notesService.findAll(req.user.userId);
  }

  @Get('search')
  searchNotes(@Request() req, @Query('query') query: string) {
    return this.notesService.searchNotes(req.user.userId, query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('filter')
  filterNotesByCategory(@Request() req, @Query('category') category: string) {
    return this.notesService.filterNotesByCategory(req.user.userId, category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const noteId = parseInt(id, 10);
    if (isNaN(noteId)) {
      throw new BadRequestException(`Invalid note ID: ${id}`);
    }
    return this.notesService.findOne(noteId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const noteId = parseInt(id, 10);
    if (isNaN(noteId)) {
      throw new BadRequestException(`Invalid note ID: ${id}`);
    }
    return this.notesService.update(noteId, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const noteId = parseInt(id, 10);
    if (isNaN(noteId)) {
      throw new BadRequestException(`Invalid note ID: ${id}`);
    }
    return this.notesService.remove(noteId);
  }
}
