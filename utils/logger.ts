export const logger = {
    log: (message: string) => console.log(`[LOG] ${new Date().toISOString()} - ${message}`),
  };
  
  export const prettyPrint = (label: string, data: any) => {
    console.log(`[DATA] ${label}:`, JSON.stringify(data, null, 2));
  };