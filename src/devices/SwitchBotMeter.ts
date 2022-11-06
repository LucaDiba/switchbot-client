import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.METER | typeof DEVICE_TYPES.METER_PLUS;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceStatusBody<DeviceType> & {
  temperature: number;
  humidity: number;
};

export type CommandBody = never;

export default class SwitchBotMeter extends Device<StatusBody, CommandBody> {
  /**
   * @returns Temperature in celsius.
   */
  public getTemperature = async () => (await this.getStatus()).temperature;

  /**
   * @returns Humidity percentage (integer, 0 - 100).
   */
  public getHumidity = async () => (await this.getStatus()).humidity;
}
