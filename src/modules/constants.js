import tribalNationsData from '#data/tribalNations.csv';
import { groups } from '#modules/data';

export const externalUrls = {
  catalog: 'https://catalog.archives.gov',
  catalogRecordDetail: 'https://catalog.archives.gov/id',
};

// get list of authority record names included in the dataset
const permittedTribalNationNames = groups.tribes.map(t => t.key);

// filter out Tribal Nations that arent represented by an authority record
// in the dataset
export const tribalNations = tribalNationsData
  .filter(row => permittedTribalNationNames.includes(row.name))
  .sort((a, b) => (a.name > b.name ? 1 : -1));

export const tribalNationThumbnails = {
  a: [298622, 170100671, 170100673, 298621, 170102771],
  b: [158884344, 298571, 298652, 298657, 519192],
  c: [519106, 1772523, 118973249, 148728444, 519168],
  d: [298646, 298645, 158884338, 158884434, 158884378],
  e: [285280, 285396, 251744, 285401],
  f: [519146, 158884418, 158884308, 158884304, 298638],
  g: [285280, 285396, 251744, 285401],
  h: [298635, 593679, 292867, 298639, 158884420],
  i: [170101129, 170101127, 170103067, 170103185, 170103183],
  j: [158884392, 158884388, 158884336, 158884346, 519298],
  k: [519144, 519058, 2745692, 2745662, 518900],
  l: [40571656, 40571650, 518973, 170101169, 170101161],
  m: [118973757, 285304, 40571674, 170102465, 170101465],
  n: [298580, 298594, 518913, 519314, 519140],
  o: [519136, 519163, 12468829, 12463220, 12463037],
  p: [518959, 519164, 593723, 519157, 170102825],
  q: [298663, 298664, 298716, 298717, 519172],
  r: [12577839, 519142, 76047207, 76046597, 12577721],
  s: [519348, 170102905, 170103063, 519169, 519207],
  t: [118972375, 118972495, 118973007, 118973051, 118973299],
  u: [519133, 106756300, 593683, 519128, 106756238],
  v: [170100677, 170100699, 170100705, 170100709, 170102295],
  w: [518953, 519112, 519120, 519126, 593695],
  x: [285280, 285396, 251744, 285401],
  y: [519036, 519038, 519040, 519041, 519037],
  z: [285280, 285396, 251744, 285401],
};

