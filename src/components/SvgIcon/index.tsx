import React, { useMemo } from 'react'

interface SvgIconProps {
  prefix?: string
  name: string
  color?: string
  stroke?: string
  size?: number | string
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
}

export const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', name, color = 'currentColor', size = 16, stroke, style, ...attrs } = props
  const symbolId = useMemo(() => `#${prefix}-${name}`, [prefix, name])

  return (
    <svg aria-hidden="true" width={size} height={size} {...attrs} style={{ verticalAlign: '-0.3em', ...style }}>
      <use href={symbolId} fill={color} stroke={stroke} />
    </svg>
  )
}
