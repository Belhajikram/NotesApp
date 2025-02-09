import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get('search')  // Move this before `@Get(':id')`
  searchNotes(@Query('query') query: string) {
    return this.notesService.searchNotes(query);
  }

  @Get('filter')  // Move this before `@Get(':id')`
  filterNotesByCategory(@Query('category') category: string) {
    return this.notesService.filterNotesByCategory(category);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) { // Change id type to string
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

