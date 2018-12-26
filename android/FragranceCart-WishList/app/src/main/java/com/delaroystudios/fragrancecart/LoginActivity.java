package com.delaroystudios.fragrancecart;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.delaroystudios.fragrancecart.API.ApiClient;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.LoginParam;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.LoginResponseVM;
import com.google.android.gms.common.api.Response;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;

public class LoginActivity extends AppCompatActivity {
    TextView signup_tv, skip, forgetPass;
    EditText userEmail, userPass;
    Button login;
    public static final String TAG = "LoginActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        // Set Activity Title
        setTitle("LogIn");
        // Initialize Design
        InitalizeUI();
        // User login And Make Validation
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get User Information
                String email = userEmail.getText().toString();
                String password = userPass.getText().toString();
                if (email.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter Your Email", Toast.LENGTH_SHORT).show();
                } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    Toast.makeText(getBaseContext(), "Please Enter Valid Email", Toast.LENGTH_SHORT).show();
                } else if (password.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter Your Password", Toast.LENGTH_SHORT).show();
                } else if (!(password.length() == 6)) {
                    Toast.makeText(LoginActivity.this, "Your Password Must be Equal 6", Toast.LENGTH_SHORT).show();
                } else if (!email.equals("") && !password.equals("")) {
//                    Toast.makeText(getBaseContext(), "Success", Toast.LENGTH_SHORT).show();
                    // Make API
                    LoginParam user = new LoginParam();
                    user.setEmail(email);
                    user.setPassword(password);

                    Call<LoginResponseVM> call = ApiClient.getInstance().getApiLogin().loginUser(user);

                    call.enqueue(new Callback<LoginResponseVM>() {
                        @Override
                        public void onResponse(Call<LoginResponseVM> call, retrofit2.Response<LoginResponseVM> response) {
                            Log.i(TAG, "onResponselogin: " + " Success");
                            if (response.isSuccessful()) {
                                Log.e(TAG, "onResponse: " + response.body().getToken());
                                // Save User Token
                                SharedPreferences.Editor editor = getSharedPreferences("userToken", MODE_PRIVATE).edit();
                                editor.putString("Token", response.body().getToken());
                                editor.apply();
                                // Function navigation to home
                                goToHome();

                            } else {
                                Log.e(TAG, response.message());

                            }
                        }

                        @Override
                        public void onFailure(Call<LoginResponseVM> call, Throwable t) {
                            Log.i(TAG, "onFailurelogin: " + t.toString());
                        }
                    });

                } else {
                    Toast.makeText(getBaseContext(), "Failed", Toast.LENGTH_SHORT).show();
                }
            }
        });


        // Navigation to Home Activeity
        skip.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in = new Intent(LoginActivity.this, HomeActivity.class);
                in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(in);
            }
        });

        // Navigation to Register Activity
        signup_tv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(in);
            }
        });
        forgetPass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(LoginActivity.this, "Forget Password", Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        finish();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent in = new Intent(getApplicationContext(), HomeActivity.class);
        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(in);
    }
    // Function navigation to home activity
    public void goToHome() {
        Intent in = new Intent(LoginActivity.this, HomeActivity.class);
        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(in);
    }

    public void InitalizeUI() {
        signup_tv = (TextView) findViewById(R.id.signup_tv);
        skip = (TextView) findViewById(R.id.skip_btn);
        userEmail = (EditText) findViewById(R.id.login_userEmail_edt);
        userPass = (EditText) findViewById(R.id.login_userPassword_edt);
        login = (Button) findViewById(R.id.login_user_btn);
        forgetPass = (TextView) findViewById(R.id.forgetpass_tv);
    }
}
