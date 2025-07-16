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
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, Sidebar],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css'],
})
export class Chat implements AfterViewChecked, OnInit {
  sidebarClosed = true;
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

onSidebarToggled(newState: boolean) {
  this.sidebarClosed = newState;
}


  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }

  sendMessage() {
    if (this.userInput.trim()) {
      this.messages.push({ text: this.userInput, sender: 'user' });
      this.userInput = '';

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
