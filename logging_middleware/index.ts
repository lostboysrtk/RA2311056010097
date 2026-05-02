export type LogStack = 'backend' | 'frontend';
export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';
export type LogPackage = 
  | 'cache' | 'controller' | 'cron_job' | 'db' | 'domain' 
  | 'handler' | 'repository' | 'route' | 'service' 
  | 'auth' | 'config' | 'middleware' | 'utils';

export async function Log(stack: LogStack, level: LogLevel, pkg: LogPackage, message: string): Promise<void> {
  const token = process.env.ACCESS_TOKEN;
  if (!token) {
    return;
  }

  const payload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    const response = await fetch('http://20.207.122.201/evaluation-service/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      // Intentionally not using console.log as per instructions
    }
  } catch (error) {
    // Intentionally not using console.log
  }
}
