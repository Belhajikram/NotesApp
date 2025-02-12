import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Note } from './entities/note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: number, createNoteDto: CreateNoteDto): Promise<Note> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newNote = this.notesRepository.create({
      ...createNoteDto,
      user, // Link note to user
    });

    return await this.notesRepository.save(newNote);
  }

  async findAll(userId: number): Promise<Note[]> {
    const notes = await this.notesRepository.find({
      where: { user: { id: userId } },
      relations: ["user"],
    });
    return notes;
  }

  async findOne(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id }, relations: ["user"] });
    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
    return note;
  }

  async update(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    await this.findOne(id);
    await this.notesRepository.update(id, updateNoteDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.notesRepository.delete(id);
  }

  async searchNotes(query: string): Promise<Note[]> {
    return await this.notesRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { content: ILike(`%${query}%`) },
      ],
    });
  }

  async filterNotesByCategory(category: string): Promise<Note[]> {
    return await this.notesRepository.find({
      where: { category: ILike(`%${category}%`) },
    });
  }
}
