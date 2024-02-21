import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithMotionBrightnessStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType = typeof DEVICE_TYPES.MOTION_SENSOR;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceWithMotionBrightnessStatusBody<DeviceType>;

export type CommandBody = never;

export default class SwitchBotMotionSensor extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {}
