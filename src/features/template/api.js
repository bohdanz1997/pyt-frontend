import { request } from '@features/common'

export const templateApi = {
  create: (templateData) =>
    request('POST', '/templates', { data: templateData }),

  getList: () => request('GET', '/templates'),

  remove: (templateId) =>
    request('DELETE', `/templates/${templateId}`),
}
