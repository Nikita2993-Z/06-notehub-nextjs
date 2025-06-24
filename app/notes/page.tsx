import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '../lib/getQueryClient';
import { fetchNotes } from '../lib/api/index';
import Notes from '../notes/Notes.client';

export default async function NotesPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['notes', '', 1], () => fetchNotes('', 1));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes />
    </HydrationBoundary>
  );
}