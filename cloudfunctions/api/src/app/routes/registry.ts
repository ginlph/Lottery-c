import {
  activityOverviewController,
  adminCouponsController,
  adminDrawRecordsController,
  adminPrizesController,
  claimPhysicalGiftController,
  drawController,
  getActivityConfigController,
  myChancesController,
  myPrizeController,
  refreshTokenController,
  updateActivityStatusController,
  updatePrizeController,
  verifyOrderController
} from '../controllers';
import { adminMiddleware } from '../middlewares/admin';
import { authTokenMiddleware } from '../middlewares/auth-token';
import { validateBody } from '../middlewares/validate';
import type { RouteDefinition } from '../types';
import { passThroughObject, validateRequestIdPayload, validateVerifyOrderPayload } from '../../validators';

export const routes: RouteDefinition[] = [
  {
    method: 'POST',
    path: '/api/auth/verify-order',
    middlewares: [validateBody(validateVerifyOrderPayload)],
    handler: verifyOrderController
  },
  {
    method: 'POST',
    path: '/api/auth/refresh-token',
    middlewares: [validateBody(passThroughObject)],
    handler: refreshTokenController
  },
  {
    method: 'GET',
    path: '/api/activity/config',
    handler: getActivityConfigController
  },
  {
    method: 'POST',
    path: '/api/lottery/draw',
    middlewares: [authTokenMiddleware, validateBody(validateRequestIdPayload)],
    handler: drawController
  },
  {
    method: 'GET',
    path: '/api/lottery/my-prize',
    middlewares: [authTokenMiddleware],
    handler: myPrizeController
  },
  {
    method: 'GET',
    path: '/api/lottery/my-chances',
    middlewares: [authTokenMiddleware],
    handler: myChancesController
  },
  {
    method: 'POST',
    path: '/api/lottery/claim-physical-gift',
    middlewares: [authTokenMiddleware, validateBody(passThroughObject)],
    handler: claimPhysicalGiftController
  },
  {
    method: 'GET',
    path: '/api/admin/activity/overview',
    middlewares: [adminMiddleware],
    handler: activityOverviewController
  },
  {
    method: 'GET',
    path: '/api/admin/prizes',
    middlewares: [adminMiddleware],
    handler: adminPrizesController
  },
  {
    method: 'GET',
    path: '/api/admin/draw-records',
    middlewares: [adminMiddleware],
    handler: adminDrawRecordsController
  },
  {
    method: 'GET',
    path: '/api/admin/coupons',
    middlewares: [adminMiddleware],
    handler: adminCouponsController
  },
  {
    method: 'POST',
    path: '/api/admin/activity/status',
    middlewares: [adminMiddleware, validateBody(passThroughObject)],
    handler: updateActivityStatusController
  },
  {
    method: 'POST',
    path: '/api/admin/prize/update',
    middlewares: [adminMiddleware, validateBody(passThroughObject)],
    handler: updatePrizeController
  }
];
