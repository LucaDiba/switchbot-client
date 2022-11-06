import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types.js";
import { Device } from "./Device.js";

export type GetDeviceBody = BaseDeviceGetDeviceBody;

export type StatusBody = BaseDeviceStatusBody & {
  temperature: number;
  humidity: number;
};

export type CommandBody = never;

export default class SwitchBotMeter extends Device<StatusBody, CommandBody> {
  /**
   * @returns temperature in celsius
   */
  public getTemperature = async () => (await this.getStatus()).temperature;

  /**
   * @returns humidity percentage (integer, 0 - 100)
   */
  public getHumidity = async () => (await this.getStatus()).humidity;
}
