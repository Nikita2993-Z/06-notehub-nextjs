import css from './NoteModal.module.css';
import NoteForm from '../NoteForm/NoteForm';

interface NoteModalProps {
  onClose: () => void;
}

export default function NoteModal({ onClose }: NoteModalProps) {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeBtn}>×</button>
        <NoteForm onClose={onClose} />
      </div>
    </div>
  );
}