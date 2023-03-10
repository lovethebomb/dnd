import Head from 'next/head'
import Link from 'next/link'

import { supabase } from './../lib/supabaseClient';

import Calendar from '../components/calendar/Calendar';
import { CalendarEvent as CalendarEventType } from '../components/calendar/Calendar';

import { addDays, subDays, parse, areIntervalsOverlapping } from 'date-fns';
import { transformAvailibility } from '../lib/players';


const TheCalendar = ({ playerDates}) => {
  let events: CalendarEventType[] = [
    { date: new Date(2023, 2, 6), dateString: "20230306", name: 'Teaser release', type: "normal" },
  ];
  for (let playerDate of playerDates) {
    console.debug('playerDate', playerDate)
    playerDate.events.forEach(item => {
      events.push({ date: item.date, dateString: item.dateString , name: playerDate.player, type: "player" })
    })
  }

  return <Calendar events={events} />;
}

const CalendarPage = ({ playerDates }) => {
  console.debug('playerDates', playerDates)
  const transformedPlayerDates = playerDates.map(entry => ({ player: entry.player, events: transformAvailibility(entry.availability) }))
  console.debug('transformPlayerDates', transformedPlayerDates)

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

        <TheCalendar playerDates={transformedPlayerDates} />
      </main>
    </div>
  )
}

export default CalendarPage

export async function getServerSideProps({ params }) {
  let { data } = await supabase.from('player_dates').select()

  return {
    props: {
      playerDates: data
    },
  }
}
