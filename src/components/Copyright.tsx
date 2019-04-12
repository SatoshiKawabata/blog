import React from 'react'

export default ({ name, startYear }) => {
  const currentYear = new Date().getFullYear();
  return <small>&copy; {startYear}{currentYear > startYear ? `-${currentYear}` : ''} {name}.</small>
}