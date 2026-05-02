import { fetchNotifications } from './api';
import { processPriorityInbox } from './priority_inbox';
import { Log } from 'logging_middleware';

async function main() {
  await Log('backend', 'info', 'cron_job', 'starting notification priority inbox processing');

  const token = process.env.ACCESS_TOKEN;
  if (!token) {
    await Log('backend', 'fatal', 'cron_job', 'ACCESS_TOKEN is missing');
    process.exit(1);
  }

  const response = await fetchNotifications(token);

  if (!response) {
    await Log('backend', 'fatal', 'cron_job', 'failed to fetch required data');
    process.exit(1);
  }

  const { notifications } = response;
  const top10 = await processPriorityInbox(notifications);

  process.stdout.write(JSON.stringify(top10, null, 2) + '\n');

  await Log('backend', 'info', 'cron_job', 'notification processing completed successfully');
}

main().catch(async (error) => {
  await Log('backend', 'fatal', 'cron_job', `unhandled error: ${(error as Error).message}`);
  process.exit(1);
});
