
export interface HealthResponse {
  status: 'ok' | 'error';
  database: 'up' | 'down';
  storage: string;
  uptimeSeconds: number;
  timestamp: string;
}



export interface ApiErrorDetail {
  field: string; 
  message: string; 
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: ApiErrorDetail[];
  };
}
