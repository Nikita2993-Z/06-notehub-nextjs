'use client';

import { useState } from 'react';
import NoteModal from '../components/NoteModal/NoteModal';
import NoteList from '../components/NoteList/NoteList';
import SearchBar from '../components/SearchBar/SearchBar'; // якщо ще не перейменував — зроби
import Pagination from '../components/Pagination/Pagination';
import { useNotes } from '@/hooks/useNotes'; // або імпортуй логіку прямо тут

export default function NotesClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    notes,
    isLoading,
    error,
    page,
    totalPages,
    search,
    handleSearch,
    setPage,
  } = useNotes();

  return (
    <div style={{ padding: '24px' }}>
      <button onClick={() => setIsModalOpen(true)}>Create new note</button>

      <SearchBar value={search} onSearch={handleSearch} />
      {error && <p>Something went wrong.</p>}
      {isLoading && <p>Loading...</p>}
      {notes.length > 0 && (
        <>
          <NoteList notes={notes} />
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      )}

      {isModalOpen && (
        <NoteModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}