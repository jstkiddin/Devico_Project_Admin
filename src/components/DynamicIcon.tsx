import * as React from 'react'
import * as Icons from '@mui/icons-material'

type IconType = typeof import('@mui/icons-material')

interface DynamicIconProps {
  iconName: string
  className: string
}

function upperFirst(string: string) {
  return string.slice(0, 1).toUpperCase() + string.slice(1, string.length)
}

function fixIconNames(string: string) {
  const name = string.split('-').map(upperFirst).join('')
  if (name === '3dRotation') {
    return 'ThreeDRotation'
  }
  if (name === '4k') {
    return 'FourK'
  }
  if (name === '360') {
    return 'ThreeSixty'
  }
  return name
}

export default class DynamicIcon extends React.Component<DynamicIconProps> {
  render() {
    return React.createElement(Icons[fixIconNames(this.props.iconName)! as keyof IconType], {
      className: this.props.className,
    })
  }
}
