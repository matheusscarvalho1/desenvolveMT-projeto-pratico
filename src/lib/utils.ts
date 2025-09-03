import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        return "Dados inválidos. Verifique as informações.";
      case 401:
        return "Não autorizado. Faça login novamente.";
      case 403:
        return "Acesso negado.";
      case 404:
        return "Recurso não encontrado.";
      case 500:
        return "Erro interno do servidor. Tente novamente.";
      default:
        return (
          error.response?.data?.message || "Erro ao se comunicar com o servidor"
        );
    }
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return "Erro desconhecido";
  }
};
