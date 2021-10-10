import { useAuth0 } from '@auth0/auth0-react'

const Form = ({ onSubmit, text, textSet }) => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()
  return (
    <form className="mt-10" onSubmit={onSubmit}>
      <textarea
        value={text}
        rows="3"
        className="border border-gray-300 rounded w-full block px-2 py-1"
        onChange={(e) => textSet(e.target.value)}
      />
      <div className="mt-4">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-2 py-1 rounded">
              Send
            </button>
            <img src={user?.picture} width={30} className="rounded-full" />
            <span>{user?.name}</span>
            <button
              typeof="button"
              onClick={() =>
                logout({ returnTo: process.env.NEXT_PUBLIC_URL + '/blog' })
              }
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded"
              typeof="button"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </form>
  )
}

export default Form
