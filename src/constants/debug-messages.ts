// projects
export const PROJECT_LOADED = (project_id: string): string => `Project loaded ${project_id}`

// versions
export const VERSION_NOT_FOUND = (name: string): string => `Version ${name} not found`
export const VERSION_FOUND = (name: string, version: string): string =>
  `Version ${name} (ID ${version}) found and will be updated`
export const VERSION_WILL_BE_CREATED = (name: string): string => `Version ${name} will be created`
export const VERSION_WILL_BE_RELEASED = (name: string): string => `Version ${name} will to be released`
export const VERSION_CREATED = (name: string): string => `Version ${name} was successfully created`
export const VERSION_RELEASED = (name: string): string => `Version ${name} was successfully released`
// tickets
export const ADDING_TICKET_TO_VERSION = (ticket_id: string, version_name: string): string =>
  `Assigning ticket [${ticket_id}] to version ${version_name}`
export const TICKET_ADDED_TO_VERSION = (ticket_id: string, version_name: string): string =>
  `Ticket [${ticket_id}] was successfully added to version ${version_name}`
