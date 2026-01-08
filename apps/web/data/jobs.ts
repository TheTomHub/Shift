export const jobs = [
  {
    id: 'JOB-1024',
    name: 'Maple Ridge Retail Buildout',
    address: '1180 Maple Ave, Sacramento, CA',
    status: 'In Progress',
    progress: '72%',
    crew: 'North Bay Concrete',
    dueDate: 'Oct 18, 2024',
    budgetUsed: '$182k of $250k',
  },
  {
    id: 'JOB-1025',
    name: 'Redwood Office Retrofit',
    address: '44 Market St, Oakland, CA',
    status: 'Pending Start',
    progress: '0%',
    crew: 'Skyline Electric',
    dueDate: 'Nov 2, 2024',
    budgetUsed: '$0 of $98k',
  },
  {
    id: 'JOB-1026',
    name: 'Harborview Condos Phase 2',
    address: '220 Harborview Dr, Richmond, CA',
    status: 'Delayed',
    progress: '48%',
    crew: 'Delta Framing Co.',
    dueDate: 'Oct 30, 2024',
    budgetUsed: '$311k of $420k',
  },
];

export const jobOverview = {
  id: 'JOB-1024',
  name: 'Maple Ridge Retail Buildout',
  address: '1180 Maple Ave, Sacramento, CA',
  status: 'In Progress',
  progress: '72% scope complete',
  timeline: 'Oct 4 – Nov 12, 2024',
  pm: 'Lena Park',
  superintendent: 'Marco Diaz',
  currentPhase: 'Interior framing + MEP rough-in',
  risks: 'Back-ordered glass storefront, 10-day lead',
};

export const jobActivity = [
  {
    title: 'Crew check-in received',
    detail: 'North Bay Concrete marked today’s pour as complete.',
    time: 'Today · 7:40 AM',
  },
  {
    title: 'RFI #14 answered',
    detail: 'Architect approved revised ceiling height detail.',
    time: 'Yesterday · 4:15 PM',
  },
  {
    title: 'Material delivery scheduled',
    detail: 'Steel storefront ETA Oct 12 with Bay Supply Co.',
    time: 'Oct 1 · 9:30 AM',
  },
];
