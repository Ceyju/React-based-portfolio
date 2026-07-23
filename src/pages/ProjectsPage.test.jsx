import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ProjectsPage from './ProjectsPage';

describe('project carousel', () => {
  it('advances to the next case study', () => {
    render(<ProjectsPage />);
    expect(screen.getByRole('heading', { name: 'Megiddo', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Megiddo project preview' })).toHaveAttribute('src', '/React-based-portfolio/Megiddo_thumbnail.png');
    expect(screen.getByText('STATUS // LIVE')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }));
    expect(screen.getByRole('heading', { name: 'JoyCare', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'JoyCare project preview' })).toHaveAttribute('src', '/React-based-portfolio/JoyCare_thumbnail.png');
  });

  it('keeps the generated visual for projects without media', () => {
    const { container } = render(<ProjectsPage />);
    const projectPage = within(container);
    fireEvent.click(projectPage.getByRole('button', { name: 'View Dispatch Network' }));
    expect(projectPage.queryByRole('img', { name: /project preview/i })).not.toBeInTheDocument();
    expect(container.querySelector('.project-glyph')).toHaveTextContent('DI');
  });
});
