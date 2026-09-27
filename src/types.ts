export interface EventItem {
  id: string;
  title: string;
  titleLine1?: string;
  titleLine2?: string;
  badgeLabel?: string;
  category: 'technical' | 'non-technical';
  shortTagline: string;
  description: string;
  winnerPrize?: string;
  runnerPrize?: string;
  prizeNote?: string;
  rounds: string[];
  rules: string[];
  teamSize: string;
  venue: string;
  time: string;
  prizes: string;
  skills: string[];
  image: string;
  coordinators: {
    name: string;
    phone: string;
  }[];
}

export interface ScheduleItem {
  time: string;
  title: string;
  venue: string;
  type: 'general' | 'technical' | 'non-technical' | 'break';
  description: string;
}

export interface Coordinator {
  role: string;
  name: string;
  designation?: string;
  phone?: string;
  email?: string;
  isStudent?: boolean;
}

export interface RegistrationData {
  fullName: string;
  email: string;
  phone: string;
  collegeName: string;
  department: string;
  year: string;
  selectedEvents: string[];
  teamName?: string;
  teamMembersCount?: number;
}
