import fs from 'fs';
import { join } from 'path';
import { DataSource } from "typeorm";
import { getRepository, createConnection } from 'typeorm';
import bcrypt from "bcrypt";
import { dbConnection } from '../databases';
import { PostEntity } from '../entities/post.entity';
import { TagEntity } from '../entities/tag.entity';
import { UserEntity } from '../entities/user.entity';

async function main() {
    await createConnection(dbConnection);

    const saltRounds = 10;
    const seedDataPath = join(__dirname, '../databases/users.json');
    const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf8'));
    const UserRepostory = getRepository(UserEntity);

    for (const item of seedData) {
        const existUser = await UserRepostory.findOneBy({ username: item.username });

        if (!existUser) {
            const hashedPassword = await bcrypt.hash(item.password, saltRounds);
            const user = UserRepostory.create({
                username: item.username,
                password: hashedPassword
            });

            await UserRepostory.save(user);
        }
    }

    console.log("User Seed Succeeded!")
    process.exit();
}

main();