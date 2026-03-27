/**
 * 活动后台状态（管理端可维护）
 */
export enum ActivityStatus {
  /** 草稿态，不可参与 */
  Draft = 'draft',
  /** 进行中，可参与抽奖 */
  Online = 'online',
  /** 手动下线，不可参与 */
  Offline = 'offline',
  /** 已结束，不可参与 */
  Ended = 'ended'
}

/**
 * 活动前台展示状态（由时间和后台状态共同推导）
 */
export enum ActivityViewStatus {
  /** 未开始 */
  Upcoming = 'upcoming',
  /** 进行中 */
  Ongoing = 'ongoing',
  /** 已结束 */
  Ended = 'ended',
  /** 已下线 */
  Offline = 'offline'
}
