import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithTemperatureHumidityStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithTemperatureHumidity } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.METER | typeof DEVICE_TYPES.METER_PLUS;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithTemperatureHumidityStatusBody<DeviceType>;

export type CommandBody = never;

export default class SwitchBotMeter extends DeviceWithTemperatureHumidity<
  StatusBody,
  CommandBody
> {}
