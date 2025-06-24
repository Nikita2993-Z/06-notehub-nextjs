'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api/index';
import type { createNoteValues } from '../../lib/api/index';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
    onError: (error) => {
      alert('Failed to create note: ' + (error as Error).message);
    },
  });

  const formik = useFormik<createNoteValues>({
    initialValues: {
      title: '',
      content: '',
      tag: 'Personal',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
    }),
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <label className={css.label}>
        Title
        <input
          className={css.input}
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
        />
        {formik.errors.title && formik.touched.title && (
          <div className={css.error}>{formik.errors.title}</div>
        )}
      </label>

      <label className={css.label}>
        Content
        <textarea
          className={css.textarea}
          name="content"
          value={formik.values.content}
          onChange={formik.handleChange}
        />
      </label>

      <label className={css.label}>
        Tag
        <select
          className={css.select}
          name="tag"
          value={formik.values.tag}
          onChange={formik.handleChange}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
          <option value="Todo">Todo</option>
        </select>
      </label>

      <button className={css.submitBtn} type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create note'}
      </button>
    </form>
  );
}