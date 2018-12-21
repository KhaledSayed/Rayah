package com.delaroystudios.fragrancecart.API.models.order;

import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.UserVM;

import java.util.List;

public class OrderVm {
    String createdAt ;
    String updatedAt ;
    UserVM user ;
    String status ;
    List<BasketVm> basket ;
    String address ;

    public List<BasketVm> getBasket() {
        return basket;
    }

    public void setBasket(List<BasketVm> basket) {
        this.basket = basket;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserVM getUser() {
        return user;
    }

    public void setUser(UserVM user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
