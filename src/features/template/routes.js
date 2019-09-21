import { TemplateListPage } from './pages/list'
import { CreateTemplatePage } from './pages/create'

export const templateRoutes = () => [
  {
    path: '/templates',
    exact: true,
    component: TemplateListPage,
  },
  {
    path: '/templates/create',
    component: CreateTemplatePage,
  },
]
