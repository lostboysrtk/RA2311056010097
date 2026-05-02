import { fetchDepots, fetchVehicles } from './api';
import { optimizeDepotTasks } from './knapsack';
import { Log } from 'logging_middleware';

async function main() {
  await Log('backend', 'info', 'cron_job', 'starting vehicle maintenance scheduler');

  const token = process.env.ACCESS_TOKEN;
  if (!token) {
    await Log('backend', 'fatal', 'cron_job', 'ACCESS_TOKEN is missing');
    process.exit(1);
  }

  const depotsResponse = await fetchDepots(token);
  const vehiclesResponse = await fetchVehicles(token);

  if (!depotsResponse || !vehiclesResponse) {
    await Log('backend', 'fatal', 'cron_job', 'failed to fetch required data');
    process.exit(1);
  }

  const { depots } = depotsResponse;
  const { vehicles } = vehiclesResponse;

  for (const depot of depots) {
    const result = await optimizeDepotTasks(depot, vehicles);
    
    const output = {
      depotID: result.depotID,
      totalImpact: result.totalImpact,
      totalDuration: result.totalDuration,
      assignedTasksCount: result.selectedTasks.length,
      tasks: result.selectedTasks
    };

    process.stdout.write(JSON.stringify(output, null, 2) + '\n');
    await Log('backend', 'info', 'cron_job', `depot ${depot.ID} optimization output generated`);
  }

  await Log('backend', 'info', 'cron_job', 'vehicle maintenance scheduler completed successfully');
}

main().catch(async (error) => {
  await Log('backend', 'fatal', 'cron_job', `unhandled error: ${(error as Error).message}`);
  process.exit(1);
});
