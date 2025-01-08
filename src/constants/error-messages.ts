export const INVALID_RELEASE_STATUS = (release_name: string, release_status: string): string => 
  `Jira release: ${release_name} has status ${release_status}, it should be "unreleased".`