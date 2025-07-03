import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
  ],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent {
  settings = {
    notifications: {
      enabled: true,
      email: true,
      push: false,
    },
    privacy: {
      dataCollection: true,
      analytics: false,
      shareData: false,
    },
    interface: {
      theme: 'light',
      language: 'en',
      fontSize: 'medium',
    },
    ai: {
      responseLength: 'detailed',
      medicalDisclaimer: true,
      saveHistory: true,
    },
  };

  themes = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'System Default' },
  ];

  languages = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
  ];

  fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  responseLengths = [
    { value: 'brief', label: 'Brief' },
    { value: 'detailed', label: 'Detailed' },
    { value: 'comprehensive', label: 'Comprehensive' },
  ];

  saveSettings() {
    // Save settings to localStorage or backend
    localStorage.setItem('sageMedicSettings', JSON.stringify(this.settings));
    console.log('Settings saved:', this.settings);
  }

  resetSettings() {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      this.settings = {
        notifications: {
          enabled: true,
          email: true,
          push: false,
        },
        privacy: {
          dataCollection: true,
          analytics: false,
          shareData: false,
        },
        interface: {
          theme: 'light',
          language: 'en',
          fontSize: 'medium',
        },
        ai: {
          responseLength: 'detailed',
          medicalDisclaimer: true,
          saveHistory: true,
        },
      };
      this.saveSettings();
    }
  }

  exportData() {
    const data = {
      settings: this.settings,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sageMedic-settings.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
