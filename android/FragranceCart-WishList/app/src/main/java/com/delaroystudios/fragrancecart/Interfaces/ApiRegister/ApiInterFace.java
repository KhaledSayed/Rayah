package com.delaroystudios.fragrancecart.Interfaces.ApiRegister;

import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.CategoryVm;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;

/**
 * Created by hp on 11/28/2018.
 */

public interface ApiInterFace {

    @POST("users/register")
    retrofit2.Call<ResponseBody> createUser(
            @Body RegisterParam body
    );


    @GET("categories")
    Call<List<CategoryVm>> getCategories();

}
