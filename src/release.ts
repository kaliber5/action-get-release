import { debug } from '@actions/core';
import { Octokit, Release } from './types';

export async function getLatestRelease(github: Octokit, owner: string, repo: string): Promise<Release> {
  try {
    debug('Trying to fetch latest release');
    return (await github.repos.getLatestRelease({ owner, repo })).data;
  } catch (e) {
    throw new Error('Could not find latest release.');
  }
}

export async function getReleaseByTagName(github: Octokit, owner: string, repo: string, tag: string): Promise<Release> {
  try {
    debug(`Trying to fetch release for tag ${tag}`);
    return (await github.repos.getReleaseByTag({ owner, repo, tag })).data;
  } catch (e) {
    throw new Error(`Could not find release for tag ${tag}.`);
  }
}