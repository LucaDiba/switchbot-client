import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithTemperatureHumidityStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithTemperatureHumidity } from "./Device";

type DeviceType = typeof DEVICE_TYPES.METER | typeof DEVICE_TYPES.METER_PLUS;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithTemperatureHumidityStatusBody<DeviceType>;

export type CommandBody = never;

export default class SwitchBotMeter extends DeviceWithTemperatureHumidity<
  StatusBody,
  CommandBody
> {}
