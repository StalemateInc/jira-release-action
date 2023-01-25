// projects
export const PROJECT_LOADED = (project_id: string): string => `Project loaded ${project_id}`

// versions
export const VERSION_NOT_FOUND = (name: string): string => `Version ${name} not found`
export const VERSION_FOUND = (name: string): string => `Version ${name} found`
export const VERSION_WILL_BE_CREATED = (name: string): string => `Version ${name} will be created`
export const VERSION_WILL_BE_RELEASED = (name: string): string => `Version ${name} found and will to be released`
export const VERSION_CREATED = (name: string): string => `Version ${name} was successfully created`
export const VERSION_RELEASED = (name: string): string => `Version ${name} was successfully released`
// tickets
export const ASSIGNING_TICKET = (ticket_id: string, version: string): string =>
  `Assigning ticket [${ticket_id}] to version ${version}`
export const TICKET_ASSIGNED = (ticket_id: string, version: string): string =>
  `Ticket [${ticket_id}] was successfully assigned to version ${version}`
