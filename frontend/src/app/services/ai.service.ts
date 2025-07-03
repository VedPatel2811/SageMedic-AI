import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

export interface AIResponse {
  label: string;
  confidence: number;
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private apiUrl = API_CONFIG.BASE_URL;

  constructor(private http: HttpClient) {}

  analyzeSymptoms(symptoms: string): Observable<AIResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<AIResponse>(
      `${this.apiUrl}${API_CONFIG.ENDPOINTS.PREDICT}`,
      {
        inputs: symptoms,
      },
      { headers }
    );
  }
}
