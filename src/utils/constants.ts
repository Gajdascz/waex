const LOG_TYPES = {
  LOG: 'log',
  WARN: 'warn',
  ERR: 'error',
  INFO: 'info',
} as const;

// TODO: Create ChalkString type that checks for an ASCII escape code(s).
type ChalkString = string;

type RGBChannel = IntRange<0,256>
type RGBColor = [RGBChannel,RGBChannel,RGBChannel]

type Enumerate<Min extends number, Accumulator extends number[] = []> = Accumulator['length'] extends Min
  ? Accumulator[number]
  : Enumerate<Min, [...Accumulator, Accumulator['length']]>
  
type IntRange<Min extends number, Max extends number> = Exclude<Enumerate<Max>, Enumerate<Min>>

export type {RGBChannel, RGBColor, ChalkString}
export { LOG_TYPES}