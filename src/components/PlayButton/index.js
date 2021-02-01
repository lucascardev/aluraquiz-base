/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'

const Button = styled.button`
padding: ${({ theme }) => theme.padding};
border: none;
border-radius: ${({ theme }) => theme.borderRadius};
background-color: ${({ theme }) => theme.colors.primary};
font-family: 'Hachi Maru Pop';
cursor: pointer;
`

export default function PlayButton (props) {
  // eslint-disable-next-line react/prop-types
  let disableStatus
  let hiddenSwitch
  // eslint-disable-next-line react/prop-types
  if (props.name === '') {
    disableStatus = true
    hiddenSwitch = 'hidden'
  } else {
    disableStatus = false
    hiddenSwitch = 'visible'
  }
  // eslint-disable-next-line react/prop-types
  return <Button disabled={disableStatus} style={{ visibility: hiddenSwitch }}>{props.title}</Button>
}
