import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1736946113974 implements MigrationInterface {
  name = 'InitialMigration1736946113974';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isEmailConfirmed" boolean NOT NULL DEFAULT false, "lastLogin" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "statsId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_79bb3ba7b87fbfdf3772c96fd8" UNIQUE ("statsId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "user" ("username") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user_stats" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "exp" integer NOT NULL DEFAULT '0', "level" integer NOT NULL DEFAULT '1', "completedQuests" integer NOT NULL DEFAULT '0', "createdQuests" integer NOT NULL DEFAULT '0', "userId" character varying, CONSTRAINT "PK_f55fb5b508e96b05303efae93e5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_79bb3ba7b87fbfdf3772c96fd87" FOREIGN KEY ("statsId") REFERENCES "user_stats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_79bb3ba7b87fbfdf3772c96fd87"`,
    );
    await queryRunner.query(`DROP TABLE "user_stats"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
