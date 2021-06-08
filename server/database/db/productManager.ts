import { Product } from '../entities/Product';
import { FindOperator, getConnection } from 'typeorm';
import CategoryManager from './CategoryManager';

export interface productInput {
  title?: string;
  genre?: string;
  price?: number;
  categoryId?: string;
}

export interface updateInput {
  title?: string;
  image?: string;
  price?: number;
  genre?: string;
}

export interface searchInput {
  price?: string;
  categoryTitle?: string;
}

class ProductManager {
  create = async ({ title, genre, price, categoryId }: productInput): Promise<Product> => {
    const product = await Product.create({ title, genre, price, categoryId });

    return product;
  };

  save = async (product: Product) => {
    await product.save();
  };

  getAll = async ({ price, categoryTitle }: searchInput): Promise<Product[]> => {
    const products = await getConnection().query(`
    select  p.* 
    from product p 
    inner join category c on c.id = p."categoryId"
    ${categoryTitle ? `where c.title like '${categoryTitle}'` : ''}
    ${price ? `order by p.price "${price}"` : 'order by p."createdAt" DESC'}
    `);

    return products;
  };

  findByTitle = async (title: string): Promise<Product | undefined> => {
    const product = await Product.findOne({ where: { title } });

    return product;
  };

  findById = async (id: string | FindOperator<string> | undefined): Promise<Product | undefined> => {
    const product = await Product.findOne({ where: { id } });

    return product;
  };

  remove = async (id: string | FindOperator<string> | undefined) => {
    await Product.delete({ id });
  };

  update = async (data: updateInput, id: string | FindOperator<string> | undefined): Promise<Product> => {
    const updatedProduct = await getConnection()
      .createQueryBuilder()
      .update(Product)
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute();

    return updatedProduct.raw[0] as Product;
  };
}

export default new ProductManager();
