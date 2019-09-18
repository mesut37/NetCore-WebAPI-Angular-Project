import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormControl} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService, private formBuilder:FormBuilder,private alertifyService:AlertifyService) { }

  registerForm:FormGroup;
  registerUser:any={}
  ngOnInit() {
    this.createRegisterForm()
  }

  createRegisterForm()
  {
    this.registerForm=this.formBuilder.group({
      userName:["",Validators.required],
      password:["",[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:["",Validators.required]
    },{
      validators:this.passwordMatchValidators
    });
  }

  passwordMatchValidators(g:FormGroup){
    return g.get('password').value===g.get('confirmPassword').value?null:{mismatch:true};
  }

  register()
  {
    if(this.registerForm.valid)
    {
      this.registerUser=Object.assign({},this.registerForm.value)
      this.authService.register(this.registerUser)
      this.alertifyService.succes("Kayıt Başarılı");

    }
  }

}
