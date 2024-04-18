import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers'; // Import the matcher directly
import NoteList from './NoteList';

// Extend Jest with the matcher
expect.extend({ toBeInTheDocument });

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, title: 'Test Note', body: 'Test Body', priority: 'High' }])
  })
);

describe('NoteList Component', () => {
  test('renders notes correctly', async () => {
    render(<NoteList />);
    // Wait for notes to be fetched
    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
      expect(screen.getByText('Test Body')).toBeInTheDocument();
      expect(screen.getByText('Priority: High')).toBeInTheDocument();
    });
  });

  test('deletes a note when delete button is clicked', async () => {
    render(<NoteList />);
    // Wait for notes to be fetched
    await waitFor(() => {
      expect(screen.getByText('Test Note')).toBeInTheDocument();
    });

    // Mock the delete note endpoint
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Note deleted successfully' })
      })
    );

    // Click the delete button
    fireEvent.click(screen.getByText('Delete'));

    // Wait for the note to be deleted
    await waitFor(() => {
      expect(screen.queryByText('Test Note')).not.toBeInTheDocument();
    });
  });

  // Add more test cases as needed
});
