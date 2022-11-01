import axios, { AxiosInstance } from "axios";
import { v4 as uuidv4 } from "uuid";
import hmacSHA256 from "crypto-js/hmac-sha256";
import Base64 from "crypto-js/enc-base64";
import Bot from "./devices/Bot";

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
    const t = Date.now();
    const nonce = uuidv4();
    const data = this._openToken + t + nonce;
    const sign = Base64.stringify(hmacSHA256(data, this._secretKey));

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
