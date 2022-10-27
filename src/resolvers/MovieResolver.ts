import { Movie } from '../entity/Movie';
import { Arg, Field, InputType, Int, Mutation, Query, Resolver } from 'type-graphql';
import { getRepository } from 'typeorm';

@InputType()
class MovieInput {
	@Field()
	title: string;

	@Field(() => Int)
	minutes: number;
}

@InputType()
class MovieUpdateInput {
	@Field()
	title?: string;

	@Field(() => Int)
	minutes?: number;
}

@Resolver()
export class MovieResolver {
	// @Mutation(() => Boolean)
	// async createMovie(@Arg('title') title: string, @Arg('minutes', () => Int) minutes: number) {
	// 	console.log({ title });
	// 	const repo = await getRepository(Movie);
	// 	await repo.save({ title, minutes });
	// 	return true;
	// }
	@Mutation(() => Movie)
	async createMovie(@Arg('data', () => MovieInput) data: MovieInput) {
		const repo = await getRepository(Movie);
		const movie = await repo.save(data);
		return movie;
	}

	@Mutation(() => Movie)
	async updateMovie(@Arg('id', () => Int) id: number, @Arg('data', () => MovieUpdateInput) data: MovieUpdateInput) {
		const movie = await getRepository(Movie).findOne({ id });

		return await getRepository(Movie).save({ ...movie, ...data });
	}

	@Mutation(() => Boolean)
	async deleteMovie(@Arg('id') id: number) {
		await getRepository(Movie).delete({ id });
		return true;
	}

	@Query(() => [Movie])
	async getMovies() {
		return await getRepository(Movie).find();
	}
}
