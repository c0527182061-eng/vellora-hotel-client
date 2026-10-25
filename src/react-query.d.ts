import "@tanstack/react-query"
import type { AxiosError } from "axios"
import type { ApiErrorBody } from "./types/common"

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<ApiErrorBody>
  }
}