import { useState } from 'react';
import { StickyNote, Plus, Trash2, Save, Clock } from 'lucide-react';

export default function CustomerNotes({ customer }) {
  const [notes, setNotes] = useState(
    customer?.notes || [
      {
        id: 1,
        text: 'Customer prefers WhatsApp communication.',
        createdAt: '24 Jul 2026 • 09:30 AM',
      },
      {
        id: 2,
        text: 'Eligible for VIP discount after next purchase.',
        createdAt: '26 Jul 2026 • 04:15 PM',
      },
    ],
  );

  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!newNote.trim()) return;

    const note = {
      id: Date.now(),
      text: newNote,
      createdAt: new Date().toLocaleString('en-NG', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    setNotes([note, ...notes]);
    setNewNote('');
  };

  const deleteNote = (id) => {
    if (!window.confirm('Delete this note?')) return;

    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className='bg-white rounded-3xl shadow border'>
      {/* Header */}

      <div className='flex items-center justify-between border-b px-6 py-5'>
        <div className='flex items-center gap-3'>
          <StickyNote className='text-[#2F4832]' size={24} />

          <div>
            <h2 className='text-xl font-bold'>Customer Notes</h2>

            <p className='text-sm text-gray-500'>
              Internal notes visible only to administrators.
            </p>
          </div>
        </div>

        <span className='text-sm font-semibold text-[#2F4832]'>
          {notes.length} Notes
        </span>
      </div>

      {/* Add Note */}

      <div className='p-6 border-b'>
        <textarea
          rows={4}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder='Write an internal note...'
          className='w-full border rounded-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-[#2F4832]'
        />

        <div className='flex justify-end mt-4'>
          <button
            onClick={addNote}
            className='flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2F4832] hover:bg-[#243927] text-white transition'>
            <Plus size={18} />
            Add Note
          </button>
        </div>
      </div>

      {/* Notes */}

      <div className='max-h-[500px] overflow-y-auto'>
        {notes.length === 0 ? (
          <div className='text-center py-20'>
            <StickyNote size={70} className='mx-auto text-gray-300 mb-5' />

            <h3 className='text-lg font-semibold'>No Notes Yet</h3>

            <p className='text-gray-500'>Create your first internal note.</p>
          </div>
        ) : (
          <div className='divide-y'>
            {notes.map((note) => (
              <div key={note.id} className='p-6 hover:bg-gray-50 transition'>
                <div className='flex justify-between gap-4'>
                  <div className='flex-1'>
                    <p className='leading-relaxed text-gray-700'>{note.text}</p>

                    <div className='flex items-center gap-2 mt-4 text-sm text-gray-500'>
                      <Clock size={15} />

                      {note.createdAt}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteNote(note.id)}
                    className='w-10 h-10 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 flex items-center justify-center'>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}

      <div className='border-t px-6 py-5 flex justify-between items-center'>
        <p className='text-sm text-gray-500'>
          Notes are only visible to administrators.
        </p>

        <button className='flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFB800] hover:bg-[#e4a900] text-black font-semibold transition'>
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
