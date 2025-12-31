describe('Smoke Tests', () => {
  test('basic math works', () => {
    expect(1 + 1).toBe(2);
  });

  test('truthy and falsy values', () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });

  test('string match', () => {
    const appName = 'Blood For BD';
    expect(appName).toContain('Blood');
  });

  test('array contains value', () => {
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    expect(bloodGroups).toContain('O+');
  });

  test('object structure', () => {
    const donor = {
      name: 'Test User',
      bloodGroup: 'O+',
      active: true,
    };

    expect(donor).toHaveProperty('bloodGroup', 'O+');
    expect(donor.active).toBe(true);
  });
});
