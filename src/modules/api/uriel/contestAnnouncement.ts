import { get } from '../http';
import { APP_CONFIG } from '../../../conf';
import { UsersMap } from '../jophiel/user';

export interface ContestAnnouncement {
  id: number;
  jid: string;
  userJid: string;
  title: string;
  content: string;
  updatedTime: number;
}

export interface ContestAnnouncementsResponse {
  data: ContestAnnouncement[];
  usersMap: UsersMap;
}

export function createContestAnnouncementAPI() {
  const baseURL = `${APP_CONFIG.apiUrls.uriel}/contests`;

  return {
    getPublishedAnnouncements: (token: string, contestJid: string): Promise<ContestAnnouncement[]> => {
      return get(`${baseURL}/${contestJid}/announcements/published`, token);
    },
  };
}
