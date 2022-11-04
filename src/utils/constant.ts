export const SWITCHBOT_RESPONSE_STATUS_OK = 100;

export const DEVICE_TYPES = {
  BOT: "Bot",
  CURTAIN: "Curtain",
  HUB: "Hub",
  HUB_PLUS: "Hub Plus",
  HUB_MINI: "Hub Mini",
  METER: "Meter",
  METER_PLUS: "MeterPlus",
  LOCK: "Smart Lock",
  KEYPAD: "Keypad",
  KEYPAD_TOUCH: "Keypad Touch",
  REMOTE: "Remote",
  MOTION_SENSOR: "Motion Sensor",
  CONTACT_SENSOR: "Contact Sensor",
  CEILING_LIGHT: "Ceiling Light",
  CEILING_LIGHT_PRO: "Ceiling Light Pro",
  PLUG_MINI_US: "Plug Mini (US)",
  PLUG_MINI_JP: "Plug Mini (JP)",
  PLUG: "Plug",
  STRIP_LIGHT: "Strip Light",
  COLOR_BULB: "Color Bulb",
  ROBOT_VACUUM_CLEANER_S1: "Robot Vacuum Cleaner S1",
  ROBOT_VACUUM_CLEANER_S1_PLUS: "Robot Vacuum Cleaner S1 Plus",
  HUMIDIFIER: "Humidifier",
  INDOOR_CAM: "Indoor Cam",
  PAN_TILT_CAM: "Pan/Tilt Cam",
  PAN_TILT_CAM_2K: "Pan/Tilt Cam",
} as const;

export const DEVICE_TYPES_ARRAY = Object.values(DEVICE_TYPES);
