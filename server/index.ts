import MongoConnection from './src/config/mongoConnection';
import createExpressApp from './src/config/createExpressApp';
import 'dotenv/config';

const main = async () => {
  // Listen for termination
  process.on('SIGTERM', () => process.exit());

  // Set up the datbase connection
  const dbConnection = await MongoConnection.getInstance();
  dbConnection.open();

  // Instantiate express app with configured routes and middleware
  const app = createExpressApp(dbConnection.createSessionStore());

  // Instantiate a server to listen on a specified port

  app.listen(process.env.PORT || 4000);
};

// Run the server
main();
