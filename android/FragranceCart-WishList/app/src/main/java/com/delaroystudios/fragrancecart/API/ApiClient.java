package com.delaroystudios.fragrancecart.API;

import com.delaroystudios.fragrancecart.API.api.OrderClient;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ApiCleanerProduct;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.ApiLogin;
import com.delaroystudios.fragrancecart.Interfaces.ApiRegister.ApiInterFace;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * Created by hp on 11/28/2018.
 */

public class ApiClient {
    public static final String BASE_URL = "http://192.168.1.104:8080/api/";
    private static ApiClient mInstance;
    public static Retrofit retrofit;


    private ApiClient() {
        HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
        interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient okHttpClient = new OkHttpClient().newBuilder().addInterceptor(interceptor).build();

        if (retrofit == null) {
            retrofit = new Retrofit.Builder().baseUrl(BASE_URL)
                    .client(okHttpClient)
                    .addConverterFactory(GsonConverterFactory.create()).build();
        }
    }

    public static synchronized ApiClient getInstance() {
        if (mInstance == null) {
            mInstance = new ApiClient();
        }
        return mInstance;
    }

    public ApiInterFace getApi() {
        return retrofit.create(ApiInterFace.class);
    }

    public ApiLogin getApiLogin() {
        return retrofit.create(ApiLogin.class);
    }

    public ApiCleanerProduct getApiCleanerProduct() {
        return retrofit.create(ApiCleanerProduct.class);
    }


    public OrderClient getOrderClient() {
        return retrofit.create(OrderClient.class);
    }


}
