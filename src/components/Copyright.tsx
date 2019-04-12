import React from 'react'

export default ({ name, startYear }: { name: string, startYear: number }) => {
  const currentYear = new Date().getFullYear();
  return <small>&copy; {startYear}{currentYear > startYear ? `-${currentYear}` : ''} {name}.</small>
}