import { Buffer } from "node:buffer";
import { createHmac, randomUUID } from "node:crypto";

import axios, { AxiosInstance } from "axios";

import SwitchBotBlindTilt from "./devices/SwitchBotBlindTilt";
import SwitchBotBot from "./devices/SwitchBotBot";
import SwitchBotCamera from "./devices/SwitchBotCamera";
import SwitchBotCeilingLight from "./devices/SwitchBotCeilingLight";
import SwitchBotColorBulb from "./devices/SwitchBotColorBulb";
import SwitchBotContactSensor from "./devices/SwitchBotContactSensor";
import SwitchBotCurtain from "./devices/SwitchBotCurtain";
import SwitchBotCurtain3 from "./devices/SwitchBotCurtain3";
import SwitchBotHub from "./devices/SwitchBotHub";
import SwitchBotHub2 from "./devices/SwitchBotHub2";
import SwitchBotHumidifier from "./devices/SwitchBotHumidifier";
import SwitchBotKeypad from "./devices/SwitchBotKeypad";
import SwitchBotLock from "./devices/SwitchBotLock";
import SwitchBotMeter from "./devices/SwitchBotMeter";
import SwitchBotMotionSensor from "./devices/SwitchBotMotionSensor";
import SwitchBotPlug from "./devices/SwitchBotPlug";
import SwitchBotPlugMini from "./devices/SwitchBotPlugMini";
import SwitchBotRemote from "./devices/SwitchBotRemote";
import SwitchBotRobotVacuumCleaner from "./devices/SwitchBotRobotVacuumCleaner";
import SwitchBotStripLight from "./devices/SwitchBotStripLight";
import Scene from "./scenes/Scene";
import {
  DeviceId,
  GetAllDevicesResponse,
  GetAllScenesResponse,
  SceneId,
} from "./types";

export type SwitchBotOptions = {
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

  // Devices
  public devices = async () => {
    const response =
      await this.getRequest<GetAllDevicesResponse>("/v1.1/devices");
    return response.body;
  };

  public blindTilt = (deviceId: DeviceId) => {
    return new SwitchBotBlindTilt(deviceId, this.getDeps());
  };

  public bot = (deviceId: DeviceId) => {
    return new SwitchBotBot(deviceId, this.getDeps());
  };

  public camera = (deviceId: DeviceId) => {
    return new SwitchBotCamera(deviceId, this.getDeps());
  };

  public ceilingLight = (deviceId: DeviceId) => {
    return new SwitchBotCeilingLight(deviceId, this.getDeps());
  };

  public colorBulb = (deviceId: DeviceId) => {
    return new SwitchBotColorBulb(deviceId, this.getDeps());
  };

  public contactSensor = (deviceId: DeviceId) => {
    return new SwitchBotContactSensor(deviceId, this.getDeps());
  };

  public curtain = (deviceId: DeviceId) => {
    return new SwitchBotCurtain(deviceId, this.getDeps());
  };

  public curtain3 = (deviceId: DeviceId) => {
    return new SwitchBotCurtain3(deviceId, this.getDeps());
  };

  public hub = (deviceId: DeviceId) => {
    return new SwitchBotHub(deviceId, this.getDeps());
  };

  public hub2 = (deviceId: DeviceId) => {
    return new SwitchBotHub2(deviceId, this.getDeps());
  };

  public humidifier = (deviceId: DeviceId) => {
    return new SwitchBotHumidifier(deviceId, this.getDeps());
  };

  public keypad = (deviceId: DeviceId) => {
    return new SwitchBotKeypad(deviceId, this.getDeps());
  };

  public lock = (deviceId: DeviceId) => {
    return new SwitchBotLock(deviceId, this.getDeps());
  };

  public meter = (deviceId: DeviceId) => {
    return new SwitchBotMeter(deviceId, this.getDeps());
  };

  public motionSensor = (deviceId: DeviceId) => {
    return new SwitchBotMotionSensor(deviceId, this.getDeps());
  };

  public plug = (deviceId: DeviceId) => {
    return new SwitchBotPlug(deviceId, this.getDeps());
  };

  public plugMini = (deviceId: DeviceId) => {
    return new SwitchBotPlugMini(deviceId, this.getDeps());
  };

  public remote = (deviceId: DeviceId) => {
    return new SwitchBotRemote(deviceId, this.getDeps());
  };

  public robotVacuumCleaner = (deviceId: DeviceId) => {
    return new SwitchBotRobotVacuumCleaner(deviceId, this.getDeps());
  };

  public stripLight = (deviceId: DeviceId) => {
    return new SwitchBotStripLight(deviceId, this.getDeps());
  };

  // Scenes
  public scenes = async () => {
    const response =
      await this.getRequest<GetAllScenesResponse>("/v1.1/scenes");
    return response.body;
  };

  public scene = (sceneId: SceneId) => {
    return new Scene(sceneId, this.getDeps());
  };

  // Internal
  private getDeps = () => ({
    getRequest: this.getRequest,
    postRequest: this.postRequest,
  });

  private getRequestHeaders = () => {
    const t = Date.now();
    const nonce = randomUUID();
    const data = this._openToken + t + nonce;
    const sign = createHmac("sha256", this._secretKey)
      .update(Buffer.from(data, "utf-8"))
      .digest()
      .toString("base64");

    return {
      sign,
      nonce,
      t,
    };
  };

  private getRequest = async <T>(path: string) => {
    const response = await this._axios.get<T>(path, {
      headers: this.getRequestHeaders(),
    });

    return response.data;
  };

  private postRequest = async <T>(path: string, body: any) => {
    const response = await this._axios.post<T>(path, body, {
      headers: {
        ...this.getRequestHeaders(),
        "Content-Type": "application/json",
      },
    });

    return response.data;
  };
}
