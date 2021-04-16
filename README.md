# Get Release Info

[![build-test](https://github.com/kaliber5/action-get-release/actions/workflows/test.yml/badge.svg)](https://github.com/kaliber5/action-get-release/actions/workflows/test.yml)

Github action to fetch release data. Supports querying by

- release ID
- latest release
- tag name
- tag name for draft releases

## Usage

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Get latest release
        id: latest_release
        uses: kaliber5/action-get-release@v1
        with:
          token: ${{ github.token }}
          latest: true
```

### Inputs

- `token`: The Github token used for authentication. Required, `${{ github.token }}` can be used usually.
- `owner`: Name of the owner of the repo, taken from current repo by default.
- `repo`: Name of the repository, taken from current repo by default.
- `id`: The ID to identify the release.
- `tag_name`: Tag name to identify the release.
- `latest`: Will fetch the latest release if set to true.
- `draft`: Set to true if you are looking for an unpublished draft release. In this case `tag_name` must also be set.

One of `id`, `tag_name` or `latest` inputs must be provided

### Outputs

- `id`: The ID of the Release
- `url`: The release url
- `html_url`: The url users can navigate to in order to view the release
- `assets_url`: The release assets url
- `upload_url`: The url for uploading assets to the release
- `name`: The release name
- `tag_name`: The git tag associated with the release
- `draft`: Is draft
- `prerelease`: Is pre-release
- `target_commitish`: The release was create to which target branch
- `created_at`: Created date
- `published_at`: Published date
