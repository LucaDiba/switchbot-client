import { DEVICE_TYPES } from "../utils/constant.js";
import Device from "./Device.js";

export type DeviceId = string;

export type DeviceStatusBody = {
  deviceId: DeviceId;
  deviceType: typeof DEVICE_TYPES.BOT;
  deviceName: string;
  power: "on" | "off";
  hubDeviceId: DeviceId;
};

export type DeviceCommandBody = {};

export default class Bot extends Device<DeviceId, DeviceStatusBody> {
  public getPowerStatus = async () => {
    const status = await this.getStatus();

    if (status.power === "on" || status.power === "off") {
      return status.power;
    }

    throw new Error(`Unexpected power status: ${status.power}`);
  };

  public turnOn = () => this.sendCommand<DeviceCommandBody>("turnOn");

  public turnOff = () => this.sendCommand<DeviceCommandBody>("turnOff");

  public press = () => this.sendCommand<DeviceCommandBody>("press");
}
