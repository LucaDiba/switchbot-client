import { BaseDeviceGetDeviceBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type DeviceType =
  | typeof DEVICE_TYPES.INDOOR_CAM
  | typeof DEVICE_TYPES.PAN_TILT_CAM
  | typeof DEVICE_TYPES.PAN_TILT_CAM_2K;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotCamera extends Device {}
