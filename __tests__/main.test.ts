// @ts-ignore
import { run } from '@jonabc/actions-mocks';
import path from 'path';
import fs from 'fs';

const script = path.join(__dirname, '../lib/main');
const env = {
  GITHUB_REPOSITORY: 'foo/bar',
  INPUT_TOKEN: 'dummy',
};

function parseOutput(raw: string): Record<string, string> {
  return raw
    .split('\n')
    .filter((line) => line.match(/^::set-output/))
    .map((line) => line.replace('::set-output name=', '').split('::'))
    .reduce((result, [key, value]) => ({ ...result, [key]: value }), {});
}

describe('main', function () {
  test('can fetch latest release', async () => {
    const mocks = {
      github: [
        {
          method: 'GET',
          uri: '/repos/foo/bar/releases/latest',
          file: path.join(__dirname, 'fixtures/api/single.json'),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        },
      ],
    };

    const { out, status } = await run(script, { env: { ...env, INPUT_LATEST: 'true' }, mocks });
    const output = parseOutput(out);

    expect(status).toEqual(0);
    expect(output).toEqual(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/output/latest.json'), { encoding: 'utf-8' }))
    );
  });

  test('can fetch release by id', async () => {
    const mocks = {
      github: [
        {
          method: 'GET',
          uri: '/repos/foo/bar/releases/1',
          file: path.join(__dirname, 'fixtures/api/single.json'),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        },
      ],
    };

    const { out, status } = await run(script, { env: { ...env, INPUT_ID: '1' }, mocks });
    const output = parseOutput(out);

    expect(status).toEqual(0);
    expect(output).toEqual(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/output/id.json'), { encoding: 'utf-8' }))
    );
  });

  test('can fetch release by tag', async () => {
    const mocks = {
      github: [
        {
          method: 'GET',
          uri: '/repos/foo/bar/releases/tags/v1.0.0',
          file: path.join(__dirname, 'fixtures/api/single.json'),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        },
      ],
    };

    const { out, status } = await run(script, { env: { ...env, INPUT_TAG_NAME: 'v1.0.0' }, mocks });
    const output = parseOutput(out);

    expect(status).toEqual(0);
    expect(output).toEqual(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/output/tag.json'), { encoding: 'utf-8' }))
    );
  });

  test('can fetch draft release by tag', async () => {
    const mocks = {
      github: [
        {
          method: 'GET',
          uri: '/repos/foo/bar/releases',
          file: path.join(__dirname, 'fixtures/api/list.json'),
          headers: {
            'content-type': 'application/json; charset=utf-8',
          },
        },
      ],
    };

    const { out, status } = await run(script, {
      env: { ...env, INPUT_TAG_NAME: 'v1.1.0', INPUT_DRAFT: 'true' },
      mocks,
    });
    const output = parseOutput(out);

    expect(status).toEqual(0);
    expect(output).toEqual(
      JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/output/draft.json'), { encoding: 'utf-8' }))
    );
  });
});
