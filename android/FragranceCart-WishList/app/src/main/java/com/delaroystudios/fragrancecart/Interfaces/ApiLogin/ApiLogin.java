package com.delaroystudios.fragrancecart.Interfaces.ApiLogin;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

/**
 * Created by hp on 12/13/2018.
 */

public interface ApiLogin {
    @POST("users/login")
    Call<LoginResponseVM> loginUser(
            @Body LoginParam body
    );
}
