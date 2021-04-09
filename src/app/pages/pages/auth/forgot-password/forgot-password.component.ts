import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import icMail from '@iconify/icons-ic/twotone-mail';
import { AuthenticationService } from '../../../../Services/AuthenticationService';
@Component({
  selector: 'vex-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUp400ms]
})
export class ForgotPasswordComponent implements OnInit {

  form = this.fb.group({
    email: [null, Validators.required]
  });

  icMail = icMail;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
  }

  send() {
    const admin = this.form.value;
    this.AuthenticationService.forgot(admin.email)
    .subscribe(
        data => {
          if(data.success){
            //console.log(data)
            this.router.navigate(['/login']);

          }
        },
        error => {
          //console.log(error.error)
          let message="Error";
          if(!error.error.success)
            message = error.error.type;
          this.router.navigate(['/forgot-password']);
          this.snackbar.open(message, 'OK', {
            duration: 10000
          });
        });


    
  }
}
