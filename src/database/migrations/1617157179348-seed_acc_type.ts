import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { ACCTypeSeed } from "../seeds/acc_type.seed";

export class seedAccType1617157179348 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("acc_type").save(ACCTypeSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("acc_type").delete({});
    }

}
