package com.delaroystudios.fragrancecart.API.models.order;

import com.delaroystudios.fragrancecart.API.models.order.Basket;

import java.util.List;

public class OrderPostParams {

    List<Basket> basket ;

    String coupon ;

    String address ;

    public List<Basket> getBasket() {
        return basket;
    }

    public void setBasket(List<Basket> basket) {
        this.basket = basket;
    }

    public String getCoupon() {
        return coupon;
    }

    public void setCoupon(String coupon) {
        this.coupon = coupon;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
