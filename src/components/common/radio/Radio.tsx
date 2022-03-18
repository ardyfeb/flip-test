import { default as React } from 'react'
import { Box } from '../box'

export interface RadioProps {
  selected?: boolean
}

export const Radio: React.FunctionComponent<RadioProps> = props => {
  return (
    <Box width={20} aspectRatio={1} borderWidth={2} borderColor="orange" borderRadius="full" p={0.7}>
      {
        props.selected && (
          <Box flex={1} bgColor="orange" borderRadius="full" />
        )
      }
    </Box>
  )
}