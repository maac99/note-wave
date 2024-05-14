import { Inject, Injectable } from '@nestjs/common';
import { Note } from '../entities/notes.entity';
import { createNoteDTO } from '../dtos/createNote.dto';
import { Tag } from '../entities/tag.entity';
import { updateNoteDTO } from '../dtos/updateNote.dto';
import { Op } from 'sequelize';
import { createTagDTO } from '../dtos/createTag.dto';
import { removeTagDTO } from '../dtos/removeTag.dto';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private notesRepository: typeof Note,
    @Inject('TAG_REPOSITORY')
    private tagRepository: typeof Tag,
  ) {}

  async create(createNoteDTO: createNoteDTO): Promise<Note> {
    const note = await this.notesRepository.create(
      {
        title: createNoteDTO.title,
        content: createNoteDTO.content,
        isArchived: false,
        tags: createNoteDTO.tags,
      },
      {
        include: [this.tagRepository],
      },
    );
    return note;
  }

  async update(updateNoteDTO: updateNoteDTO): Promise<Note> {
    let note = await this.notesRepository.findByPk(updateNoteDTO.id, {
      include: [this.tagRepository],
    });

    note.title = updateNoteDTO.title || note.title;
    note.content = updateNoteDTO.content || updateNoteDTO.content;

    return note.save({
      omitNull: true,
    });
  }

  async delete(id: string): Promise<number> {
    return this.notesRepository.destroy({ where: { id } });
  }

  async findAllActives(): Promise<Note[]> {
    return this.notesRepository.findAll<Note>({
      where: { isArchived: false },
      attributes: ['id', 'title', 'isArchived'],
    });
  }
  async findAllArchived(): Promise<Note[]> {
    return this.notesRepository.findAll<Note>({
      where: { isArchived: true },
      attributes: ['id', 'title', 'isArchived'],
    });
  }

  async findOneById(id: string): Promise<Note> {
    return await this.notesRepository.findByPk(id, {
      include: [this.tagRepository],
    });
  }

  async archive(id: string): Promise<[number]> {
    const note = await this.notesRepository.findByPk(id);
    if (!note) {
      throw new Error('Note not found');
    }

    const newIsArchived = !note.isArchived;

    return this.notesRepository.update(
      {
        isArchived: newIsArchived,
      },
      {
        where: { id },
      },
    );
  }

  async findAll(): Promise<Note[]> {
    return this.notesRepository.findAll<Note>({
      attributes: ['id', 'title', 'isArchived'],
    });
  }

  async addTagsToNote(noteId: string, addTags: createTagDTO[]): Promise<Note> {
    await Promise.all(
      addTags.map(async (addTag) => {
        await new Tag({
          name: addTag.name,
          noteId: noteId,
        }).save();
      }),
    );

    return await this.notesRepository.findByPk(noteId, {
      include: [this.tagRepository],
    });
  }

  async removeTagsToNote(
    noteId: string,
    removeTags: removeTagDTO[],
  ): Promise<Note> {
    await Promise.all(
      removeTags.map(async (removeTag) => {
        const tag = await this.tagRepository.findByPk(removeTag.id);
        if (tag.noteId != noteId) {
          throw Error('Tag is not part of note');
        }
        await tag.destroy();
      }),
    );

    return await this.notesRepository.findByPk(noteId, {
      include: [this.tagRepository],
    });
  }

  async filterByCategories(tagsList: string[]): Promise<Note[]> {
    const foundTags = await Tag.findAll({
      where: {
        name: {
          [Op.in]: tagsList,
        },
      },
    });

    const notesIdsSet: Set<string> = new Set();
    foundTags.forEach((tag) => {
      notesIdsSet.add(tag.noteId);
    });
    const notesIds = [...notesIdsSet];

    return await Note.findAll({
      where: {
        id: {
          [Op.in]: notesIds,
        },
      },
      include: [this.tagRepository],
    });
  }
}
