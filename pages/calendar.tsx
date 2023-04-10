import Head from 'next/head'
import Link from 'next/link'

import { supabase } from './../lib/supabaseClient';

import Calendar from '../components/calendar/Calendar';
import { CalendarEvent as CalendarEventType } from '../components/calendar/Calendar';

import { transformAvailibility } from '../lib/players';
import dynamic from 'next/dynamic'
const DynamicCalendar = dynamic(() => import('../components/calendar/Calendar'), {
  loading: () => <p>Loading...</p>,
})


const TheCalendar = () => {
  let localEvents: CalendarEventType[] = [
    { date: new Date(2023, 2, 6), dateString: "20230306", name: 'Teaser release', type: "normal" },
    { date: new Date(2023, 3, 20), dateString: "20230420", name: 'Nesji in 🇯🇵', type: "normal" },
    { date: new Date(2023, 3, 29), dateString: "20230429", name: 'Zerakos 🥳', type: "normal" },
    { date: new Date(2023, 4, 14), dateString: "20230514", name: 'Nesji back 🇯🇵', type: "normal" },
    { date: new Date(2023, 6, 6), dateString: "20230706", name: 'Droop 🥳', type: "normal" },
    { date: new Date(2023, 3, 4), dateString: "20230706", name: 'Game night 🐲', type: "normal" },
    { date: new Date(2023, 3, 11), dateString: "20230706", name: 'Game night 🐲', type: "normal" },
    { date: new Date(2023, 3, 17), dateString: "20230706", name: 'Game night 🐲', type: "normal" },
  ];

  return <DynamicCalendar localEvents={localEvents} />;
}

const CalendarPage = () => {
  console.debug('calendar page render')
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
