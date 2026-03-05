import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { ListingCard } from './ListingCard';
import { Edit2, LogOut, User as UserIcon, Plus, LayoutGrid, CheckCircle2, Clock, Activity } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchUserListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('submitted_by', user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setListings(data);
      }
      setLoading(false);
    };

    fetchUserListings();
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-12 h-12 border-4 border-obsidian/10 border-t-champagne rounded-full animate-spin" />
      </div>
    );
  }

  const approvedCount = listings.filter(l => l.status === 'approved').length;
  const pendingCount = listings.filter(l => l.status === 'pending').length;

  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header / Dashboard Overview */}
        <div className="bg-obsidian rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden text-ivory shadow-2xl shadow-obsidian/10">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-champagne/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-ivory/10 pb-8 mb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-ivory/10 border border-ivory/20 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                <UserIcon size={40} className="text-champagne" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Welcome Back</h1>
                <p className="text-ivory/60 font-mono text-sm md:text-base break-all">{user?.email}</p>
              </div>
            </div>
            
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-3 rounded-full border border-ivory/20 text-ivory hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all text-sm font-medium shrink-0"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-ivory/5 border border-ivory/10 rounded-2xl p-6 flex items-center gap-5 hover:bg-ivory/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                <LayoutGrid size={24} />
              </div>
              <div>
                <p className="text-ivory/50 text-sm font-medium mb-1">Total Submissions</p>
                <p className="text-3xl font-black">{listings.length}</p>
              </div>
            </div>
            
            <div className="bg-ivory/5 border border-ivory/10 rounded-2xl p-6 flex items-center gap-5 hover:bg-ivory/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <p className="text-ivory/50 text-sm font-medium mb-1">Approved</p>
                <p className="text-3xl font-black">{approvedCount}</p>
              </div>
            </div>

            <div className="bg-ivory/5 border border-ivory/10 rounded-2xl p-6 flex items-center gap-5 hover:bg-ivory/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400 shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-ivory/50 text-sm font-medium mb-1">Pending Review</p>
                <p className="text-3xl font-black">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-obsidian/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-obsidian/5 flex items-center justify-center text-obsidian">
                <Activity size={24} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-obsidian tracking-tight">Your Projects</h2>
                <p className="text-obsidian/50 text-sm mt-1">Manage and track the status of your submissions</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/submit')}
              className="flex items-center gap-2 px-6 py-3 bg-champagne text-obsidian hover:bg-[#00e65c] rounded-full font-bold text-sm transition-colors shadow-lg shadow-champagne/20 shrink-0"
            >
              <Plus size={18} strokeWidth={2.5} />
              Submit New Project
            </button>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white border border-obsidian/5 rounded-[2.5rem] p-12 md:p-20 text-center shadow-sm flex flex-col items-center justify-center mt-4">
              <div className="w-24 h-24 bg-obsidian/5 rounded-full flex items-center justify-center mb-6 text-obsidian/30">
                <LayoutGrid size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-obsidian mb-4">No projects yet</h3>
              <p className="text-obsidian/60 mb-10 max-w-md mx-auto text-lg">
                You haven't submitted any projects to the directory. Share your work with the Kedah Tech community today.
              </p>
              <button
                onClick={() => navigate('/submit')}
                className="px-8 py-4 bg-obsidian text-ivory rounded-full font-bold hover:bg-obsidian/90 transition-colors shadow-xl shadow-obsidian/10"
              >
                Create your first listing
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {listings.map((listing) => (
                <div key={listing.id} className="flex flex-col h-full group">
                  <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-3 w-3">
                        {listing.status === 'pending' && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${
                          listing.status === 'approved' ? 'bg-emerald-500' :
                          listing.status === 'rejected' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></span>
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest text-obsidian/60">
                        {listing.status}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/edit/${listing.id}`)}
                      className="flex items-center gap-1.5 text-xs font-bold text-obsidian/60 hover:text-obsidian transition-colors bg-obsidian/5 hover:bg-obsidian/10 px-4 py-2 rounded-full"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                  </div>
                  <div className="flex-grow transition-transform duration-300 group-hover:-translate-y-1">
                    <ListingCard listing={listing} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
