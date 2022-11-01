import axios, { AxiosInstance } from "axios";
import Bot from "./devices/Bot.js";

type SwitchBotOptions = {
  openToken: string;
  secretKey: string;
};

export default class SwitchBot {
  private readonly _openToken: string;
  private readonly _secretKey: string;

  private readonly _axios: AxiosInstance;

  constructor(options: SwitchBotOptions) {
    this._openToken = options.openToken;
    this._secretKey = options.secretKey;

    this._axios = axios.create({
      baseURL: "https://api.switch-bot.com",
      headers: {
        Authorization: this._openToken,
      },
    });
  }

  public bot = (deviceId: string) => {
    return new Bot(deviceId, this.getDeps());
  };

  private getDeps = () => ({
    getRequest: this.getRequest,
    postRequest: this.postRequest,
  });

  private request = async <T>(method: string, path: string, body: any) => {
    const { createHmac, randomUUID } = await import("node:crypto");
    const t = Date.now();
    const nonce = randomUUID();
    const data = this._openToken + t + nonce;
    const sign = createHmac("sha256", this._secretKey)
      .update(Buffer.from(data, "utf-8"))
      .digest()
      .toString("base64");

    const response = await this._axios.request<T>({
      method,
      url: path,
      data: body,
      headers: {
        sign,
        nonce,
        t,
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    });

    return response.data;
  };

  private getRequest = async <T>(path: string) => {
    return this.request<T>("GET", path, "");
  };

  private postRequest = async <T>(path: string, body: any) => {
    return this.request<T>("POST", path, body);
  };
}
