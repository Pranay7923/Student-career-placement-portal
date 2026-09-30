import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Trash2,
  ExternalLink,
  Briefcase,
  HelpCircle,
  Clock,
  MapPin,
  Sparkles,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';

export const NotificationsPage = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, deleteNotification } = useData();
  const [filter, setFilter] = useState('all'); // all | unread
  const navigate = useNavigate();

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'opportunity': return <Briefcase className="w-4 h-4 text-indigo-600" />;
      case 'aptitude': return <HelpCircle className="w-4 h-4 text-cyan-600" />;
      case 'deadline': return <Clock className="w-4 h-4 text-rose-600" />;
      case 'roadmap': return <Sparkles className="w-4 h-4 text-purple-600" />;
      default: return <Bell className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Notifications & Alerts</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Stay updated on new campus hiring drives, test submissions, and application deadlines
          </p>
        </div>

        <div className="flex items-center gap-2">
          {notifications.some(n => !n.read) && (
            <Button
              variant="outline"
              size="sm"
              icon={CheckCheck}
              onClick={markAllNotificationsRead}
            >
              Mark All Read
            </Button>
          )}

          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === 'unread' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Unread ({notifications.filter(n => !n.read).length})
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description={filter === 'unread' ? "You've read all your notifications!" : "You don't have any notifications right now."}
        />
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                !item.read
                  ? 'bg-indigo-50/40 border-indigo-200 shadow-xs'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex-shrink-0 mt-0.5 shadow-xs">
                  {getIcon(item.type)}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 flex-shrink-0" />
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-2xl">
                    {item.message}
                  </p>

                  <span className="text-[11px] text-slate-400 mt-1.5 block">
                    {new Date(item.date).toLocaleDateString()} at {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {item.link && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      markNotificationRead(item.id);
                      navigate(item.link);
                    }}
                  >
                    View
                  </Button>
                )}

                <button
                  onClick={() => deleteNotification(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
