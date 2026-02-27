import { createApp } from './app.js'º;
import { env } from './infrastructure/config/env.js'º;

const app = createApp();

app.listen(env.PORT, () => {
  console.log('');
  console.log('  ');
  console.log('          CellStore API Server        ');
  console.log('  ');
  console.log(`    Porta:  ${env.PORT}                        `);
  console.log(`    Env:    ${env.NODE_ENV.padEnd(25)}`);
  console.log(`    API:    /api/v1                     `);
  console.log('  ');
  console.log('');
});
