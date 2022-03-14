export interface MenuItem {
  label: string,
  path: string
}

export const menuItems: MenuItem[] = [
  { label: 'My Asset Accounts', path: '/' },
  { label: 'Pending Activities', path: '/pending/inbound' }, 
  {
    label: 'Create', path: '/create'
  }
]