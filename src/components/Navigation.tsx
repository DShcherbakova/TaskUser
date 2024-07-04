import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div className='navigation'>
      <NavLink className='navigation' to='/'>Tasks</NavLink>
      <NavLink className='navigation' to='/users '>Users</NavLink>

    </div>
  )
}

export default Navigation
