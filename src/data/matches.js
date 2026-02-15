// Matchs simulés de la Botola Pro Inwi - Saison 2025/2026
// Journée 18-20

const generateOdds = () => {
  const home = +(1.2 + Math.random() * 3.5).toFixed(2);
  const draw = +(2.5 + Math.random() * 1.5).toFixed(2);
  const away = +(1.5 + Math.random() * 4).toFixed(2);
  return { home, draw, away };
};

export const MATCHDAYS = [
  {
    id: 'j18',
    label: 'Journée 18',
    date: '2026-02-15',
    status: 'live',
    matches: [
      {
        id: 'm1',
        homeTeamId: 1,
        awayTeamId: 2,
        kickoff: '20:00',
        venue: 'Stade Mohammed V, Casablanca',
        status: 'live',
        minute: 67,
        score: { home: 1, away: 1 },
        odds: { home: 2.10, draw: 3.20, away: 3.50 },
        liveOdds: { home: 2.40, draw: 2.80, away: 3.10 },
      },
      {
        id: 'm2',
        homeTeamId: 3,
        awayTeamId: 4,
        kickoff: '17:00',
        venue: 'Stade Prince Moulay Abdellah, Rabat',
        status: 'finished',
        score: { home: 2, away: 0 },
        odds: { home: 1.85, draw: 3.40, away: 4.20 },
      },
      {
        id: 'm3',
        homeTeamId: 5,
        awayTeamId: 6,
        kickoff: '20:00',
        venue: 'Stade Municipal, Berkane',
        status: 'live',
        minute: 54,
        score: { home: 0, away: 0 },
        odds: { home: 1.95, draw: 3.10, away: 4.00 },
        liveOdds: { home: 2.20, draw: 2.60, away: 4.50 },
      },
      {
        id: 'm4',
        homeTeamId: 7,
        awayTeamId: 8,
        kickoff: '15:00',
        venue: 'Stade Saniat Rmel, Tétouan',
        status: 'finished',
        score: { home: 1, away: 2 },
        odds: { home: 2.50, draw: 3.10, away: 2.90 },
      },
    ],
  },
  {
    id: 'j19',
    label: 'Journée 19',
    date: '2026-02-22',
    status: 'upcoming',
    matches: [
      {
        id: 'm5',
        homeTeamId: 2,
        awayTeamId: 3,
        kickoff: '20:00',
        venue: 'Stade Mohammed V, Casablanca',
        status: 'upcoming',
        odds: { home: 2.30, draw: 3.10, away: 3.00 },
      },
      {
        id: 'm6',
        homeTeamId: 4,
        awayTeamId: 1,
        kickoff: '17:00',
        venue: 'Stade du FUS, Rabat',
        status: 'upcoming',
        odds: { home: 3.80, draw: 3.30, away: 1.95 },
      },
      {
        id: 'm7',
        homeTeamId: 6,
        awayTeamId: 7,
        kickoff: '20:00',
        venue: 'Stade Adrar, Agadir',
        status: 'upcoming',
        odds: { home: 1.70, draw: 3.50, away: 5.00 },
      },
      {
        id: 'm8',
        homeTeamId: 8,
        awayTeamId: 5,
        kickoff: '15:00',
        venue: 'Stade Ibn Batouta, Tanger',
        status: 'upcoming',
        odds: { home: 2.60, draw: 3.10, away: 2.70 },
      },
      {
        id: 'm9',
        homeTeamId: 9,
        awayTeamId: 10,
        kickoff: '17:00',
        venue: 'Stade El Massira, Safi',
        status: 'upcoming',
        odds: { home: 2.20, draw: 3.00, away: 3.30 },
      },
      {
        id: 'm10',
        homeTeamId: 11,
        awayTeamId: 12,
        kickoff: '20:00',
        venue: 'Stade de Fès',
        status: 'upcoming',
        odds: { home: 1.90, draw: 3.20, away: 4.10 },
      },
      {
        id: 'm11',
        homeTeamId: 13,
        awayTeamId: 14,
        kickoff: '15:00',
        venue: 'Stade El Bachir, Mohammedia',
        status: 'upcoming',
        odds: { home: 2.40, draw: 3.10, away: 3.00 },
      },
      {
        id: 'm12',
        homeTeamId: 15,
        awayTeamId: 16,
        kickoff: '17:00',
        venue: 'Stade Bachir, Rabat',
        status: 'upcoming',
        odds: { home: 2.10, draw: 3.30, away: 3.50 },
      },
    ],
  },
  {
    id: 'j20',
    label: 'Journée 20',
    date: '2026-03-01',
    status: 'upcoming',
    matches: [
      {
        id: 'm13',
        homeTeamId: 1,
        awayTeamId: 5,
        kickoff: '20:00',
        venue: 'Stade Mohammed V, Casablanca',
        status: 'upcoming',
        odds: { home: 1.65, draw: 3.60, away: 5.20 },
      },
      {
        id: 'm14',
        homeTeamId: 3,
        awayTeamId: 2,
        kickoff: '17:00',
        venue: 'Stade Prince Moulay Abdellah, Rabat',
        status: 'upcoming',
        odds: { home: 2.10, draw: 3.20, away: 3.40 },
      },
      {
        id: 'm15',
        homeTeamId: 10,
        awayTeamId: 11,
        kickoff: '15:00',
        venue: 'Stade El Abdi, El Jadida',
        status: 'upcoming',
        odds: { home: 2.50, draw: 3.00, away: 2.90 },
      },
      {
        id: 'm16',
        homeTeamId: 14,
        awayTeamId: 9,
        kickoff: '17:00',
        venue: 'Stade Municipal, Oued Zem',
        status: 'upcoming',
        odds: { home: 2.80, draw: 3.10, away: 2.50 },
      },
      {
        id: 'm17',
        homeTeamId: 16,
        awayTeamId: 13,
        kickoff: '20:00',
        venue: 'Stade Municipal, Soualem',
        status: 'upcoming',
        odds: { home: 2.70, draw: 3.00, away: 2.60 },
      },
      {
        id: 'm18',
        homeTeamId: 12,
        awayTeamId: 15,
        kickoff: '15:00',
        venue: 'Stade Municipal, Berrechid',
        status: 'upcoming',
        odds: { home: 2.30, draw: 3.20, away: 3.10 },
      },
    ],
  },
];

export const getAllMatches = () =>
  MATCHDAYS.flatMap((day) =>
    day.matches.map((m) => ({ ...m, matchday: day.label, matchdayDate: day.date }))
  );

export const getUpcomingMatches = () =>
  getAllMatches().filter((m) => m.status === 'upcoming');

export const getLiveMatches = () =>
  getAllMatches().filter((m) => m.status === 'live');

export const getFinishedMatches = () =>
  getAllMatches().filter((m) => m.status === 'finished');
