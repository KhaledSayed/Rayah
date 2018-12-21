package com.delaroystudios.fragrancecart.API.models.order;

import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;

public class BasketVm {

    ProductVm id ;
    int quantity ;

    public ProductVm getId() {
        return id;
    }

    public void setId(ProductVm id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
