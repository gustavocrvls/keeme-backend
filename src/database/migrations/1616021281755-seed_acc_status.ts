import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {ACCStatusSeed} from "../seeds/acc_status.seed";

export class seedACCStatus1616021281755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("acc_status").save(ACCStatusSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("acc_status").delete({});
    }

}
