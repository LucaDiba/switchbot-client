import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithPower } from "./Device";

type DeviceType = typeof DEVICE_TYPES.BOT;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceWithPowerStatusBody<DeviceType>;

export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotBot extends DeviceWithPower<
  StatusBody,
  CommandBody
> {
  public press = () => this.sendCommand("press");
}
