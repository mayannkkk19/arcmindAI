import { APIKeyProvider } from "@/lib/crypto/encryption";
import { DOC_ROUTES } from "@/lib/routes";
import axios from "axios";
import { useState } from "react";

export interface ApiKeyStatus {
  hasGeminiKey: boolean;
  hasOpenAIKey: boolean;
}

type Response = { success: boolean; message?: string };

function parseErrorMessage(err: unknown, defaultMessage: string): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.error || defaultMessage;
  }
  return err instanceof Error ? err.message : defaultMessage;
}

export function useApiKeys() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getApiKeyStatus = async (): Promise<ApiKeyStatus | null> => {
    setError(null);
    try {
      const response = await axios.get(DOC_ROUTES.API.USER_API_KEYS);
      return response.data as ApiKeyStatus;
    } catch (err) {
      setError(parseErrorMessage(err, "Failed to load API key status"));
      return null;
    }
  };

  const saveApiKeys = async (keys: {
    geminiApiKey?: string;
    openaiApiKey?: string;
  }): Promise<Response> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(DOC_ROUTES.API.USER_API_KEYS, keys);
      return { success: !!response.data?.success };
    } catch (err) {
      const message = parseErrorMessage(err, "Failed to save API keys");
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteApiKey = async (provider: APIKeyProvider): Promise<Response> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.delete(DOC_ROUTES.API.USER_API_KEYS, {
        params: { provider },
      });
      return { success: !!response.data?.success };
    } catch (err) {
      const message = parseErrorMessage(err, "Failed to remove API key");
      setError(message);
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  return { getApiKeyStatus, saveApiKeys, deleteApiKey, isLoading, error };
}
