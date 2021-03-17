import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import StatusDaACCSeed from "../seeds/status_da_acc.seed";

export class seedStatusDaAcc1616021281755 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("status_da_acc").save(StatusDaACCSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("status_da_acc").delete({});
    }

}
