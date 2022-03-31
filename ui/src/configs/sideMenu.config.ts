export interface MenuItem {
  label: string,
  path: string
}

export const menuItems: MenuItem[] = [
  { label: 'My Asset Accounts', path: '/' },
  { label: 'Pending Activities', path: '/pending' }, 
  {
    label: 'Create', path: '/create'
  }
]