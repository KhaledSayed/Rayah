package com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

/**
 * Created by hp on 12/13/2018.
 */

public interface ApiCleanerProduct {

    @GET("products")
    Call<List<ProductVm>> cleanerProduct(
            @Query("featured") boolean featured,
            @Query("maxPrice") String maxPrice,
            @Query("minPrice") String minPrice,
            @Query("perPage") String perPage,
            @Query("page") String page,
            @Query("searchQuery") String search,
            @Query("category")String... category
    );


    @GET("products/top")
    Call<List<ProductVm>> getTopProducts(
        @Header("Authorization") String authorization
    );



    @GET("categories")
    Call<List<CategoryVm>> getCategories(
            @Query("parent") String parent,
            @Query("perPage") String perPage,
            @Query("page") String page
    );


}
