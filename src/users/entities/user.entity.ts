/* eslint-disable prettier/prettier */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  username: string;


  @Column({ unique: true })
  email: string;


  @Column({ select: false })
  password: string;

  @Column({ default: 'user' })
  role: string;

  @OneToMany(() => Note, (note) => note.user)
  notes: Note[];


  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLocaleLowerCase();
  }

  // Override toJSON method to exclude the password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}