export const states = [
  { name: 'Alabama', slug: 'alabama', region: 'eastern', id: 'AL', val: '01', thumbnailNaId: 285280 },
  { name: 'Alaska', slug: 'alaska', region: 'pacific-alaska', id: 'AK', val: '02', thumbnailNaId: 285280 },
  { name: 'Arizona', slug: 'arizona', region: 'southwest', id: 'AZ', val: '04', thumbnailNaId: 593679 },
  { name: 'Arkansas', slug: 'arkansas', region: 'eastern', id: 'AR', val: '05', thumbnailNaId: 285280 },
  { name: 'California', slug: 'california', region: 'california', id: 'CA', val: '06', thumbnailNaId: 170102701 },
  { name: 'Colorado', slug: 'colorado', region: 'western', id: 'CO', val: '08', thumbnailNaId: 298658 },
  { name: 'Connecticut', slug: 'connecticut', region: 'eastern', id: 'CT', val: '09', thumbnailNaId: 285280 },
  { name: 'Delaware', slug: 'delaware', region: 'eastern', id: 'DE', val: '10', thumbnailNaId: 285280 },
  { name: 'Florida', slug: 'florida', region: 'eastern', id: 'FL', val: '12', thumbnailNaId: 519171 },
  { name: 'Georgia', slug: 'georgia', region: 'eastern', id: 'GA', val: '13', thumbnailNaId: 285280 },
  { name: 'Idaho', slug: 'idaho', region: 'northwest', id: 'ID', val: '16', thumbnailNaId: 519206 },
  { name: 'Illinois', slug: 'illinois', region: 'eastern', id: 'IL', val: '17', thumbnailNaId: 285280 },
  { name: 'Indiana', slug: 'indiana', region: 'eastern', id: 'IN', val: '18', thumbnailNaId: 285280 },
  { name: 'Iowa', slug: 'iowa', region: 'midwest', id: 'IA', val: '19', thumbnailNaId: 5585772 },
  {
    name: 'Kansas',
    slug: 'kansas',
    region: 'southern-plains-eastern-oklahoma',
    id: 'KS',
    val: '20',
    thumbnailNaId: 519149,
  },
  { name: 'Kentucky', slug: 'kentucky', region: 'eastern', id: 'KY', val: '21', thumbnailNaId: 285280 },
  { name: 'Louisiana', slug: 'louisiana', region: 'eastern', id: 'LA', val: '22', thumbnailNaId: 285280 },
  { name: 'Maine', slug: 'maine', region: 'eastern', id: 'ME', val: '23', thumbnailNaId: 285280 },
  { name: 'Maryland', slug: 'maryland', region: 'eastern', id: 'MD', val: '24', thumbnailNaId: 285280 },
  { name: 'Massachusetts', slug: 'massachusetts', region: 'eastern', id: 'MA', val: '25', thumbnailNaId: 285280 },
  { name: 'Michigan', slug: 'michigan', region: 'eastern', id: 'MI', val: '26', thumbnailNaId: 285280 },
  { name: 'Minnesota', slug: 'minnesota', region: 'midwest', id: 'MN', val: '27', thumbnailNaId: 285179 },
  { name: 'Mississippi', slug: 'mississippi', region: 'eastern', id: 'MS', val: '28', thumbnailNaId: 285280 },
  { name: 'Missouri', slug: 'missouri', region: 'eastern', id: 'MO', val: '29', thumbnailNaId: 285280 },
  { name: 'Montana', slug: 'montana', region: 'rocky-mountain', id: 'MT', val: '30', thumbnailNaId: 285280 },
  { name: 'Nebraska', slug: 'nebraska', region: 'great-plains', id: 'NE', val: '31', thumbnailNaId: 285280 },
  { name: 'Nevada', slug: 'nevada', region: 'southwest', id: 'NV', val: '32', thumbnailNaId: 519146 },
  { name: 'New Hampshire', slug: 'new-hampshire', region: 'eastern', id: 'NH', val: '33', thumbnailNaId: 285280 },
  { name: 'New Jersey', slug: 'new-jersey', region: 'eastern', id: 'NJ', val: '34', thumbnailNaId: 285280 },
  { name: 'New Mexico', slug: 'new-mexico', region: 'western', id: 'NM', val: '35', thumbnailNaId: 519153 },
  { name: 'New York', slug: 'new-york', region: 'eastern', id: 'NY', val: '36', thumbnailNaId: 519162 },
  { name: 'North Carolina', slug: 'north-carolina', region: 'eastern', id: 'NC', val: '37', thumbnailNaId: 285280 },
  { name: 'North Dakota', slug: 'north-dakota', region: 'great-plains', id: 'ND', val: '38', thumbnailNaId: 285312 },
  { name: 'Ohio', slug: 'ohio', region: 'eastern', id: 'OH', val: '39', thumbnailNaId: 285280 },
  {
    name: 'Oklahoma',
    slug: 'oklahoma',
    region: 'southern-plains-eastern-oklahoma',
    id: 'OK',
    val: '40',
    thumbnailNaId: 519141,
  },
  { name: 'Oregon', slug: 'oregon', region: 'northwest', id: 'OR', val: '41', thumbnailNaId: 5585778 },
  { name: 'Pennsylvania', slug: 'pennsylvania', region: 'eastern', id: 'PA', val: '42', thumbnailNaId: 518926 },
  { name: 'Rhode Island', slug: 'rhode-island', region: 'eastern', id: 'RI', val: '44', thumbnailNaId: 285280 },
  { name: 'South Carolina', slug: 'south-carolina', region: 'eastern', id: 'SC', val: '45', thumbnailNaId: 285280 },
  { name: 'South Dakota', slug: 'south-dakota', region: 'great-plains', id: 'SD', val: '46', thumbnailNaId: 285411 },
  { name: 'Tennessee', slug: 'tennessee', region: 'eastern', id: 'TN', val: '47', thumbnailNaId: 285280 },
  {
    name: 'Texas',
    slug: 'texas',
    region: 'southern-plains-eastern-oklahoma',
    id: 'TX',
    val: '48',
    thumbnailNaId: 285280,
  },
  { name: 'Utah', slug: 'utah', region: 'southwest', id: 'UT', val: '49', thumbnailNaId: 519240 },
  { name: 'Vermont', slug: 'vermont', region: 'eastern', id: 'VT', val: '50', thumbnailNaId: 285280 },
  { name: 'Virginia', slug: 'virginia', region: 'eastern', id: 'VA', val: '51', thumbnailNaId: 285280 },
  { name: 'Washington (State)', slug: 'washington', region: 'northwest', id: 'WA', val: '53', thumbnailNaId: 5585728 },
  { name: 'West Virginia', slug: 'west-virginia', region: 'eastern', id: 'WV', val: '54', thumbnailNaId: 285280 },
  { name: 'Wisconsin', slug: 'wisconsin', region: 'midwest', id: 'WI', val: '55', thumbnailNaId: 41089924 },
  { name: 'Wyoming', slug: 'wyoming', region: 'rocky-mountain', id: 'WY', val: '56', thumbnailNaId: 298653 },
];

