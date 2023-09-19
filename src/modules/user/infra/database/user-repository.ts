import { dataSource } from 'infra/database/typeorm/datasource';
import { type Repository } from 'typeorm';

import { UserMapper } from './user-mapper';

import {
	type CreateUserRepository,
	type FindUserByEmailRepository,
	type FindUserByIdRepository,
} from '@modules/user/data/repositories';
import { type User } from '@modules/user/domain/entities/user-entity';
import { PgUser } from '@modules/user/domain/models/user-model';

type UserRepository = CreateUserRepository &
	FindUserByEmailRepository &
	FindUserByIdRepository;

export class PgUserRepository implements UserRepository {
	private readonly repository: Repository<PgUser>;

	public constructor() {
		this.repository = dataSource.getRepository(PgUser);
	}

	public async create(user: User): Promise<void> {
		await this.repository.save(user);
	}

	public async findUserByEmail(email: string): Promise<User | null> {
		const pgUser = await this.repository.findOne({
			where: {
				email,
			},
		});

		return pgUser ? UserMapper.toDomain(pgUser) : null;
	}

	public async findUserById(userId: string): Promise<User | null> {
		const pgUser = await this.repository.findOne({
			where: {
				id: userId,
			},
		});

		return pgUser ? UserMapper.toDomain(pgUser) : null;
	}
}
