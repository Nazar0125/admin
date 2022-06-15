import { CreateTemplate } from '../pages/createTemplate';
import { Prices } from '../pages/prices';
import {Templates} from '../pages/templates';
import {UpdateTemplate} from '../pages/updateTemplate'
import {NotFound} from '../pages/notFound'
import {AuthPage} from '../pages/auth/auth';
import {Applications} from '../pages/applications'
import {UpdateApplication} from '../pages/updateApplication';
import {CREATE_TEMPLATE_ROUTE, TEMPLATE_ROUTE, PRICES_ROUTE, APPLICATIONS_ROUTE, AUTH_ROUTE} from '../utils/consts/consts.js';

export const routes = [
  {
    element: <Templates />,
    path: "/",
  },
  {
    element: <CreateTemplate />,
    path: CREATE_TEMPLATE_ROUTE,
  },
  {
    element: <UpdateTemplate />,
    path: `${TEMPLATE_ROUTE}/:id`,
  },
  {
    element: <Prices />,
    path: PRICES_ROUTE,
  },
  {
    element: <Applications />,
    path: APPLICATIONS_ROUTE,
  },
  {
    element: <UpdateApplication />,
    path: `${APPLICATIONS_ROUTE}/:id`,
  },
  {
    element: <AuthPage />,
    path: AUTH_ROUTE,
  },
  {
    element: <NotFound />,
    path: '*',
  }
];