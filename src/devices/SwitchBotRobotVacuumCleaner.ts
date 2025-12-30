import { BaseDeviceGetDeviceBody, BaseDeviceStatusBody } from "../types";
import { DEVICE_TYPES } from "../utils/constant";
import { DeviceWithStatus } from "./Device";

type DeviceType =
  | typeof DEVICE_TYPES.ROBOT_VACUUM_CLEANER_S1
  | typeof DEVICE_TYPES.ROBOT_VACUUM_CLEANER_S1_PLUS;

export type GetDeviceBody = BaseDeviceGetDeviceBody<DeviceType>;

export type StatusBody = BaseDeviceStatusBody<DeviceType> & {
  workingStatus:
    | "StandBy"
    | "Clearing"
    | "Paused"
    | "GotoChargeBase"
    | "Charging"
    | "ChargeDone"
    | "Dormant"
    | "InTrouble"
    | "InRemoteControl"
    | "InDustCollecting";
  onlineStatus: "online" | "offline";
  battery: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CommandBody = any; // TODO: Figure out what this is

export default class SwitchBotRobotVacuumCleaner extends DeviceWithStatus<
  StatusBody,
  CommandBody
> {
  /**
   * Start vacuuming.
   */
  public start = () => this.sendCommand("start");

  /**
   * Stop vacuuming.
   */
  public stop = () => this.sendCommand("stop");

  /**
   * Return to charging dock.
   */
  public dock = () => this.sendCommand("dock");
}
