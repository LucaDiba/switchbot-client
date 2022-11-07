import { BaseDeviceGetDeviceBody } from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { Device } from "./Device.js";

type DeviceType = typeof DEVICE_TYPES.REMOTE;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotRemote extends Device {}
