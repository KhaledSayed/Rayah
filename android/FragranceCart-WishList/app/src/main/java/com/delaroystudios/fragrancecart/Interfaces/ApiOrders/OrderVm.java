package com.delaroystudios.fragrancecart.Interfaces.ApiOrders;

import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.UserVM;

/**
 * Created by hp on 12/13/2018.
 */

 class OrderProduct{
    ProductVm id;
    int quantity;
}
public class OrderVm {

    String id;
    UserVM user;
    String status;


}