export const topics = [
  { name: 'Agriculture', slug: 'agriculture', thumbnailNaId: 170102075 },
  { name: 'Animals', slug: 'animals', thumbnailNaId: 12079826 },
  { name: 'Art and Artifacts', slug: 'art-artifacts', thumbnailNaId: 519161 },
  { name: 'Buildings', slug: 'buildings', thumbnailNaId: 12084828 },
  { name: 'Bureau of Indian Affairs Personnel', slug: 'bia-personnel', thumbnailNaId: 292868 },
  { name: 'Camps', slug: 'camps', thumbnailNaId: 285803 },
  { name: 'Children', slug: 'children', thumbnailNaId: 12460729 },
  { name: 'Clothing', slug: 'clothing', thumbnailNaId: 298648 },
  { name: 'Communities', slug: 'communities', thumbnailNaId: 519145 },
  { name: 'Construction', slug: 'construction', thumbnailNaId: 118969535 },
  { name: 'Councils', slug: 'councils', thumbnailNaId: 298702 },
  { name: 'Dances', slug: 'dances', thumbnailNaId: 12466498 },
  { name: 'Events', slug: 'events', thumbnailNaId: 285197 },
  { name: 'Fishing', slug: 'fishing', thumbnailNaId: 285703 },
  { name: 'Food Preparation', slug: 'food-preparation', thumbnailNaId: 519166 },
  { name: 'Groups', slug: 'groups', thumbnailNaId: 595392 },
  { name: 'Dwellings', slug: 'dwellings', thumbnailNaId: 7867735 },
  { name: 'Hunting', slug: 'hunting', thumbnailNaId: 285719 },
  { name: 'Portraits', slug: 'portraits', thumbnailNaId: 285690 },
  { name: 'Recreation', slug: 'recreation', thumbnailNaId: 158884346 },
  { name: 'Reservations', slug: 'reservations', thumbnailNaId: 292867 },
  { name: 'Manufacturing', slug: 'manufacturing', thumbnailNaId: 523806 },
  { name: 'Landscapes', slug: 'landscapes', thumbnailNaId: 170102383 },
  { name: 'Leaders', slug: 'leaders', thumbnailNaId: 32202303 },
  { name: 'Military Service', slug: 'military-service', thumbnailNaId: 285695 },
  { name: 'Music', slug: 'music', thumbnailNaId: 5585778 },
  { name: 'Schools', slug: 'schools', thumbnailNaId: 295152 },
  { name: 'Transportation', slug: 'transportation', thumbnailNaId: 118972577 },
];

