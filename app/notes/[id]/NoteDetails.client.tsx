'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../lib/api/index';
import type { Note } from '../../types/note';


interface Props {
  id: number;
}

export default function NoteDetailsClient({ id }: Props) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div style={{ padding: '24px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>{note.title}</h2>
          <button>Edit note</button>
        </div>
        <p>{note.content}</p>
        <p>{new Date(note.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}