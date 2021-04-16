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

export async function getReleaseById(github: Octokit, owner: string, repo: string, id: string): Promise<Release> {
  try {
    debug(`Trying to fetch release for ID ${id}`);
    return (await github.repos.getRelease({ owner, repo, release_id: parseInt(id, 10) })).data;
  } catch (e) {
    throw new Error(`Could not find release for ID ${id}.`);
  }
}

export async function getDraftReleaseByTagName(
  github: Octokit,
  owner: string,
  repo: string,
  tag: string
): Promise<Release> {
  try {
    debug(`Trying to fetch draft release for tag ${tag}`);
    const release = (await github.repos.listReleases({ owner, repo })).data.find(
      (listItem) => listItem.draft === true && listItem.tag_name === tag
    );

    if (!release) {
      throw new Error();
    }

    return release;
  } catch (e) {
    throw new Error(`Could not find release for tag ${tag}.`);
  }
}
