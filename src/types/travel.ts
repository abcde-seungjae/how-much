import { Timestamp } from "firebase/firestore";

export interface TravelType {
  id: string;
  country: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  member: number;
}

export interface Country {
  country_eng_nm: string;
  country_iso_alp2: string;
  country_nm: string;
  iso_alp3: string;
  country_img_url: string;
}
