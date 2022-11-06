import {
  BaseDeviceGetDeviceBody,
  BaseDeviceWithPowerStatusBody,
} from "../types.js";
import { DEVICE_TYPES } from "../utils/constant.js";
import { DeviceWithPowerToggle } from "./Device.js";

type DeviceType =
  | typeof DEVICE_TYPES.PLUG_MINI_US
  | typeof DEVICE_TYPES.PLUG_MINI_JP;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceWithPowerStatusBody<DeviceType>;

export type CommandBody = {
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
