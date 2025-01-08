import { info, setFailed } from '@actions/core'
import { EMAIL, API_TOKEN, SUBDOMAIN, RELEASE_NAME, PROJECT, CREATE, RELEASE } from './env'
import { API } from './api'
import * as DebugMessages from './constants/debug-messages'
import * as ErrorMessages from './constants/error-messages'
import { CreateVersionParams, UpdateVersionParams } from './types'

const printConfiguration = (): void => {
  info(`
    CONFIGURED WITH OPTIONS:
      * email ${EMAIL}
      * project: ${PROJECT}
      * subdomain: ${SUBDOMAIN}
      * release: ${RELEASE_NAME}
      * create: ${CREATE}
      * release: ${RELEASE}
  `)
}

async function run(): Promise<void> {
  try {
    printConfiguration();

    const api = new API(EMAIL, API_TOKEN, PROJECT, SUBDOMAIN)
    const project = await api.loadProject()
    info(DebugMessages.PROJECT_LOADED(project.id))

    let version = project.versions.find((v) => v.name === RELEASE_NAME)
    const release = RELEASE === true

    if (version === undefined) {
      info(DebugMessages.VERSION_NOT_FOUND(RELEASE_NAME))

      if (CREATE === true) {
        info(DebugMessages.VERSION_WILL_BE_CREATED(RELEASE_NAME))

        const versionToCreate: CreateVersionParams = {
          name: RELEASE_NAME,
          released: release,
          projectId: Number(project.id),
          startDate: new Date().toISOString(),
          ...(release && { releaseDate: new Date().toISOString() })
        }

        version = await api.createVersion(versionToCreate)
        info(DebugMessages.VERSION_CREATED(RELEASE_NAME))
      } else {
        throw new Error(DebugMessages.VERSION_NOT_FOUND(RELEASE_NAME))
      }
    } else {
      info(DebugMessages.VERSION_FOUND(RELEASE_NAME, version.id))

      if(version.archived === true || version.released === true) {
        throw new Error(
          ErrorMessages.INVALID_RELEASE_STATUS(RELEASE_NAME, version.released ? 'released':'archived')
        )
      }

      if (release) {
        info(DebugMessages.VERSION_WILL_BE_RELEASED(RELEASE_NAME))

        const versionToUpdate: UpdateVersionParams = {
          released: true,
          releaseDate: new Date().toISOString()
        }

        version = await api.updateVersion(version.id, versionToUpdate)
        info(DebugMessages.VERSION_RELEASED(RELEASE_NAME))
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      setFailed(e.message)
    } else {
      setFailed(String(e))
    }
  }
}

run()
