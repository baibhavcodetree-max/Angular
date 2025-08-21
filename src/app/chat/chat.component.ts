import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: false,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  userMessage: string = '';

  messages: { from:string, text: string }[] = [];

  constructor(private chatService: ChatService) {}

  sendMessage(): void {
    if (this.userMessage.trim()) {

      this.messages.push({ from: 'user', text: this.userMessage });

      this.chatService.sendMessage(this.userMessage).subscribe({
      
        next: (res) => {
          console.log('Response from server:', res);
          const cleantext = res.response.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
          this.messages.push({ from: 'bot', text: res.response.replace(/<think>[\s\S]*?<\/think>/g, '').trim() });

          this.userMessage = ''; // Clear the input field after sending
        },
        error: (error) => {
          this.messages.push({ from: 'bot', text: 'Error: ' + error.message });
        }
      });
    }
  }
}
