import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectsPage from './ProjectsPage';

describe('project carousel', () => {
  it('advances to the next case study', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Megiddo', level: 2 })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(screen.getByRole('heading', { name: 'JoyCare', level: 2 })).toBeInTheDocument();
  });
});
