import last from 'lodash/last'

export const getFirstName = (fullName: string): string => fullName.split(' ')[0]
export const getLastName = (fullName: string): string =>
  last(fullName.split(' '))!
