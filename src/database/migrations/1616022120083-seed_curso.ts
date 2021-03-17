import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import CursoSeed from "../seeds/curso.seed";

export class seedCurso1616022120083 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("curso").save(CursoSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("curso").delete({});
    }

}
