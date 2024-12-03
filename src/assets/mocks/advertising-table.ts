type Data = {
  venue: string,
  impressions: number
  changePercent: number
  date: Date
}

export const advertisingOverviewData: Data[] = [
  { venue: 'Venue 1', impressions: 10342, growthPercent: -2.1, date: new Date("2024-01-01") },
  { venue: 'Venue 2', impressions: 8573, growthPercent: 3.4, date: new Date("2024-01-02") },
  { venue: 'Venue 3', impressions: 12045, growthPercent: 1.2, date: new Date("2024-01-03") },
  { venue: 'Venue 4', impressions: 9450, growthPercent: -1.3, date: new Date("2024-01-04") },
  { venue: 'Venue 5', impressions: 11030, growthPercent: 0.8, date: new Date("2024-01-05") },
  { venue: 'Venue 6', impressions: 13402, growthPercent: 5.0, date: new Date("2024-01-06") },
  { venue: 'Venue 7', impressions: 9821, growthPercent: -0.5, date: new Date("2024-01-07") },
  { venue: 'Venue 8', impressions: 14320, growthPercent: 2.7, date: new Date("2024-01-08") },
  { venue: 'Venue 9', impressions: 10230, growthPercent: -3.2, date: new Date("2024-01-09") },
  { venue: 'Venue 10', impressions: 11340, growthPercent: 1.9, date: new Date("2024-01-10") },
  { venue: 'Venue 11', impressions: 9000, growthPercent: -1.1, date: new Date("2024-01-11") },
  { venue: 'Venue 12', impressions: 12450, growthPercent: 2.0, date: new Date("2024-01-12") },
  { venue: 'Venue 13', impressions: 11345, growthPercent: -0.9, date: new Date("2024-01-13") },
  { venue: 'Venue 14', impressions: 12700, growthPercent: 3.6, date: new Date("2024-01-14") },
  { venue: 'Venue 15', impressions: 11123, growthPercent: -1.5, date: new Date("2024-01-15") }
];
