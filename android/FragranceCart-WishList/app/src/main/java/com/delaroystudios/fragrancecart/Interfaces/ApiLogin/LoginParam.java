package com.delaroystudios.fragrancecart.Interfaces.ApiLogin;

/**
 * Created by hp on 12/13/2018.
 */

public class LoginParam {
    String email;
    String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LoginParam() {
    }
}
