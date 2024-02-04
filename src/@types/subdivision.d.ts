interface Subdivision {
  name: string;
  subdivision_id: number;
  owner: number;
  isinvited: boolean;
}
interface ErrorServerResponse {
  data: string;
  status: number;
  statusText: string;
}
interface ServerError extends Error {
  response: ErrorServerResponse;
}
interface Invite {
  user: {
    user_id: number;
    username: string;
  };
  subdivision: {
    subdivision_id: number;
    subdivision_name: string;
  };
}
