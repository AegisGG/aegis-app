import { EventsData } from 'types';
import { useState } from 'react';
import { dbRef } from '@helpers/firebaseConfig';
import { useDatabaseValue } from '@react-query-firebase/database';
import games from '@data/games';
import AdminDashboardListBox from './AdminDashboardListBox';
import AdminDashboardForm from './AdminDashboardForm';

export default function AdminDashboard() {
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const events = useDatabaseValue<EventsData>(['products'], dbRef);

  return (
    <div className="grid place-items-center p-5 md:p-10">
      <div className="w-full">
        <div className="mb-6">
          <p>Select Game:</p>
          <AdminDashboardListBox selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
        </div>

        <div>
          <AdminDashboardForm data={events?.data?.[`${selectedGame.id}`]} selectedGame={selectedGame.id} />
        </div>
      </div>
    </div>
  );
}
