import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  OnInit,
  HostListener,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class Chat implements AfterViewChecked, OnInit {
  sidebarClosed = true; // Start with sidebar closed on mobile
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  userInput = '';

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('autoTextarea') textarea!: ElementRef<HTMLTextAreaElement>;

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  ngOnInit() {
    this.setAppHeight();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setAppHeight();
  }

  setAppHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-height', `${vh}px`);
  }

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.userInput = ''; // Clear input immediately

      // Simulate a bot response
      setTimeout(() => {
        this.messages.push({
          text: 'This is a simulated response.',
          sender: 'bot',
        });
      }, 1000);
    }
  }

  private scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      // Handle potential errors if the element isn't ready
    }
  }

  autoResize() {
    const el = this.textarea.nativeElement;
    el.style.height = 'auto'; // Reset height
    el.style.height = `${el.scrollHeight}px`; // Set to scroll height
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
