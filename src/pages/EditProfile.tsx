import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMenu } from 'react-icons/fi'
import Layout from '../components/shared/Layout'
import ProfilePicture from '../components/shared/ProfilePicture'

const EditProfile = ({ user }) => {
  const [showDrawer, setShowDrawer] = React.useState(false)
  const [selected, setSelected] = React.useState(0)
  const navigate = useNavigate()

  const options = [
    'Edit Profile',
    'Change Password',
    'Apps and Websites',
    'Email and SMS',
    'Push Notifications',
    'Manage Contacts',
    'Privacy and Security',
    'Login Activity',
    'Emails from Sinstagram',
    'Change Password',
  ]

  const handleListClick = (index) => {
    setSelected(index)
    switch (index) {
      case 0: {
        navigate('/accounts/edit')
        break
      }

      default:
        break
    }
  }

  const handleToggleDrawer = () => {
    setShowDrawer((prev) => !prev)
  }

  return (
    <Layout title='Edit Profile'>
      <section className='flex '>
        <div className='drawer drawer-mobile rounded w-80'>
          <input id='edit-drawer' type='checkbox' className='drawer-toggle' />
          <div className='drawer-content '>
            <label htmlFor='edit-drawer' className=' md:hidden'>
              <FiMenu size={20} />
            </label>
          </div>
          <div className='drawer-side'>
            <label htmlFor='edit-drawer' className='drawer-overlay'></label>
            <ul className='menu w-72 bg-base-100 border-2 border-base-300 text-base-content'>
              {options.map((option, index) => {
                return (
                  <li
                    key={option}
                    className={`border-2 border-transparent ${
                      selected === index && '  border-l-gray-600'
                    }`}
                    onClick={() => handleListClick(index)}
                  >
                    <a className='active:bg-base-100 text-black'>{option}</a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <main className='w-full'>
          <EditUserInfo user={user} />
        </main>
      </section>
    </Layout>
  )
}

const EditUserInfo = ({ user }) => {
  return (
    <section className='card bg-white w-full h-full rounded border-2 border-base-300'>
      <div className='card-body'>
        <div className='mt-0 w-9 h-9'>
          <ProfilePicture />
        </div>
      </div>
    </section>
  )
}

export default EditProfile