export const regions = [
  {
    name: 'Northwest Region',
    slug: 'northwest',
    mapColors: {
      region: '#F8BFBA',
      listing: '#203B60',
    },
    mapLabelCooridnates: [-120.56200520337062, 45.93465032631577],
  },
  {
    name: 'Pacific Region & Alaska Region',
    slug: 'pacific-alaska',
    mapColors: {
      region: '#F0C0D2',
      listing: '#325990',
    },
    mapLabelCooridnates: [-157.1794192251042, 66.42441825088091],
  },
  {
    name: 'Western Region',
    slug: 'western',
    mapColors: {
      region: '#9FD7C0',
      listing: '#244168',
    },
    mapLabelCooridnates: [-107.54795634775779, 37.597256788375054],
  },
  {
    name: 'Rocky Mountain Region',
    slug: 'rocky-mountain',
    mapColors: {
      region: '#C3D4AB',
      listing: '#2E5387',
    },
    mapLabelCooridnates: [-109.63302925840122, 45.6524662795163],
  },
  {
    name: 'Southwest Region',
    slug: 'southwest',
    mapColors: {
      region: '#DECE91',
      listing: '#294A79',
    },
    mapLabelCooridnates: [-115.27014978137767, 38.40563386025311],
  },
  {
    name: 'Great Plains Region',
    slug: 'great-plains',
    mapColors: {
      region: '#9EDAE3',
      listing: '#1F385B',
    },
    mapLabelCooridnates: [-101.22752309700857, 45.3445012204703],
  },
  {
    name: 'Southern Plains Region & Eastern Oklahoma Region',
    slug: 'southern-plains-eastern-oklahoma',
    mapColors: {
      region: '#ABD2F2',
      listing: '#284876',
    },
    mapLabelCooridnates: [-100.79322972354891, 35.58832303946829],
  },
  {
    name: 'Midwest Region',
    slug: 'midwest',
    mapColors: {
      region: '#C9CBF4',
      listing: '#2B4E7F',
    },
    mapLabelCooridnates: [-93.2931633606855, 44.02584839989349],
  },
  {
    name: 'Eastern Region',
    slug: 'eastern',
    mapColors: {
      region: '#D6C7EF',
      listing: '#2E5386',
    },
    mapLabelCooridnates: [-85.30200559812172, 37.53502330485163],
  },
  {
    name: 'California Region',
    slug: 'california',
    mapColors: {
      region: '#F7C2A0',
      listing: '#25436C',
    },
    mapLabelCooridnates: [-121.57292512079247, 37.18397337102898],
  },
];

export const homepageGridThumbnailNaids = [
  40571885,
  595347,
  296123,
  12462518,
  5585778,
  5585777,
  5585775,
  118972585,
  285699,
  12578852,
  32203579,
  519146,
  158884302,
  158884312,
  158884328,
  158884338,
  158884356,
  34335002,
  34335584,
  170100675,
  34335598,
  34334912,
  519266,
  118968071,
  34334736,
  7868008,
  285701,
  298718,
  519277,
  170101991,
  158884300,
  519274,
  170101343,
  170101269,
  12462751,
  40571660,
  285334,
  593723,
  523806,
  12469096,
  32204603,
  32204319,
  170102017,
  292882,
  32207735,
  32203597,
  32203377,
  32203375,
  32203593,
  32204395,
  32207781,
  32204827,
  32207337,
  519210,
  285344,
  285312,
  40571831,
  40571835,
  298642,
  12079880,
  41089640,
  285201,
  285244,
  285426,
  285703,
  285755,
  298564,
  518956,
  285216,
  285229,
  285248,
  32204321,
  32204463,
  118968155,
  170101253,
  170102137,
  170101369,
  285890,
  298599,
  519197,
  40571650,
  76048007,
  12577515,
  12465708,
  170103369,
  37489793,
  34334520,
  37489813,
  45641143,
  45640596,
  12466512,
  32204459,
  32208017,
  57275374,
  57275560,
  57275638,
  519160,
  593695,
  519307,
  118970025,
];

export const notableNativeAmericansNaids = [519348, 12460661, 519161, 518914, 519158, 519164, 285689, 37489866];

// export const stateThumbnailNaids = [
//   595347,
//   519156,
//   285811,
//   519170,
//   519142,
//   519162,
//   519157,
//   519144,
//   518902,
//   519160,
//   519172,
//   519168,
//   176251220,
//   5585778,
//   518892,
//   519171,
//   518929,
//   518903,
//   519165,
//   519169,
//   519153,
//   519136,
//   519145,
//   518926,
//   170102055,
//   519138,
//   519173,
//   170102905,
//   76018299,
//   518923,
// ];
