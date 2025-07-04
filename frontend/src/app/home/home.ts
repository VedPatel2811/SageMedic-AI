import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { PredictService } from '../services/predict.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: Array<{
    text: string;
    type: 'user' | 'assistant';
    timestamp: Date;
  }> = [];
  userInput: string = '';
  isLoading: boolean = false;

  constructor(
    private predictService: PredictService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.messages.push({
      text: "Hello! I'm SageMedic AI. Please describe your symptoms and I'll help you understand what might be going on. Remember, this is for informational purposes only and should not replace professional medical advice.",
      timestamp: new Date(),
      type: 'assistant',
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop =
        this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ text: message, type: 'user', timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;

    this.predictService.getPrediction(message).subscribe({
      next: (response) => {
        const reply = `I think it might be ${response.label} (confidence: ${(response.confidence * 100).toFixed(1)}%)`;
        this.messages.push({
          text: reply,
          type: 'assistant',
          timestamp: new Date(),
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messages.push({
          text: "Sorry, I couldn't process your request. Please try again later.",
          type: 'assistant',
          timestamp: new Date(),
        });
        console.error('API Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
