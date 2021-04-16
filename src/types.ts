import { GitHub } from '@actions/github/lib/utils';
import { RestEndpointMethodTypes } from '@octokit/plugin-rest-endpoint-methods/dist-types/generated/parameters-and-response-types';

export type Octokit = InstanceType<typeof GitHub>;

export interface Inputs {
  token: string;
  owner: string;
  repo: string;
  tag_name?: string;
  latest: boolean;
  draft: boolean;
}

export type Release = RestEndpointMethodTypes['repos']['getLatestRelease']['response']['data'];

export interface ReleaseOutput {
  id: number;
  url: string;
  html_url: string;
  assets_url: string;
  upload_url: string;
  name: string;
  tag_name: string;
  draft: boolean;
  prerelease: boolean;
  target_commitish: string;
  created_at: string;
  published_at: string;
}
