import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithMotionBrightnessStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithStatus } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.CONTACT_SENSOR;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody =
  BaseDeviceWithMotionBrightnessStatusBody<DeviceType> & {
    openState: "open" | "close" | "timeOutNotClose";
  };

export type CommandBody = never;

export default class SwitchBotContactSensor extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {}
