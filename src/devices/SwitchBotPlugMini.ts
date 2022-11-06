import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggle } from "./Device.js";

type GetDeviceBody = BaseDeviceGetDeviceBody;

type StatusBody = BaseDeviceWithPowerStatusBody & {
  deviceType:
    | typeof DEVICE_TYPES.PLUG_MINI_US
    | typeof DEVICE_TYPES.PLUG_MINI_JP;
};

type CommandBody = {
  isDelay: boolean;
  rssiQuality: number;
  currentElectricity: number;
  currentTemperature: number;
  onTime: number;
  currentWeight: number;
  currentPower: number;
  isOverload: boolean;
  currentVoltage: number;
  power: "on" | "off";
  isLed: boolean;
};

export default class SwitchBotPlug extends DeviceWithPowerToggle<
  StatusBody,
  CommandBody
> {}

export type SwitchBotPlugGetDeviceBody = GetDeviceBody;
export type SwitchBotPlugStatusBody = StatusBody;
export type SwitchBotPlugCommandBody = CommandBody;
