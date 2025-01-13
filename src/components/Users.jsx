import { useState } from "react"
const initialUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    address: '123 Main St, City, Country',
    flagged: false,
    complaints: 3,
    solved: 2,
    pending: 0,
    ongoing: 1
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8901',
    address: '456 Oak St, City, Country',
    flagged: true,
    complaints: 5,
    solved: 3,
    pending: 1,
    ongoing: 1
  },
  // Add more sample users as needed
]
function Users() {

  const [users, setUsers] = useState(initialUsers)

  const toggleFlag = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, flagged: !user.flagged }
        : user
    ))
  }
  return (
    <div>


<div className="min-h-screen  p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">User Management</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Info</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complaints</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        <span className="text-sm text-gray-500">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">{user.phone}</span>
                        <span className="text-sm text-gray-500">{user.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-900">
                          Status: {user.flagged ? 
                            <span className="text-red-600 font-medium">Flagged</span> : 
                            <span className="text-green-600 font-medium">Normal</span>
                          }
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-900">Total: {user.complaints}</span>
                        <span className="text-sm text-green-600">Solved: {user.solved}</span>
                        <span className="text-sm text-yellow-600">Ongoing: {user.ongoing}</span>
                        <span className="text-sm text-red-600">Pending: {user.pending}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleFlag(user.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${
                          user.flagged
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {user.flagged ? 'Unflag' : 'Flag'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Users