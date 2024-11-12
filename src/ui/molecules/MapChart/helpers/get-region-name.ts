export const getRegionName = (postcode: string) => {
  switch (postcode) {
    case 'OX':
      return 'Oxford';

    case 'G':
      return 'Glasgow';

    case 'LS':
      return 'Leeds';

    case 'M':
      return 'Manchester';

    case 'L':
      return 'Liverpool';

    case 'CB':
      return 'Cambridge';

    case 'SO':
      return 'Southampton';
  }
};
