export type UrlParamValue = string | number | boolean | object | null | undefined

export interface UrlParams {
  [key: string]: UrlParamValue
}
