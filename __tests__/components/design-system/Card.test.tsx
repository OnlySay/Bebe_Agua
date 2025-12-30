import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '@/components/design-system/Card';
import { Text } from 'react-native';

describe('Card', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('should apply variant styles', () => {
    const { rerender } = render(
      <Card variant="default">
        <Text>Default</Text>
      </Card>
    );

    rerender(
      <Card variant="elevated">
        <Text>Elevated</Text>
      </Card>
    );

    rerender(
      <Card variant="outlined">
        <Text>Outlined</Text>
      </Card>
    );
  });

  it('should apply padding styles', () => {
    const { rerender } = render(
      <Card padding="none">
        <Text>No Padding</Text>
      </Card>
    );

    rerender(
      <Card padding="small">
        <Text>Small Padding</Text>
      </Card>
    );

    rerender(
      <Card padding="medium">
        <Text>Medium Padding</Text>
      </Card>
    );

    rerender(
      <Card padding="large">
        <Text>Large Padding</Text>
      </Card>
    );
  });
});

