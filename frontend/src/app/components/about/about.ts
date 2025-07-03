import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class AboutComponent {
  features = [
    {
      icon: 'psychology',
      title: 'AI-Powered Diagnosis',
      description:
        'Advanced machine learning algorithms analyze symptoms and provide preliminary assessments based on medical knowledge.',
    },
    {
      icon: 'security',
      title: 'Privacy First',
      description:
        'Your health information is encrypted and protected. We never share your data without explicit consent.',
    },
    {
      icon: 'accessibility',
      title: '24/7 Availability',
      description:
        'Get instant health insights anytime, anywhere. No waiting rooms or appointment scheduling required.',
    },
    {
      icon: 'verified',
      title: 'Medical Accuracy',
      description:
        'Built with input from healthcare professionals and validated against established medical databases.',
    },
  ];

  team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      description:
        'Board-certified physician with 15+ years of clinical experience in internal medicine.',
    },
    {
      name: 'Dr. Michael Chen',
      role: 'AI Research Director',
      description:
        'PhD in Computer Science specializing in medical AI and machine learning applications.',
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Clinical Research Lead',
      description:
        'Research physician focused on digital health technologies and patient outcomes.',
    },
  ];

  stats = [
    { number: '1M+', label: 'Users Served' },
    { number: '99.9%', label: 'Uptime' },
    { number: '50+', label: 'Medical Conditions' },
    { number: '24/7', label: 'Support' },
  ];

  openPrivacyPolicy() {
    window.open('/privacy-policy', '_blank');
  }

  openTermsOfService() {
    window.open('/terms-of-service', '_blank');
  }

  contactSupport() {
    window.open('mailto:support@sagemedic.ai', '_blank');
  }
}
