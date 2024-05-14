import { Tag } from "../entities/tag.entity";

export const tagProviders = [
  {
    provide: 'TAG_REPOSITORY',
    useValue: Tag,
  },
];