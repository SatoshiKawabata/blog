import React from 'react'

interface Props extends React.Props<{}> {
  name: string,
  startYear: number
}

const Copyright: React.StatelessComponent<Props> = ({ name, startYear }) => {
  const currentYear = new Date().getFullYear();
  return <small>&copy; {startYear}{currentYear > startYear ? `-${currentYear}` : ''} {name}.</small>
}

export default Copyright