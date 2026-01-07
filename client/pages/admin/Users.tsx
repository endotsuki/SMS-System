import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '@/types';
import { AppLayout } from '@/components/layout/AppLayout';
import { useApp } from '@/context/AppContext';
import { mockUsers } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { IconDotsVertical, IconPlus, IconSearch } from '@tabler/icons-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
      setCurrentUser(JSON.parse(user));
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
    const colors = {
      admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
      teacher: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
      student: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    };
    return colors[role as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  return (
    <AppLayout user={currentUser} onLogout={handleLogout}>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 dark:text-white md:text-4xl'>{translations.users}</h1>
        <p className='mt-1 text-sm text-gray-600 dark:text-gray-400 md:text-base'>Manage all system users</p>
      </div>

      {/* Stats */}
      <div className='mb-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
        {[
          { label: 'Total', value: userCounts.total, color: 'text-gray-900 dark:text-white' },
          { label: 'Admins', value: userCounts.admin, color: 'text-red-600 dark:text-red-400' },
          { label: 'Teachers', value: userCounts.teacher, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Students', value: userCounts.student, color: 'text-green-600 dark:text-green-400' },
        ].map((stat) => (
          <div key={stat.label} className='rounded-lg border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800'>
            <p className='text-xs font-medium text-gray-600 dark:text-gray-400'>{stat.label}</p>
            <p className={`mt-1 text-2xl font-bold md:text-3xl ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <div className='relative flex-1 sm:max-w-md'>
          <IconSearch size={18} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
          <Input
            type='text'
            placeholder='Search users...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm dark:border-slate-700 dark:bg-slate-800'
          />
        </div>
        <div className='flex gap-2'>
          <Select value={filterRole} onValueChange={(value) => setFilterRole(value as any)}>
            <SelectTrigger className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white sm:w-auto'>
              <SelectValue placeholder='All Roles' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Roles</SelectItem>
              <SelectItem value='admin'>Admin</SelectItem>
              <SelectItem value='teacher'>Teacher</SelectItem>
              <SelectItem value='student'>Student</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Users Table */}
      <div className='relative overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/70'>
        {filteredUsers.length > 0 ? (
          <>
            <div className='hidden overflow-x-auto p-5 md:block'>
              <Table>
                <TableHeader className='sticky top-0 z-10 bg-white/80 backdrop-blur dark:bg-slate-900/80'>
                  <TableRow className='border-b border-slate-200/60 dark:border-slate-700/60'>
                    {['Name', 'Email', 'Role', 'Department', 'Action'].map((head) => (
                      <TableHead key={head} className='text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400'>
                        {head}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className='transition hover:bg-slate-100/60 dark:hover:bg-slate-800/40'>
                      <TableCell className='flex items-center'>
                        <div className='flex items-center gap-3'>
                          <Avatar className='h-9 w-9 ring-1 ring-slate-200 dark:ring-slate-700'>
                            <AvatarImage src={user.avatar} alt={user.name} />
                          </Avatar>
                          <div className='text-left'>
                            <p className='font-medium text-slate-900 dark:text-white'>{user.name}</p>
                            <p className='text-xs text-slate-500 dark:text-slate-400'>ID: {user.id}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className='text-sm text-slate-600 dark:text-slate-300'>{user.email}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getRoleColor(
                            user.role
                          )}`}
                        >
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className='text-sm text-slate-600 dark:text-slate-300'>{user.department || '—'}</TableCell>
                      <TableCell>
                        <Button variant='ghost' size='icon' className='rounded-full hover:bg-slate-200 dark:hover:bg-slate-700'>
                          <IconDotsVertical size={18} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* ================= Mobile Cards ================= */}
            <div className='divide-y divide-slate-200/60 dark:divide-slate-700/60 md:hidden'>
              {filteredUsers.map((user) => (
                <div key={user.id} className='space-y-3 p-4 transition hover:bg-slate-100/40 dark:hover:bg-slate-800/40'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-11 w-11 ring-1 ring-slate-200 dark:ring-slate-700'>
                        <AvatarImage src={user.avatar} alt={user.name} />
                      </Avatar>
                      <div>
                        <p className='font-semibold text-slate-900 dark:text-white'>{user.name}</p>
                        <p className='text-xs text-slate-600 dark:text-slate-400'>{user.email}</p>
                      </div>
                    </div>

                    <Button variant='ghost' size='icon' className='rounded-full hover:bg-slate-200 dark:hover:bg-slate-700'>
                      <IconDotsVertical size={18} />
                    </Button>
                  </div>

                  <div className='flex flex-wrap items-center gap-2'>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className='text-xs text-slate-600 dark:text-slate-400'>{user.department || 'No department'}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* ================= Empty State ================= */
          <div className='flex flex-col items-center justify-center gap-2 p-14 text-center'>
            <p className='text-sm font-medium text-slate-600 dark:text-slate-400'>No users found</p>
            <p className='text-xs text-slate-500 dark:text-slate-500'>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
