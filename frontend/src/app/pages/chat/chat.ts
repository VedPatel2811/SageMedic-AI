import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnInit,
  HostListener,
  ChangeDetectorRef,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Sidebar } from '../../components/sidebar/sidebar';
import { PredictService } from '../../services/predict.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, Sidebar],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class Chat implements AfterViewChecked, OnInit {
  sidebarClosed = true;
  messages: { text: string; sender: 'user' | 'bot'; timestamp: Date }[] = [];
  userInput = '';
  isLoading: boolean = false;

  constructor(private predictService: PredictService, private cdr: ChangeDetectorRef) {}

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('autoTextarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.setAppHeight();
    this.messages = [
      {
        text: "Hello! I'm SageMedic AI. Please describe your symptoms and I'll help you understand what might be going on. Remember, this is for informational purposes only and should not replace professional medical advice.",
        sender: 'bot',
        timestamp: new Date(),
      },
    ];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setAppHeight();
  }

  setAppHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-height', `${vh}px`);
  }

  onSidebarToggled(newState: boolean) {
    this.sidebarClosed = newState;
  }

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }

  sendMessage() {
    const message = this.userInput.trim();
    if (!message) return;

    this.messages.push({ text: message, sender: 'user', timestamp: new Date() });
    this.userInput = '';
    this.isLoading = true;

    this.predictService.getPrediction(message).subscribe({
      next: (response) => {
        const reply = `I think it might be ${response.label} (confidence: ${(response.confidence * 100).toFixed(1)}%)`;
        this.messages.push({
          text: reply,
          sender: 'bot',
          timestamp: new Date(),
        });
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.messages.push({
          text: "Sorry, I couldn't process your request. Please try again later.",
          sender: 'bot',
          timestamp: new Date(),
        });
        console.error('API Error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  autoResize() {
    const el = this.textarea.nativeElement;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  handleKeyDown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (!keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      this.sendMessage();
    }
  }

  get headerStyles(): { width: string; marginRight: string } {
    if (window.innerWidth < 768) {
      return { width: '100%', marginRight: '0' };
    }

    return this.sidebarClosed
      ? { width: 'calc(100% - 3.75rem)', marginRight: '3.75rem' }
      : { width: 'calc(100% - 16rem)', marginRight: '16rem' };
  }
}
