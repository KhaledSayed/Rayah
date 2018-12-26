package com.delaroystudios.fragrancecart.Interfaces.ApiLogin;

import com.google.gson.annotations.SerializedName;

/**
 * Created by hp on 12/13/2018.
 */

public class UserVM {

    String id;
    String email;
    String name;
    String phone;
    Role role ;

    public enum Role {
        @SerializedName("Admin") Admin ,
        @SerializedName("User") User ,

    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }


    public UserVM() {
    }


    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
