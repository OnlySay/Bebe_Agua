import React from 'react';
import { render } from '@testing-library/react-native';
import { Badge } from '@/components/design-system/Badge';

describe('Badge', () => {
  it('should render label correctly', () => {
    const { getByText } = render(<Badge label="Test Badge" />);
    expect(getByText('Test Badge')).toBeTruthy();
  });

  it('should apply variant styles', () => {
    const { getByText, rerender } = render(<Badge label="Default" variant="default" />);
    expect(getByText('Default')).toBeTruthy();

    rerender(<Badge label="Success" variant="success" />);
    expect(getByText('Success')).toBeTruthy();

    rerender(<Badge label="Warning" variant="warning" />);
    expect(getByText('Warning')).toBeTruthy();

    rerender(<Badge label="Error" variant="error" />);
    expect(getByText('Error')).toBeTruthy();

    rerender(<Badge label="Info" variant="info" />);
    expect(getByText('Info')).toBeTruthy();
  });

  it('should apply size styles', () => {
    const { getByText, rerender } = render(<Badge label="Small" size="small" />);
    expect(getByText('Small')).toBeTruthy();

    rerender(<Badge label="Medium" size="medium" />);
    expect(getByText('Medium')).toBeTruthy();
  });
});

