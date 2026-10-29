import { Module } from "@nestjs/common";
import { TypeormTreeEntityController } from "./typeorm-tree-entity.controller";
import { TypeormTreeEntityService } from "./typeorm-tree-entity.service";
import { CityModule } from "./city/city.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { City } from "./city/entities/city.entity";

@Module({
  imports: [
    CityModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "admin",
      database: "tree_test",
      synchronize: true,
      entities: [City],
      // autoLoadEntities: true,
    }),
  ],
  controllers: [TypeormTreeEntityController],
  providers: [TypeormTreeEntityService],
})
export class TypeormTreeEntityModule {}
