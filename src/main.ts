import { setFailed, setOutput, warning } from '@actions/core';
import { getOctokit } from '@actions/github';
import { getInputs, mapResponseToReleaseOutput } from './utils';
import { Release } from './types';
import { getLatestRelease, getReleaseByTagName } from './release';

async function run(): Promise<void> {
  try {
    const { token, owner, repo, tag_name, latest, draft } = getInputs();
    const octokit = getOctokit(token);

    if (tag_name && latest) {
      warning('Cannot use both tag_name and latest, ignoring tag_name!');
    }

    if (draft && latest) {
      warning('Cannot get latest release with draft=true, ignoring draft');
    }

    let release: Release;

    if (latest) {
      release = await getLatestRelease(octokit, owner, repo);
    } else if (tag_name) {
      if (draft) {
        throw new Error('not supported yet');
      } else {
        release = await getReleaseByTagName(octokit, owner, repo, tag_name);
      }
    } else {
      throw new Error('Neither tag_name nor latest is set.');
    }

    const output = mapResponseToReleaseOutput(release);
    for (const [key, value] of Object.entries(output)) {
      setOutput(key, value);
    }
  } catch (error) {
    setFailed(error instanceof Error ? error.message : error);
  }
}

void run();
