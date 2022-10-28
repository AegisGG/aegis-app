export interface TeamData {
  name: string;
  image: string;
  result: string;
}

export interface GameData {
  [key: string]: TeamData;
}

export interface EventsData {
  [key: string]: GameData;
}

export interface DropdownData {
  id: string;
  name: string;
}
