import createServer from './config/createServer';
import db from './config/database';

const main = async () => {
  // listen for termination
  process.on('SIGTERM', () => process.exit());
  await db.open();

  // creater server on designated port
  const app = createServer();
  app.listen(app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')} 🚀`);
    console.log('  Press Control-C to stop\n');
  });
};
// instantiate app
main();
