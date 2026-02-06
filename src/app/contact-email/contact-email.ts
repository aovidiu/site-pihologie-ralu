import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-email',
  imports: [ CommonModule, FormsModule],
  templateUrl: './contact-email.html',
  styleUrl: './contact-email.css',
})
export class ContactEmail {

  @ViewChild('contactForm') contactForm!: NgForm;

  ngAfterViewInit() {
    // Listen for any change in form fields
    this.contactForm.valueChanges?.subscribe(() => {
      this.successMessage = '';
      this.errorMessage = '';
    });
  }
  
  successMessage: string = '';
  errorMessage: string = '';
  sending: boolean = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  sendEmail(form: NgForm) {
    debugger;
    if (form.invalid) return;

    this.sending = true;
    this.successMessage = '';
    this.errorMessage = '';

    const url = 'https://formspree.io/f/xreagzzg';
    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    this.http.post(url, form.value, { headers }).subscribe({
      next: () => {
        debugger;
        this.successMessage = 'Message sent successfully!';
        this.errorMessage = '';
        form.resetForm();
        this.sending = false;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        debugger;
        var serverError: string = err.error.error;
        if(serverError.toLowerCase().includes("validation")) {
          serverError = "Invalid email address";
        } else {
          serverError = '';
        }
        this.errorMessage = 'Oops! Something went wrong. ' +  serverError;
        this.successMessage = '';
        this.sending = false;
        this.cdr.detectChanges(); 
      }
    });
  }
}
