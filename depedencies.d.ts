declare module 'react-native-remix-icon' {
  export interface IconProps {
    name: string
    size?: number
    color?: string
  }

  export default function Icon(props: IconProps): JSX.Element
}