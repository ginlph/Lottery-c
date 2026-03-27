/**
 * 基础字段错误映射
 */
export type ValidationErrors<T extends Record<string, unknown>> = {
  [K in keyof T]?: string;
};

/**
 * 基础校验结果
 */
export interface ValidationResult<T extends Record<string, unknown>> {
  /** 是否校验通过 */
  valid: boolean;
  /** 字段错误详情 */
  errors?: ValidationErrors<T>;
}

/**
 * DTO 校验器类型（后续由后端/前端按场景实现）
 */
export type DtoValidator<T extends Record<string, unknown>> = (
  payload: unknown
) => ValidationResult<T>;

/**
 * 占位校验器创建函数
 * - 当前仅提供类型约束，具体规则在业务模块中实现。
 */
export function createPlaceholderValidator<T extends Record<string, unknown>>(): DtoValidator<T> {
  return () => ({
    valid: true
  });
}
