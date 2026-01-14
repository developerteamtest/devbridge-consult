import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { format, isToday, addDays, startOfToday, isSameDay } from 'date-fns';
import {
  Calendar,
  Search,
  LogOut,
  CalendarDays,
  Users,
  CalendarOff,
  ChevronDown,
  Plus,
  X,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type AppointmentStatus = 'booked' | 'completed' | 'cancelled' | 'spam';

interface Appointment {
  id: string;
  name: string;
  email: string;
  date: Date;
  time: string;
  status: AppointmentStatus;
  message?: string;
}

// Mock data
const mockAppointments: Appointment[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', date: startOfToday(), time: '10:00', status: 'booked', message: 'Need help with microservices architecture' },
  { id: '2', name: 'Sarah Connor', email: 'sarah@example.com', date: startOfToday(), time: '14:00', status: 'booked', message: 'Database scaling issues' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', date: addDays(startOfToday(), 1), time: '11:00', status: 'booked' },
  { id: '4', name: 'Emily Davis', email: 'emily@example.com', date: addDays(startOfToday(), -1), time: '15:00', status: 'completed' },
  { id: '5', name: 'Alex Wilson', email: 'alex@example.com', date: addDays(startOfToday(), -2), time: '10:00', status: 'cancelled' },
  { id: '6', name: 'Spam Bot', email: 'spam@fake.com', date: addDays(startOfToday(), -3), time: '16:00', status: 'spam' },
  { id: '7', name: 'Lisa Anderson', email: 'lisa@example.com', date: addDays(startOfToday(), 2), time: '12:00', status: 'booked' },
  { id: '8', name: 'Chris Brown', email: 'chris@example.com', date: addDays(startOfToday(), 3), time: '14:00', status: 'booked' },
];

const statusConfig: Record<AppointmentStatus, { label: string; color: string; bgColor: string }> = {
  booked: { label: 'Booked', color: 'text-accent', bgColor: 'bg-accent/10' },
  completed: { label: 'Completed', color: 'text-success', bgColor: 'bg-success/10' },
  cancelled: { label: 'Cancelled', color: 'text-muted-foreground', bgColor: 'bg-muted' },
  spam: { label: 'Spam', color: 'text-destructive', bgColor: 'bg-destructive/10' },
};

const Admin = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<'appointments' | 'holidays'>('appointments');
  
  // Holiday management
  const [holidays, setHolidays] = useState<Date[]>([
    addDays(startOfToday(), 7),
    addDays(startOfToday(), 14),
  ]);
  const [newHolidayDate, setNewHolidayDate] = useState<Date | undefined>();

  const filteredAppointments = useMemo(() => {
    let filtered = [...appointments];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        apt => apt.name.toLowerCase().includes(query) || apt.email.toLowerCase().includes(query)
      );
    }

    // Date filter
    if (filterDate) {
      filtered = filtered.filter(apt => isSameDay(apt.date, filterDate));
    }

    // Today only filter
    if (showTodayOnly) {
      filtered = filtered.filter(apt => isToday(apt.date));
    }

    // Sort: completed and spam at bottom
    filtered.sort((a, b) => {
      const priorityOrder: Record<AppointmentStatus, number> = { booked: 0, cancelled: 1, completed: 2, spam: 3 };
      if (priorityOrder[a.status] !== priorityOrder[b.status]) {
        return priorityOrder[a.status] - priorityOrder[b.status];
      }
      return a.date.getTime() - b.date.getTime();
    });

    return filtered;
  }, [appointments, searchQuery, filterDate, showTodayOnly]);

  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status } : apt))
    );
  };

  const addHoliday = () => {
    if (newHolidayDate && !holidays.some(h => isSameDay(h, newHolidayDate))) {
      setHolidays([...holidays, newHolidayDate]);
      setNewHolidayDate(undefined);
    }
  };

  const removeHoliday = (date: Date) => {
    setHolidays(holidays.filter(h => !isSameDay(h, date)));
  };

  const todayCount = appointments.filter(apt => isToday(apt.date) && apt.status === 'booked').length;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-heading text-xl font-bold text-foreground">
            DevBridge<span className="text-accent">.</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setSidebarTab('appointments')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              sidebarTab === 'appointments'
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            <CalendarDays className="w-5 h-5" />
            Appointments
          </button>
          <button
            onClick={() => setSidebarTab('holidays')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              sidebarTab === 'holidays'
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-secondary"
            )}
          >
            <CalendarOff className="w-5 h-5" />
            Holidays
          </button>
        </nav>

        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary transition-all"
          >
            <Home className="w-5 h-5" />
            View Site
          </Link>
          <Link
            to="/login"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <AnimatePresence mode="wait">
          {sidebarTab === 'appointments' ? (
            <motion.div
              key="appointments"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="font-heading text-2xl font-bold">Appointments</h1>
                  <p className="text-muted-foreground text-sm">
                    {todayCount} consultation{todayCount !== 1 ? 's' : ''} scheduled for today
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search by name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field pl-10 w-64"
                    />
                  </div>

                  {/* Date Filter */}
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="btn-secondary flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {filterDate ? format(filterDate, 'MMM d') : 'Filter Date'}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <CalendarPicker
                        mode="single"
                        selected={filterDate}
                        onSelect={setFilterDate}
                        className="pointer-events-auto"
                      />
                      {filterDate && (
                        <div className="p-2 border-t border-border">
                          <button
                            onClick={() => setFilterDate(undefined)}
                            className="w-full text-sm text-muted-foreground hover:text-foreground"
                          >
                            Clear filter
                          </button>
                        </div>
                      )}
                    </PopoverContent>
                  </Popover>

                  {/* Today Toggle */}
                  <button
                    onClick={() => setShowTodayOnly(!showTodayOnly)}
                    className={cn(
                      "btn-secondary",
                      showTodayOnly && "bg-accent text-accent-foreground"
                    )}
                  >
                    Today Only
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total', value: appointments.length, icon: Users },
                  { label: 'Booked', value: appointments.filter(a => a.status === 'booked').length, icon: CalendarDays },
                  { label: 'Completed', value: appointments.filter(a => a.status === 'completed').length, icon: Calendar },
                  { label: "Today's", value: todayCount, icon: CalendarDays },
                ].map(stat => (
                  <div key={stat.label} className="bg-card rounded-2xl p-5 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Email</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Date</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Time</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredAppointments.map((apt, index) => (
                        <motion.tr
                          key={apt.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.03 }}
                          className={cn(
                            "transition-colors",
                            (apt.status === 'completed' || apt.status === 'spam') && "opacity-60"
                          )}
                        >
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium">{apt.name}</p>
                              {apt.message && (
                                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                                  {apt.message}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-muted-foreground">{apt.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <span className={cn(isToday(apt.date) && "text-accent font-medium")}>
                              {isToday(apt.date) ? 'Today' : format(apt.date, 'MMM d, yyyy')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm">{apt.time}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              "inline-flex px-3 py-1 rounded-full text-xs font-medium",
                              statusConfig[apt.status].bgColor,
                              statusConfig[apt.status].color
                            )}>
                              {statusConfig[apt.status].label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <Popover>
                              <PopoverTrigger asChild>
                                <button className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1">
                                  Change
                                  <ChevronDown className="w-3 h-3" />
                                </button>
                              </PopoverTrigger>
                              <PopoverContent className="w-40 p-2" align="end">
                                {(Object.keys(statusConfig) as AppointmentStatus[]).map(status => (
                                  <button
                                    key={status}
                                    onClick={() => updateStatus(apt.id, status)}
                                    className={cn(
                                      "w-full text-left px-3 py-2 text-sm rounded-lg transition-colors",
                                      apt.status === status
                                        ? "bg-secondary font-medium"
                                        : "hover:bg-secondary"
                                    )}
                                  >
                                    {statusConfig[status].label}
                                  </button>
                                ))}
                              </PopoverContent>
                            </Popover>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredAppointments.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No appointments found
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="holidays"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-8">
                <h1 className="font-heading text-2xl font-bold">Holiday Management</h1>
                <p className="text-muted-foreground text-sm">
                  Block dates from being available for booking
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Add Holiday */}
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h2 className="font-heading text-lg font-semibold mb-4">Add Holiday</h2>
                  
                  <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                    <CalendarPicker
                      mode="single"
                      selected={newHolidayDate}
                      onSelect={setNewHolidayDate}
                      disabled={(date) => date < startOfToday()}
                      className="pointer-events-auto"
                    />
                  </div>

                  <button
                    onClick={addHoliday}
                    disabled={!newHolidayDate}
                    className={cn(
                      "btn-primary w-full flex items-center justify-center gap-2",
                      !newHolidayDate && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Plus className="w-4 h-4" />
                    Add Holiday
                  </button>
                </div>

                {/* Holiday List */}
                <div className="bg-card rounded-2xl p-6 border border-border/50">
                  <h2 className="font-heading text-lg font-semibold mb-4">
                    Blocked Dates ({holidays.length})
                  </h2>
                  
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {holidays.length === 0 ? (
                      <p className="text-muted-foreground text-sm text-center py-8">
                        No holidays scheduled
                      </p>
                    ) : (
                      holidays
                        .sort((a, b) => a.getTime() - b.getTime())
                        .map(date => (
                          <motion.div
                            key={date.toISOString()}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <CalendarOff className="w-5 h-5 text-muted-foreground" />
                              <span className="font-medium">
                                {format(date, 'EEEE, MMMM d, yyyy')}
                              </span>
                            </div>
                            <button
                              onClick={() => removeHoliday(date)}
                              className="p-2 hover:bg-destructive/10 rounded-lg transition-colors group"
                            >
                              <X className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                            </button>
                          </motion.div>
                        ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Admin;
