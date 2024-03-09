import { Response } from 'express';
import { getRepository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { ExpressRequest } from 'interfaces/request.interface';

class PostController {
    list = async (req: ExpressRequest, res: Response) => {
        const postRepository = getRepository(PostEntity);
        const { search, sort, tag, per_page, page } = req.query;

        const take = per_page ? parseInt(per_page.toString(), 10) : 10;
        const skip = page && take ? (parseInt(page.toString(), 10) - 1) * take : 0;

        try {
            const queryBuilder = postRepository.createQueryBuilder('post');

            // Join and select tags for each post
            queryBuilder.leftJoinAndSelect('post.tags', 'tag');

            if (tag) {
                // Filter posts by tag
                queryBuilder.andWhere('tag.name = :tagName', { tagName: tag });
            }

            if (search) {
                queryBuilder.andWhere('(post.title LIKE :search OR post.content LIKE :search)', { search: `%${search}%` });
            }

            if (sort) {
                queryBuilder.orderBy('post.title', sort.toString().toUpperCase() === 'DESC' ? 'DESC' : 'ASC');
            }

            queryBuilder.take(take).skip(skip);

            const [posts, total] = await queryBuilder.getManyAndCount();

            res.json({
                data: posts,
                total,
                page: page ? parseInt(page.toString(), 10) : 1,
                start_at: total > 0 ? skip + 1 : 0,
                end_at: skip + posts.length,
                per_page: take
            });
        } catch (error) {
            res.status(500).send('Server error');
        }
    }
};
export default PostController;