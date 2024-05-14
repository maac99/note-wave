import { createTagDTO } from './createTag.dto';

export interface createNoteDTO {
  title: string;
  content?: string;
  tags?: createTagDTO[];
}
