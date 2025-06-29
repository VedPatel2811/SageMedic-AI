import { Component, ElementRef, ViewChild, AfterViewChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, MatCardModule, MatIconModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit, AfterViewChecked  {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages: Array<{ text: string; type: 'user' | 'assistant'; timestamp: Date }> = [];
  userInput: string = '';

  ngOnInit(){
    this.messages.push(
      { text: "Hello! I'm SageMedic AI. Please describe your symptoms and I'll help you understand what might be going on. Remember, this is for informational purposes only and should not replace professional medical advice.", timestamp: new Date(), type: 'assistant' }
    );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    this.messages.push({ text: this.userInput, type: 'user', timestamp: new Date() });

    // Simulate bot reply
    setTimeout(() => {
      this.messages.push({ text: `Echo: ${this.userInput}`, type: 'assistant', timestamp: new Date() });
    }, 500);

    this.userInput = '';
  }
}
