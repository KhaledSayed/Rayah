package com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

/**
 * Created by hp on 12/13/2018.
 */

public interface ApicategoryProduct {

    @GET("http://192.168.1.4:8080/api/categories")
    Call<List<CategoryVm>> cleanerProduct(
            @Query("parent") String parent,
            @Query("perPage") String perPage,
            @Query("page") String page);
}
