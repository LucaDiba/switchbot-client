import { BaseDeviceGetDeviceBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { Device } from "./Device";

type DeviceType =
  | typeof DEVICE_TYPES.INDOOR_CAM
  | typeof DEVICE_TYPES.PAN_TILT_CAM
  | typeof DEVICE_TYPES.PAN_TILT_CAM_2K;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotCamera extends Device {}
