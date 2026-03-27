import { ERROR_CODES } from '../../enums/error-codes';
import { activityRepository, authRepository } from '../../repositories';
import { verifyAuthToken } from '../../services';
import { AppError } from '../../utils/app-error';

const DEFAULT_MAX_DRAW_PER_USER = 3;

interface GetConfigInput {
  query: Record<string, string | undefined>;
  headers?: Record<string, string | undefined>;
}

function readAuthorization(headers: Record<string, string | undefined> | undefined): string | undefined {
  if (!headers) return undefined;
  const hit = Object.entries(headers).find(([key]) => key.toLowerCase() === 'authorization');
  return hit?.[1];
}

function normalizeToken(authHeader: string | undefined): string | undefined {
  if (!authHeader) return undefined;
  if (!authHeader.startsWith('Bearer ')) return authHeader;
  return authHeader.slice('Bearer '.length).trim();
}

function buildCoverConfig(activity: { name: string; description: string }) {
  return {
    title: activity.name,
    subtitle: activity.description,
    theme: 'default',
    banner_url: ''
  };
}

export const activityService = {
  async getConfig(input: GetConfigInput) {
    const activityId = input.query.activity_id?.trim();
    if (!activityId) {
      throw new AppError(ERROR_CODES.BAD_REQUEST, 'activity_id is required', 400);
    }

    const activity = await activityRepository.getActivityByActivityId(activityId);
    if (!activity) {
      throw new AppError(ERROR_CODES.NOT_FOUND, 'activity does not exist', 404);
    }

    const prizeDocs = await activityRepository.listEffectivePrizes(activityId);
    const prize_display = prizeDocs.map((prize) => ({
      prize_id: prize.prize_id,
      prize_type: prize.prize_type,
      prize_name: prize.title,
      prize_desc: prize.title,
      sort_order: prize.sort_order
    }));

    let userState = {
      status: 'need_verify_order',
      verified: false,
      user_key: undefined as string | undefined,
      total_chances: 0,
      used_chances: 0,
      remaining_chances: 0
    };

    const token = normalizeToken(readAuthorization(input.headers));
    if (token) {
      const payload = await verifyAuthToken(token).catch(() => undefined);
      if (payload?.activity_id === activityId) {
        const profile = await authRepository.getUserProfileByToken(activityId, token);
        if (profile) {
          const chances = await authRepository.getUserChances(activityId, profile.user_key);
          userState = {
            status: 'verified',
            verified: true,
            user_key: profile.user_key,
            total_chances: chances?.total_chances ?? DEFAULT_MAX_DRAW_PER_USER,
            used_chances: chances?.used_chances ?? 0,
            remaining_chances: chances?.remaining_chances ?? DEFAULT_MAX_DRAW_PER_USER
          };
        }
      }
    }

    return {
      activity_id: activity.activity_id,
      activity_name: activity.name,
      activity_status: activity.status,
      start_time: activity.start_at,
      end_time: activity.end_at,
      rule_text: activity.rules_text,
      notice_text: activity.description,
      max_draw_per_user: DEFAULT_MAX_DRAW_PER_USER,
      prize_display,
      user_state: userState,
      cover_config: buildCoverConfig(activity)
    };
  }
};
