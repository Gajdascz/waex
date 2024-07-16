const INDICATORS = [
  {
    key: 'success',
    color: [0, 100, 0], //#006500
    symbol: `✔`,
  },
  { 
    key: 'warning',
    color: [255, 255, 0], // #ffff00
    symbol: '⚠️',
  },
  {
    key: 'error',
    color: [255, 85, 85], //#ff5555
    symbol: '✘',
  },
  {
    key: 'neutral',
    color: [105, 105, 105], //#696969
    symbol: '○',
  },
]

// TODO: Implement automated necessary package install and file configuration when loadDefaultCommands is true.
const COMMANDS = [
  {
    runner: 'npx',
    cmd: 'prettier',
    args: ['--write'],
    color: [86, 179, 180], //#56B3FF
    label: '[PRETTIER]',
  },
  {
    runner: 'npx',
    cmd: 'eslint',
    args: ['--fix'],
    color: [75, 50, 195], //#4B32C3
    label: '[ESLINT]',
  },
  {
    runner: 'npm run',
    cmd: 'tsx',
    args: [],
    color: [15, 255, 160], //#0FFFA0
    label: '[TSX]',
  },
]

const CONFIG = {
  debounce: 100,
  label: '[WATCHER]',
  defaultErrorColor:     [255, 0, 0],     //#750000,
  defaultErrorTintColor: [50, 0, 0],      //#320000,
  defaultAppLogMsgColor: [135, 206, 235], //##87ceeb,
  loadDefault: true,
  loadDefaultIndicators: false,
  loadDefaultCommands: false,
}

const ALL = { INDICATORS, COMMANDS, CONFIG };


export { INDICATORS, COMMANDS, ALL };
