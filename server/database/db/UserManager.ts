import { User } from '../entities/User';
import { FindOperator } from 'typeorm';
import { userInput } from '../../utils/inputs/userInputs';
import { hash } from 'argon2';

class UserManager {
  create = async ({ firstName, lastName, email, password }: userInput): Promise<User> => {
    const user = await User.create({ firstName, lastName, email, password });

    return user;
  };

  save = async (user: User) => {
    user.password = await hash(user.password);
    await user.save();
  };

  remove = () => {};

  findByEmail = async (email: string): Promise<User | undefined> => {
    const user = await User.findOne({ where: { email } });

    return user;
  };

  findById = async (id: string | FindOperator<string> | undefined): Promise<User | undefined> => {
    const user = await User.findOne({ where: { id } });

    return user;
  };

  update = () => {};
}

export default new UserManager();
