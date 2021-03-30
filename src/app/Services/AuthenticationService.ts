import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule, /* other http imports */ } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import * as CryptoJS from "crypto-js";
import { CryptoSecret } from '../../../config';
import 'rxjs/add/operator/map'

const URL="http://localhost:3002"


const httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'my-auth-token',
      "Access-Control-Allow-Headers":"origin, content-type, accept",
      "Access-Control-Allow-Origin":"*",
    })
  };

@Injectable()
export class AuthenticationService {
    
    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        let pass= this.encryptUsingAES256(password)
        console.log("PAss",pass)
        let body={
            "email":email,
            "password":password
        }

        console.log("Login",body)
        return this.http.post<any>(URL+'/admin/login',body)
        
            .map(admin => {
                
                console.log("login admin",admin)
                if (admin) {
                    localStorage.setItem('currentAdmin', JSON.stringify(admin.data));
                    localStorage.setItem('Token', JSON.stringify(admin.data.token));
                }

                return admin;
            });
    }

    forgot(email: string) {
      let body={
          "email":email,
      }

      console.log("Login",body)
      return this.http.post<any>(URL+'/admin/forgot',body)
      
          .map(admin => {
              console.log("login admin",admin)
              return admin;
          });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentAdmin');
        localStorage.removeItem('Token');
    }
    encryptUsingAES256(pass) {
        let _key = CryptoJS.enc.Hex.parse(CryptoSecret);
        let _iv = CryptoJS.enc.Hex.parse(pass);
        let request="";
        let encrypted = CryptoJS.AES.encrypt(JSON.stringify(request), _key, {
          keySize: 16,
          iv: _iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        });
        encrypted = encrypted.toString();
        return encrypted;
      }
}