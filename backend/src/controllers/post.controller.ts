import { Response } from 'express';
import { getRepository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { TagEntity } from '../entities/tag.entity';
import { ExpressRequest } from '../interfaces/request.interface';

class PostController {

    public async listTags(req: ExpressRequest, res: Response) {
        const tagRepo = getRepository(TagEntity);
        const tags = await tagRepo.find();
        return res.json({ data: tags })
    }

    public async list(req: ExpressRequest, res: Response) {
        const postRepository = getRepository(PostEntity);
        const { search, sort: order_by, order_by_direction, tags, per_page, page } = req.query;

        const take = per_page ? parseInt(per_page.toString(), 10) : 10;
        const skip = page && take ? (parseInt(page.toString(), 10) - 1) * take : 0;

        try {
            const queryBuilder = postRepository.createQueryBuilder('post');

            // Join and select tags for each post
            queryBuilder.leftJoinAndSelect('post.tags', 'tag');

            if (tags) {
                let tagsArray: string[];

                if (Array.isArray(tags)) {
                    tagsArray = tags.map((tag) => typeof tag === 'string' ? tag : String(tag));
                } else {
                    tagsArray = [typeof tags === 'string' ? tags : String(tags)];
                }
                queryBuilder.andWhere('tag.tag in (:...tags)', { tags: tagsArray });
            }

            if (search) {
                queryBuilder.andWhere('(post.title LIKE :search)', { search: `%${search}%` });
            }

            if (order_by) {
                queryBuilder.orderBy(`post.${order_by}`, "ASC");
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