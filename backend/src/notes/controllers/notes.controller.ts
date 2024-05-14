import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Note } from '../entities/notes.entity';
import { createNoteDTO } from '../dtos/createNote.dto';
import { updateNoteDTO } from '../dtos/updateNote.dto';
import { createTagDTO } from '../dtos/createTag.dto';
import { removeTagDTO } from '../dtos/removeTag.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  /* Phase 1 */

  /**
   * Create a new note.
   * @param {createNoteDTO} note - Data of the note to create.
   * @returns {Note} The created note.
   */
  @Post('/')
  async create(@Body() note: createNoteDTO) {
    return this.notesService.create(note);
  }

  /**
   * Update an existing note.
   * @param {string} id - ID of the note to update.
   * @returns {Note} The updated note.
   */
  @Put('/')
  async update(@Body() note: updateNoteDTO) {
    return this.notesService.update(note);
  }

  /**
   * Get all notes with only the 'id' and 'title' fields.
   * @returns {Promise<Note[]>} An array with all notes containing only the 'id' and 'title' fields.
   */
  @Get('/')
  async findAll(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  /**
   * Get all active notes.
   * @returns {Note[]} An array with all active notes.
   */
  @Get('/actives')
  async findAllActives(): Promise<Note[]> {
    return this.notesService.findAllActives();
  }

  /**
   * Get all archived notes.
   * @returns {Note[]} An array with all archived notes.
   */
  @Get('/archived')
  async findAllArchived(): Promise<Note[]> {
    return this.notesService.findAllArchived();
  }

  /**
   * Archive/Unarchive a note by its ID.
   * @param {string} id - ID of the note to archive.
   * @returns {Note} The archived note.
   */
  @Put('/:id/archive')
  async archive(@Param('id') id: string) {
    return this.notesService.archive(id);
  }

  /**
   * Delete a note by its ID.
   * @param {string} id - ID of the note to delete.
   * @returns {Note} The deleted note.
   */
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.notesService.delete(id);
  }

  /**
   * Get note by 'id'
   * @returns {Note} the note.
   */
  @Get('/:id')
  async findOneById(@Param('id') id: string) {
    return this.notesService.findOneById(id);
  }

  /* Phase 2 */

  /**
   * Filter notes by categories.
   * @param {string} tags - Comma-separated list of categories to filter notes by.
   * @returns {Note[]} List of notes matching the specified categories.
   */
  @Get('/filter/tags')
  filterByCategories(@Query('tags') tags: string): Promise<Note[]> {
    const tagsList = tags.split(',').map((tag) => tag.trim());
    return this.notesService.filterByCategories(tagsList);
  }

  /**
   * Add tags to a specific note.
   * @param {string} id - ID of the note to which the tags will be added.
   * @param {createTagDTO[]} tags - List of tags to add to the note.
   * @returns {Promise<Note>} The updated note after adding the tags.
   */
  @Put('/:id/add/tags')
  addTagsToNote(
    @Param('id') id: string,
    @Body() tags: createTagDTO[],
  ): Promise<Note> {
    return this.notesService.addTagsToNote(id, tags);
  }

  /**
   * Remove tags from a specific note.
   * @param {string} id - ID of the note from which the tags will be removed.
   * @param {removeTagDTO[]} tags - List of tags to remove from the note.
   * @returns {Promise<Note>} The updated note after removing the tags.
   */
  @Delete('/:id/remove/tags')
  removeTagsToNote(
    @Param('id') id: string,
    @Body() tags: removeTagDTO[],
  ): Promise<Note> {
    return this.notesService.removeTagsToNote(id, tags);
  }
}
