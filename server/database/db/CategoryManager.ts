import { Category } from '../entities/Category';
import { FindOperator, getConnection } from 'typeorm';

export interface categoryInput {
  title?: string;
  creatorId?: string;
}

export interface updateInput {
  title?: string;
  image?: string;
}

class CategoryManager {
  create = async ({ title, creatorId }: categoryInput): Promise<Category> => {
    const category = await Category.create({ title, creatorId });

    return category;
  };

  save = async (category: Category) => {
    await category.save();
  };

  remove = async (
    id: string | FindOperator<string> | undefined,
    creatorId: string | FindOperator<string> | undefined
  ) => {
    await Category.delete({ id, creatorId });
  };

  findByTitle = async (title: string): Promise<Category | undefined> => {
    const category = await Category.findOne({ where: { title } });

    return category;
  };

  findById = async (id: string | FindOperator<string> | undefined): Promise<Category | undefined> => {
    const category = await Category.findOne({ where: { id } });

    return category;
  };

  update = async (data: updateInput, id: string | FindOperator<string> | undefined): Promise<Category> => {
    const updatedCategory = await getConnection()
      .createQueryBuilder()
      .update(Category)
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedCategory.raw[0] as Category;
  };
}

export default new CategoryManager();
