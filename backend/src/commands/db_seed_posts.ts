import fs from 'fs';
import { join } from 'path';
import { DataSource } from "typeorm";
import { getRepository, createConnection } from 'typeorm';

import { dbConnection } from '../databases';
import { PostEntity } from '../entities/post.entity';
import { TagEntity } from '../entities/tag.entity';

async function main() {
    await createConnection(dbConnection);

    const seedDataPath = join(__dirname, '../databases/posts.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));

    const postRepository = getRepository(PostEntity);
    const tagRepository = getRepository(TagEntity);

    for (const item of seedData) {
        const tags = [];
        for (const tag of item.tags) {
            let tagEntity = await tagRepository.findOne({ where: { tag } });
            if (!tagEntity) {
                tagEntity = tagRepository.create({ tag });
                await tagRepository.save(tagEntity);
            }
            tags.push(tagEntity);
        }

        const post = postRepository.create({
            title: item.title,
            content: item.content,
            postedAt: new Date(item.postedAt),
            postedBy: item.postedBy,
            tags
        });

        await postRepository.save(post);
    }
    console.log("Post Seed Succeeded!")

    process.exit();
}

main();