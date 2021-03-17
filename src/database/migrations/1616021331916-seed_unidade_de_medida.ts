import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import UnidadeDeMedidaSeed from "../seeds/unidade_de_medida.seed";

export class seedUnidadeDeMedida1616021331916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("unidade_de_medida").save(UnidadeDeMedidaSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("unidade_de_medida").delete({});
    }

}
