import 'dotenv/config';
import { networkInterfaces } from 'os';

import { app } from './app';

const interfaces = networkInterfaces();

const network = Object.values(interfaces)
  .flat()
  .find(
    (adapter) =>
      adapter?.family.toLocaleLowerCase() === 'ipv4' &&
      adapter.address !== '127.0.0.1'
  );

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `HTTP server is running! 🚀️\n${
      network &&
      `Available at: http://${network.address.concat(
        `:${process.env.PORT || 3333}`
      )}`
    }`
  );
});
