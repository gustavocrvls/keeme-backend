import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {UnityOfMeasurementSeed} from "../seeds/unity_of_measurement.seed";

export class seedUnityOfMeasurement1616021331916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await getRepository("unity_of_measurement").save(UnityOfMeasurementSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await getRepository("unity_of_measurement").delete({});
    }

}
