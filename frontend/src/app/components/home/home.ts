import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { AiService, AIResponse } from '../../services/ai.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    HttpClientModule,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent implements OnInit {
  userInput = '';
  messages: Array<{
    type: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    confidence?: number;
    severity?: 'low' | 'medium' | 'high';
  }> = [];
  isLoading = false;

  constructor(private aiService: AiService) {}

  ngOnInit() {
    // Add welcome message
    this.messages.push({
      type: 'assistant',
      content:
        "Hello! I'm SageMedic AI. Please describe your symptoms and I'll help you understand what might be going on. Remember, this is for informational purposes only and should not replace professional medical advice.",
      timestamp: new Date(),
    });
  }

  sendMessage() {
    if (this.userInput.trim()) {
      // Add user message
      this.messages.push({
        type: 'user',
        content: this.userInput,
        timestamp: new Date(),
      });

      const userMessage = this.userInput;
      this.userInput = '';
      this.isLoading = true;

      // Call the real AI service
      this.aiService.analyzeSymptoms(userMessage).subscribe({
        next: (response: AIResponse) => {
          const responseMessage = this.generateResponseWithConfidence(
            userMessage,
            response
          );
          this.messages.push({
            type: 'assistant',
            content: responseMessage,
            timestamp: new Date(),
            confidence: response.confidence,
            severity: this.getSeverityLevel(response.confidence),
          });
          this.isLoading = false;
        },
        error: (error) => {
          console.error('API Error:', error);
          this.messages.push({
            type: 'assistant',
            content:
              "I apologize, but I'm having trouble analyzing your symptoms right now. Please try again later or consult with a healthcare professional.",
            timestamp: new Date(),
          });
          this.isLoading = false;
        },
      });
    }
  }

  private generateResponseWithConfidence(
    symptoms: string,
    aiResponse: AIResponse
  ): string {
    const confidence = aiResponse.confidence;
    const label = aiResponse.label;
    const severity = this.getSeverityLevel(confidence);

    let confidenceMessage = '';
    let recommendation = '';

    // Creative confidence handling
    if (confidence >= 0.8) {
      confidenceMessage = `I'm quite confident (${(confidence * 100).toFixed(
        1
      )}%) about this assessment.`;
      recommendation =
        'This appears to be a strong indication, but still consult a healthcare professional for confirmation.';
    } else if (confidence >= 0.6) {
      confidenceMessage = `I'm moderately confident (${(
        confidence * 100
      ).toFixed(1)}%) about this assessment.`;
      recommendation =
        'This is a reasonable possibility, but other conditions should also be considered.';
    } else if (confidence >= 0.4) {
      confidenceMessage = `I have some confidence (${(confidence * 100).toFixed(
        1
      )}%) about this assessment.`;
      recommendation =
        'This is one possibility among several, and further evaluation is recommended.';
    } else {
      confidenceMessage = `I have low confidence (${(confidence * 100).toFixed(
        1
      )}%) about this assessment.`;
      recommendation =
        'Your symptoms could indicate various conditions. Professional medical evaluation is strongly advised.';
    }

    return `Based on your symptoms: "${symptoms}"

Possible condition: ${label}
${confidenceMessage}

${recommendation}

⚠️ Remember: This is for informational purposes only and should not replace professional medical advice. Always consult with a qualified healthcare provider for proper diagnosis and treatment.`;
  }

  private getSeverityLevel(confidence: number): 'low' | 'medium' | 'high' {
    if (confidence >= 0.7) return 'high';
    if (confidence >= 0.4) return 'medium';
    return 'low';
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
