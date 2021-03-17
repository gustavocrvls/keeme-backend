import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import PerfilSeed from "../seeds/perfil.seed";

export class seedPerfil1616020110540 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("perfil").save(PerfilSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("perfil").delete({});
    }

}
