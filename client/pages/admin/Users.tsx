import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockUsers } from '@/data/mock';
import { Plus, Search, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';

export default function AdminUsers() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'teacher' | 'student'>('all');
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { translations } = useApp();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      setCurrentUser(parsedUser);
    } else {
      navigate('/');
    }
    setUsers(Object.values(mockUsers));
  }, [navigate]);

  if (!currentUser) return null;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const userCounts = {
    total: users.length,
    admin: users.filter((u) => u.role === 'admin').length,
    teacher: users.filter((u) => u.role === 'teacher').length,
    student: users.filter((u) => u.role === 'student').length,
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'teacher':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'student':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white'>{translations.users}</h1>
        <p className='mt-2 text-gray-600 dark:text-gray-400'>{translations.manageUsers}</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className='mb-8 mt-8 grid grid-cols-1 gap-4 md:grid-cols-4'
      >
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Total Users</p>
          <p className='mt-2 text-3xl font-bold text-gray-900 dark:text-white'>{userCounts.total}</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>Administrators</p>
          <p className='mt-2 text-3xl font-bold text-red-600 dark:text-red-400'>{userCounts.admin}</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{translations.teachers}</p>
          <p className='mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400'>{userCounts.teacher}</p>
        </div>
        <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800'>
          <p className='text-sm font-medium text-gray-600 dark:text-gray-400'>{translations.students}</p>
          <p className='mt-2 text-3xl font-bold text-green-600 dark:text-green-400'>{userCounts.student}</p>
        </div>
      </motion.div>

      {/* Search and Filter Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'
      >
        <div className='relative w-full sm:w-96'>
          <Search size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <input
            type='text'
            placeholder={translations.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
          />
        </div>
        <div className='flex items-center gap-2'>
          <Select value={filterRole} onValueChange={(value) => setFilterRole(value as any)}>
            <SelectTrigger className='w-auto'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Roles</SelectItem>
              <SelectItem value='admin'>Admin</SelectItem>
              <SelectItem value='teacher'>Teacher</SelectItem>
              <SelectItem value='student'>Student</SelectItem>
            </SelectContent>
          </Select>
          <Button variant='secondary'>
            <Plus size={18} />
            Add User
          </Button>
        </div>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className='overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-800'
      >
        {filteredUsers.length > 0 ? (
          <div className='overflow-x-auto'>
            <table className='w-full text-sm'>
              <thead>
                <tr className='border-b border-gray-200 dark:border-slate-700'>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Name</th>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Email</th>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Role</th>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Department</th>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Phone</th>
                  <th className='px-6 py-4 text-left font-semibold text-gray-900 dark:text-white'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className='border-b border-gray-200 transition-colors hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-700'
                  >
                    <td className='px-6 py-4 font-medium text-gray-900 dark:text-white'>
                      <div className='flex items-center gap-3'>
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                        </Avatar>
                        {user.name}
                      </div>
                    </td>
                    <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{user.email}</td>
                    <td className='px-6 py-4'>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleColor(user.role)}`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{user.department}</td>
                    <td className='px-6 py-4 text-gray-600 dark:text-gray-400'>{user.phone}</td>
                    <td className='px-6 py-4'>
                      <button className='text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='p-12 text-center'>
            <p className='text-gray-600 dark:text-gray-400'>No users found matching your search.</p>
          </div>
        )}
      </motion.div>
    </AppLayout>
  );
}
