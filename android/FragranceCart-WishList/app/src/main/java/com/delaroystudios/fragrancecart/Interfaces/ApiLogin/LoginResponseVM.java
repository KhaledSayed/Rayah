package com.delaroystudios.fragrancecart.Interfaces.ApiLogin;

/**
 * Created by hp on 12/13/2018.
 */

public class LoginResponseVM {

    String token;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserVM getUser() {
        return user;
    }

    public void setUser(UserVM user) {
        this.user = user;
    }

    UserVM user;

    public LoginResponseVM() {
    }
}
