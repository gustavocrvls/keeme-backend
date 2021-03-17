import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import UsuarioSeed from "../seeds/usuario.seed";

export class seedUsuario1616022115309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("usuario").save(UsuarioSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("usuario").delete({});
    }

}
