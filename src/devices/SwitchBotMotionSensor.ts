import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithMotionBrightnessStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithStatus } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.MOTION_SENSOR;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceWithMotionBrightnessStatusBody<DeviceType>;

export type CommandBody = never;

export default class SwitchBotMotionSensor extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {}
