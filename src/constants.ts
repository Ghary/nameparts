export const SALUTATIONS = new Set<string>([
  'MR', 'MS', 'MRS', 'DR', 'MISS', 'DOCTOR', 'CORP', 'SGT', 'PVT', 'JUDGE',
  'CAPT', 'COL', 'MAJ', 'LT', 'LIEUTENANT', 'PRM', 'PATROLMAN', 'HON',
  'OFFICER', 'REV', 'PRES', 'PRESIDENT',
  'GOV', 'GOVERNOR', 'VICE PRESIDENT', 'VP', 'MAYOR', 'SIR', 'MADAM', 'HONERABLE'
]);
    
export const GENERATIONS = new Set<string>([
  'JR', 'SR', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  '1ST', '2ND', '3RD', '4TH', '5TH', '6TH', '7TH', '8TH', '9TH', '10TH',
  'FIRST', 'SECOND', 'THIRD', 'FOURTH', 'FIFTH', 'SIXTH', 'SEVENTH',
  'EIGHTH', 'NINTH', 'TENTH'
]);

export const SUFFIXES = new Set<string>(['ESQ', 'PHD', 'MD']);

export const LNPREFIXES = new Set<string>([
  'DE', 'DA', 'DI', 'LA', 'DU', 'DEL', 'DEI', 'VDA', 'DELLO', 'DELLA',
  'DEGLI', 'DELLE', 'VAN', 'VON', 'DER', 'DEN', 'HEER', 'TEN', 'TER',
  'VANDE', 'VANDEN', 'VANDER', 'VOOR', 'VER', 'AAN', 'MC', 'BEN', 'SAN',
  'SAINZ', 'BIN', 'LI', 'LE', 'DES', 'AM', 'AUS\'M', 'VOM', 'ZUM', 'ZUR', 'TEN', 'IBN',
  'ST', 'SAINT', '\'O', 'O\''
]);

export const NON_NAME = new Set<string>(['AKA', 'FKA', 'NKA', 'FICTITIOUS']);

export const CORP_ENTITY = new Set<string>([
  'NA', 'CORP', 'CO', 'INC', 'ASSOCIATES', 'SERVICE', 'LLC', 'LLP', 'PARTNERS',
  'RA', 'CO', 'COUNTY', 'STATE',
  'BANK', 'GROUP', 'MUTUAL', 'FARGO'
]);

export const SUPPLEMENTAL_INFO = new Set<string>(['WIFE OF', 'HUSBAND OF', 'SON OF', 'DAUGHTER OF', 'DECEASED']);
