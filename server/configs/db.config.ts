import { createConnection } from 'typeorm';

const dataBaseConnection = async () => {
  const connection = await createConnection();

  await connection.runMigrations();
  if (connection.isConnected) {
    console.log(`dataBase is connected`.green.underline.bold);
  }
};

export default dataBaseConnection;
