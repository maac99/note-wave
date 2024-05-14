import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { notesProviders } from './repositories/notes.provider';
import { tagProviders } from './repositories/tag.provider';
import { DatabaseModule } from 'src/database/database.module';
import { NotesController } from './controllers/notes.controller';

@Module({
  imports: [DatabaseModule],
  providers: [NotesService, ...notesProviders, ...tagProviders],
  controllers: [NotesController]
})
export class NotesModule {}
