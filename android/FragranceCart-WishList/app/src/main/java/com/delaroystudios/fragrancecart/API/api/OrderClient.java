package com.delaroystudios.fragrancecart.API.api;


import com.delaroystudios.fragrancecart.API.models.order.OrderPostParams;
import com.delaroystudios.fragrancecart.API.models.order.OrderVm;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.CategoryVm;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.HeaderMap;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface OrderClient {

    @GET("orders")
    Call<List<OrderVm>> getOrders(
            @Header("Authorization") String authorization
            ,
        List<String> status ,
        int perPage,
        int page
    );


    @POST("orders")
    Call<OrderVm> postOrder(
            @Header("Authorization") String authorization,
            @Body OrderPostParams order);


}