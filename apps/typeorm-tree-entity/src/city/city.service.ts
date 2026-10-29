import { Injectable } from "@nestjs/common";
import { Repository, EntityManager } from "typeorm";
import { CreateCityDto } from "./dto/create-city.dto";
import { UpdateCityDto } from "./dto/update-city.dto";
import { InjectEntityManager } from "@nestjs/typeorm";
import { City } from "./entities/city.entity";

@Injectable()
export class CityService {
  // 构造函数参数会被 Nest 当作“创建这个服务时必须提供的依赖
  // constructor(private readonly cityRepository: Repository<City>) {}

  @InjectEntityManager()
  entityManager: EntityManager;

  create(createCityDto: CreateCityDto) {
    return "This action adds a new city";
  }

  async findAll() {
    // const city = new City();
    // city.name = "华北";
    // // 因为city是new City()，所以不用指定entity为City
    // await this.entityManager.save(city);

    // const cityChild = new City();
    // cityChild.name = "山东";
    // const parent = await this.entityManager.findOne(City, {
    //   where: { name: "华北" },
    // });

    // if (parent) {
    //   cityChild.parent = parent;
    // }

    // await this.entityManager.save(cityChild);

    // const city = new City();
    // city.name = "华南";
    // await this.entityManager.save(city);

    // const cityChild1 = new City();
    // cityChild1.name = "云南";
    // const parent = await this.entityManager.findOne(City, {
    //   where: { name: "华南" },
    // });
    // if (parent) {
    //   cityChild1.parent = parent;
    // }
    // await this.entityManager.save(cityChild1);

    // const childCity2 = new City();
    // childCity2.name = "昆明";
    // const parent2 = await this.entityManager.findOne(City, {
    //   where: { name: "云南" },
    // });
    // if (parent2) {
    //   childCity2.parent = parent2;
    // }
    // await this.entityManager.save(childCity2);

    return this.entityManager.getTreeRepository(City).findTrees();
    // return this.entityManager.getTreeRepository(City).findRoots(); // 找到所有根节点
    // const parent = await this.entityManager.findOne(City, {
    //   where: { name: "云南" },
    // });
    // return this.entityManager
    //   .getTreeRepository(City)
    //   .findDescendantsTree(parent!); // 找到某个节点的所有后代节点
  }

  findOne(id: number) {
    return `This action returns a #${id} city`;
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
