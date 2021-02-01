/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import NextLink from 'next/link'

export default function Link ({ href, children, ...props }) {
  return (
        <NextLink href={href} passHref>
            <a {...props}>
            {children}
            </a>
        </NextLink>
  )
}
