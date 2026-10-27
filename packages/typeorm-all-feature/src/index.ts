import { AppDataSource } from "./data-source";
import { User } from "./entities/User";

AppDataSource.initialize()
  .then(async () => {
    // await AppDataSource.manager.save(User, [
    //   { firstName: "ccc", lastName: "ccc", age: 21 },
    //   { firstName: "ddd", lastName: "ddd", age: 22 },
    //   { firstName: "eee", lastName: "eee", age: 23 },
    // ]);

    // const [users, count] = await AppDataSource.manager.findAndCountBy(User, {
    //   age: 23,
    // });
    // console.log(users, count);

    //  queryBuilder 代替复杂的查询语句
    // const queryBuilder = await AppDataSource.manager.createQueryBuilder();
    // const user = await queryBuilder
    //   .select("user")
    //   .from(User, "user")
    //   .where("user.age = :age", { age: 23 })
    //   .getOne();
    // console.log(user);

    // 事务
    const transaction = await AppDataSource.manager.transaction(
      async (manager) => {
        await manager.save(User, {
          firstName: "fff",
          lastName: "fff",
          age: 24,
        });
      },
    );
  })
  .catch((error) => console.log(error));
