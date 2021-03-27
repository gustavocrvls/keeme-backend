import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {ProfileSeed} from "../seeds/profile.seed";

export class seedProfile1616020110540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("profile").save(ProfileSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("profile").delete({});
    }

}
