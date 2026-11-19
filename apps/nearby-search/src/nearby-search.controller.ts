import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from "@nestjs/common";
import { NearbySearchService } from "./nearby-search.service";
import { RedisService } from "./redis/redis.service";

@Controller()
export class NearbySearchController {
  constructor(private readonly nearbySearchService: NearbySearchService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Get()
  getHello(): string {
    return this.nearbySearchService.getHello();
  }

  @Get("addPos")
  async addPos(
    @Query("name") posName: string,
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
  ) {
    if (!posName || !latitude || !longitude) {
      throw new BadRequestException("位置信息不全");
    }
    try {
      // redis-cli里查询用 ZRANGE pos [start] [end]
      // GEOPOS pos [name]
      await this.redisService.geoAdd("pos", posName, [longitude, latitude]);
    } catch (error: any) {
      throw new BadRequestException(error.message);
    }
    return {
      statusCode: 200,
      message: "添加成功",
    };
  }

  @Get("pos")
  async getPos(@Query("name") name: string) {
    return this.redisService.geoPos("pos", name);
  }

  @Get("allPos")
  async getAllPos() {
    return this.redisService.geoList("pos");
  }

  @Get("nearbySearch")
  async nearbySearch(
    @Query("latitude") latitude: number,
    @Query("longitude") longitude: number,
    @Query("radius") radius: number,
  ) {
    if (!latitude || !longitude || !radius) {
      throw new BadRequestException("位置信息不全");
    }
    return this.redisService.geoSearch("pos", [longitude, latitude], radius);
  }
}
