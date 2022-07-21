import { join } from 'path';

import { parseJson } from './json-with-extends';

const TESTING_DIR = join(__dirname, '../../testing');
const EXPECTED_BASE_JSON = {
  name: 'Base JSON',
  arr: [
    {
      name: 'Array 1',
    },
    {
      name: 'Array 2',
    },
  ],
  obj: {
    x: 42,
    q: true,
  },
};
const EXPECTED_CHILD_1 = {
  data: {
    x: 96,
  },
};
const EXPECTED_CHILD_2 = {
  w: 12,
};
const EXPECTED_CHILD_3 = {
  name: 'Child JSON',
};

describe('parseJson', () => {
  it('should read json extending other json', async () => {
    const child = await parseJson(join(TESTING_DIR, 'child-1.json'));
    expect(child).toEqual({ ...EXPECTED_BASE_JSON, ...EXPECTED_CHILD_1 });
  });

  describe('when extension is multilevel', () => {
    it('should read json extending other json', async () => {
      const child = await parseJson(join(TESTING_DIR, 'child-2.json'));
      expect(child).toEqual({ ...EXPECTED_BASE_JSON, ...EXPECTED_CHILD_1, ...EXPECTED_CHILD_2 });
    });
  });

  describe('when child overrides base properties', () => {
    it('should replace overriden properties', async () => {
      const child = await parseJson(join(TESTING_DIR, 'child-3.json'));
      expect(child).toEqual({ ...EXPECTED_BASE_JSON, ...EXPECTED_CHILD_3 });
    });
  });
});
