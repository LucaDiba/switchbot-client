import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType = typeof DEVICE_TYPES.HUB_2;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceStatusBody<DeviceType> & {
  /**
   * The temperature in Celsius.
   */
  temperature: number;

  /**
   * The humidity in percentage.
   */
  humidity: number;

  /**
   * The level of illuminance of the ambience light, 1~20.
   */
  lightLevel: number;

  /**
   * The current firmware version, e.g. `V4.2`.
   */
  version: string;
};

export type CommandBody = never;

export default class SwitchBotHub2 extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {}
