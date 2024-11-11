import { DataSource } from 'typeorm';
import { Author } from '../../databases/mysql/entity/author.entity';

export const authProviders = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
];
