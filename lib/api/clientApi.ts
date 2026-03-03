import api from "./api";
import { Note, NotesResponse, NoteTag } from "@/types/note";
import { User } from "@/types/user";

// ─── Auth types ────────────────────────────────────────────────────────────────

interface AuthCredentials {
  email: string;
  password: string;
}

// ─── Notes ─────────────────────────────────────────────────────────────────────

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag | "";
}

export async function fetchNotes(params: FetchNotesParams = {}): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", { params: { perPage: 12, ...params } });
  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(payload: CreateNotePayload): Promise<Note> {
  const { data } = await api.post<Note>("/notes", payload);
  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}

// ─── Auth ──────────────────────────────────────────────────────────────────────

export async function register(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>("/auth/register", credentials);
  return data;
}

export async function login(credentials: AuthCredentials): Promise<User> {
  const { data } = await api.post<User>("/auth/login", credentials);
  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  const { data } = await api.get<User | null>("/auth/session");
  return data ?? null;
}

// ─── User ──────────────────────────────────────────────────────────────────────

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export interface UpdateMePayload {
  username?: string;
  avatar?: string;
}

export async function updateMe(payload: UpdateMePayload): Promise<User> {
  const { data } = await api.patch<User>("/users/me", payload);
  return data;
}