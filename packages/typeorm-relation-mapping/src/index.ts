import { AppDataSource } from "./data-source";
import { User } from "./entities/User";
import { IdCard } from "./entities/IdCard";

AppDataSource.initialize()
  .then(async () => {
    // const user = new User();
    // user.firstName = "chen";
    // user.lastName = "ys";
    // user.age = 25;

    // const idCard = new IdCard();
    // idCard.cardName = "123456789012345678";
    // idCard.user = user;

    // // 因为设置了 cascade: true，所以这里只需要保存 idCard 就可以了
    // // await AppDataSource.manager.save(user);
    // await AppDataSource.manager.save(idCard);

    const idCards = await AppDataSource.manager.find(IdCard, {
      relations: {
        user: true,
      },
    });
    console.log(idCards);
  })
  .catch((error) => console.log(error));
