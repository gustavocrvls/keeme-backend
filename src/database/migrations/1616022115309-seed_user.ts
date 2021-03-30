import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {UserSeed} from "../seeds/user.seed";

export class seedUser1616022115309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("user").save(UserSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("user").delete({});
    }

}
