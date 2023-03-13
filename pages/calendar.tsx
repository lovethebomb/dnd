import Head from 'next/head'
import Link from 'next/link'

import { supabase } from './../lib/supabaseClient';

import Calendar from '../components/calendar/Calendar';
import { CalendarEvent as CalendarEventType } from '../components/calendar/Calendar';

import { transformAvailibility } from '../lib/players';


const TheCalendar = () => {
  let localEvents: CalendarEventType[] = [
    { date: new Date(2023, 2, 6), dateString: "20230306", name: 'Teaser release', type: "normal" },
  ];

  return <Calendar localEvents={localEvents} />;
}

const CalendarPage = () => {
  return (
    <div className="container">
      <Head>
        <title>Calendar - D&D Tools & Stuff - dnd.lucas.computer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="page-calendar">
        <Link href="/" className="link">
          ← Back to D&D Tools
        </Link>

        <TheCalendar />
      </main>
    </div>
  )
}

export default CalendarPage
