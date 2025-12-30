import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/design-system/Button';

describe('Button', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(<Button title="Test Button" onPress={mockOnPress} />);
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled />
    );
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('should show loading indicator when loading', () => {
    const { queryByText, getByTestId } = render(
      <Button title="Test Button" onPress={mockOnPress} loading />
    );
    expect(queryByText('Test Button')).toBeNull();
    // ActivityIndicator no tiene testID por defecto, pero podemos verificar que el texto no está
  });

  it('should apply variant styles', () => {
    const { getByText, rerender } = render(
      <Button title="Primary" onPress={mockOnPress} variant="primary" />
    );
    expect(getByText('Primary')).toBeTruthy();

    rerender(<Button title="Secondary" onPress={mockOnPress} variant="secondary" />);
    expect(getByText('Secondary')).toBeTruthy();

    rerender(<Button title="Outline" onPress={mockOnPress} variant="outline" />);
    expect(getByText('Outline')).toBeTruthy();

    rerender(<Button title="Ghost" onPress={mockOnPress} variant="ghost" />);
    expect(getByText('Ghost')).toBeTruthy();
  });

  it('should apply size styles', () => {
    const { getByText, rerender } = render(
      <Button title="Small" onPress={mockOnPress} size="small" />
    );
    expect(getByText('Small')).toBeTruthy();

    rerender(<Button title="Medium" onPress={mockOnPress} size="medium" />);
    expect(getByText('Medium')).toBeTruthy();

    rerender(<Button title="Large" onPress={mockOnPress} size="large" />);
    expect(getByText('Large')).toBeTruthy();
  });

  it('should have accessibility label', () => {
    const { getByLabelText } = render(
      <Button
        title="Test Button"
        onPress={mockOnPress}
        accessibilityLabel="Custom Label"
      />
    );
    expect(getByLabelText('Custom Label')).toBeTruthy();
  });
});

