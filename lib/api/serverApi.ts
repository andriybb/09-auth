import { cookies } from "next/headers";
import axios from "axios";
import { Note, NotesResponse, NoteTag } from "@/types/note";
import { User } from "@/types/user";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

async function getHeaders() {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
}

// ─── Notes ─────────────────────────────────────────────────────────────────────

export interface ServerFetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | "";
}

export async function fetchNotes(params: ServerFetchNotesParams = {}): Promise<NotesResponse> {
  const headers = await getHeaders();
  const { data } = await axios.get<NotesResponse>(`${baseURL}/notes`, {
    params: { perPage: 12, ...params },
    headers,
    withCredentials: true,
  });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const headers = await getHeaders();
  const { data } = await axios.get<Note>(`${baseURL}/notes/${id}`, {
    headers,
    withCredentials: true,
  });
  return data;
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

export async function checkSession(): Promise<User | null> {
  const headers = await getHeaders();
  const { data } = await axios.get<User | null>(`${baseURL}/auth/session`, {
    headers,
    withCredentials: true,
  });
  return data ?? null;
}

// ─── User ──────────────────────────────────────────────────────────────────────

export async function getMe(): Promise<User> {
  const headers = await getHeaders();
  const { data } = await axios.get<User>(`${baseURL}/users/me`, {
    headers,
    withCredentials: true,
  });
  return data;
}