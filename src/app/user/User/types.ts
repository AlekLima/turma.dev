export enum GoToButtonType {
  GITHUB,
  LINKEDIN,
  WEBSITE,
  INVALID
}

export type UserProps = {
  name: string
  lastName: string
  profilePhotoUrl: string
  urls: string[]
}

export type GoToSectionProps = {
  goToUrls: string[]
}

export type GoToButtonProps = {
  url: string
}

export type GoToButtonStyles = {
  borderColor: string
  hoverBgColor: string
}