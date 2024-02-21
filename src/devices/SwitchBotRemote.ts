import { BaseDeviceGetDeviceBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { Device } from "./Device";

type DeviceType = typeof DEVICE_TYPES.REMOTE;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = never;

export type CommandBody = never;

export default class SwitchBotRemote extends Device {}
