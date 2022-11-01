export type Deps = {
  getRequest: <T>(path: string) => Promise<T>;
  postRequest: <T>(path: string, body: any) => Promise<T>;
};

export type DeviceStatusReponse<T> = {
  statusCode: number;
  message: string;
  body: T;
};
