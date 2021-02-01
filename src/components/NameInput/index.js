/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components'

const Input = styled.input`
padding: 8px;
border: none;
`

export default function NameInput (props) {
  // eslint-disable-next-line react/prop-types
  return <Input disabled={props.disabled} placeholder={props.placeholder} onChange={(event) => props.setValue(event.target.value)} />
}
