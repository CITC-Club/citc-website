export interface Socials {
  github?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export interface Team {
  id: string;
  name: string;
  year: number;
}

export interface Member {
  id: number;
  name: string;
  type: string;
  title?: string | null;
  department?: string | null;
  email: string;
  photo?: string | null;
  year?: number | null;
  memberYear: number;
  teamId: string;
  socials?: Socials | null;
  collegeYear?: number | null;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  status: "upcoming" | "past" | "running";
  registrationLink?: string | null;
  tags?: string[] | null;
  gallery?: string[] | null;
}

export interface TeamData {
  teams: Team[];
  members: Member[];
}

export interface EventData {
  events: Event[];
}
