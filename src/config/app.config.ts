export type AppConfig = {
  appName: string;
  version: string;
  debug: boolean;
  defaultPageSize: number;
};

export const appConfig: AppConfig = {
  appName: "notes-api",
  version: "week-2",
  debug: true,
  defaultPageSize: 10,
};
