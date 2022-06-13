export type EventData = {
  id: string
  title: string
  date: string
  place: string
  discipline: string
  status: string
  series: string
  costOfParticipation: string
  registration: number
  eventInfo: string
  createdAt: string
  updatedAt: string
}[]

export type EventItem = {
  id: string
  title: string
  date: string
  place: string
  discipline: string
  status: string
  series: string
  costOfParticipation: string
  registration: number
  eventInfo: string
  createdAt: string
  updatedAt: string
}

export type UserData = {
  fullName: string
  birthday: string
  city: string
  address: string
  driverLicenseNum: string
  representiveFullName: string
  cellNumber: string
  representiveLicenseNum: string
  idNumber: string
  sportDriverLicenseNum: string
}

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
  height?: number
  minWidth?: number
  maxWidth?: number
  width?: string | number
  align?: 'center' | 'right'
}

export interface Data {
  name: string
  phone: string
  email: string
  details: string
  buttons: string
}
export interface LicenseData {
  id: string
  fullName: string
  dateOfIssuing: string
  licenseType: string
  status: string
  payedStatus: string
  button: string
}

export interface LicenseCells {
  id: keyof LicenseData
  label: string
  height?: number
  minWidth?: number
  maxWidth?: number
  width?: string | number
  align?: 'center' | 'right'
  format?: (value: number) => string
}

export interface ILicenses {
  id: string
  fullNameUK: string
  fullNameLat: string
  birthday: string
  nativeCity: string
  address: string
  identificationNum: string
  email: string
  phone: string
  status: string
  paidStatus: string
  license: string
  user_id: number
  createdAt: string
}
