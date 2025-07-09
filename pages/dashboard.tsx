import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    getUser();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to your Dashboard</h1>
        <p className="mb-6 text-center">Logged in as: <span className="font-mono">{user?.email}</span></p>
        <button
          onClick={handleSignOut}
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
