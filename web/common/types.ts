export type UserData = {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type UserAndFriendsData = UserData & {
  followers: UserData[];
  followees: UserData[];
};

export type FollowData = {
  following: boolean;
  followed: boolean;
};

export type ThreadData = {
  id: number;
  title: string;
  responses: ResponseData[];
  createdAt: string;
  updatedAt: string;
};

export type ResponseData = {
  id: number;
  receiveThreadId: number;
  sender: UserData;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type ResponseAndThreadData = {
  id: number;
  receiveThreadId: number;
  sender: UserData;
  content: string;
  createdAt: string;
  updatedAt: string;
  thread: ThreadData;
};
