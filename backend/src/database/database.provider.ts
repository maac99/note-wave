import { Sequelize } from 'sequelize-typescript';
import { Note } from 'src/notes/entities/notes.entity';
import { Tag } from 'src/notes/entities/tag.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'db',
        port: 3306,
        username: 'notes_user',
        password: 'notes_password',
        database: 'mynotes',
      });
      sequelize.addModels([Tag, Note]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

