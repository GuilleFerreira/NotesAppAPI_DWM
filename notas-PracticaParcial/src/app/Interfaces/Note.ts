export interface Note {
  id: string;
  title: string;
  cityid: string;
  description: string;
  date: string;
  temperature: string;
  
}

export class EmptyNote implements Note {
  id: string = '';
  title: string = '';
  cityid: string = '';
  description: string = '';
  date: string = '';
  temperature: string = '';

  constructor() {  }
}
