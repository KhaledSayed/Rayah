package com.delaroystudios.fragrancecart;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.Patterns;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.delaroystudios.fragrancecart.API.ApiClient;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.LoginParam;
import com.delaroystudios.fragrancecart.Interfaces.ApiLogin.LoginResponseVM;
import com.delaroystudios.fragrancecart.Interfaces.ApiRegister.RegisterParam;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    Button register;
    ImageView imageView;
    String pathTofile;
    TextView login_tv, skip;
    EditText userName, userEmail, userPhone, userPass;
    public static final String TAG = "RegisterActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        // Set Activity Title
        setTitle("Register");
        // Initialize Design
        InitalizeUI();
        //Register And Make Validation
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Get User Information
                String name = userName.getText().toString();
                String email = userEmail.getText().toString();
                String phone = userPhone.getText().toString();
                String password = userPass.getText().toString();
                if (name.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter Your Name", Toast.LENGTH_SHORT).show();
//                } else if (!Patterns.DOMAIN_NAME.matcher(name).matches()) {
//                    Toast.makeText(getBaseContext(), "Please Enter valid Name", Toast.LENGTH_SHORT).show();
                } else if (email.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter Your Email", Toast.LENGTH_SHORT).show();
                } else if (!Patterns.EMAIL_ADDRESS.matcher(email).matches()) {
                    Toast.makeText(RegisterActivity.this, "Please Enter Valid Email", Toast.LENGTH_SHORT).show();
                } else if (phone.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter Your Phone", Toast.LENGTH_SHORT).show();
                } else if (!(phone.length() == 12)) {
                    Toast.makeText(getBaseContext(), "Please Enter Valid Phone", Toast.LENGTH_SHORT).show();
                } else if (!(phone.startsWith(String.valueOf(201)))) {
                    Toast.makeText(RegisterActivity.this, "Please Enter Valid Phone", Toast.LENGTH_SHORT).show();
                } else if (!Patterns.PHONE.matcher(phone).matches()) {
                    Toast.makeText(getBaseContext(), "Please Enter Valid Phone", Toast.LENGTH_SHORT).show();
                } else if (password.equals("")) {
                    Toast.makeText(getBaseContext(), "Please Enter your Password", Toast.LENGTH_SHORT).show();
                } else if (!(password.length() == 6)) {
                    Toast.makeText(getBaseContext(), "Your Password Must be Equal 6", Toast.LENGTH_SHORT).show();
                } else if (!userName.equals("") && !userEmail.equals("") && !userPhone.equals("") && !userPass.equals("")) {
//                    Toast.makeText(getBaseContext(), "Success", Toast.LENGTH_SHORT).show();
                    // Make API
                    RegisterParam user = new RegisterParam();
                    user.setName(name);
                    user.setEmail(email);
                    user.setPassword(password);
                    user.setPhone(phone);
                    Call<ResponseBody> call = ApiClient.getInstance()
                            .getApi()
                            .createUser(user);

                    call.enqueue(new Callback<ResponseBody>() {
                        @Override
                        public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                            Log.i(TAG, "onResponse " + response.toString());
                            if (response.code() == 400) {
                                Toast.makeText(RegisterActivity.this, "This Email Existed", Toast.LENGTH_SHORT).show();
                            } else if (response.code() == 201) {
                                //success
                                LoginParam user = new LoginParam();
                                user.setEmail(user.getEmail());
                                user.setPassword(user.getPassword());

                                Call<LoginResponseVM> call2 = ApiClient.getInstance().getApiLogin().loginUser(user);

                                call2.enqueue(new Callback<LoginResponseVM>() {
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


                            }
                        }

                        @Override
                        public void onFailure(Call<ResponseBody> call, Throwable t) {
                            Log.i(TAG, "onFailure " + t.getMessage());
                            try {
                                Response<ResponseBody> response = call.execute();
                                Log.i(TAG, "onFailure: " + response.errorBody());
                                Log.i(TAG, "onFailure: " + response.code());
                                Log.i(TAG, "onFailure: " + response.body());
                                Log.i(TAG, "onFailure: " + response.message());


                            } catch (IOException e) {
                                e.printStackTrace();
                            }

                        }
                    });

                } else {
                    Toast.makeText(getBaseContext(), "Failed", Toast.LENGTH_SHORT).show();
                }

            }
        });

        // Navigation To HOme Activity
        skip.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent in = new Intent(RegisterActivity.this, HomeActivity.class);
                in.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                startActivity(in);
            }
        });

        // Navigation to Login Activity
        login_tv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent in = new Intent(RegisterActivity.this, com.delaroystudios.fragrancecart.LoginActivity.class);
                startActivity(in);
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
        Intent in = new Intent(this, com.delaroystudios.fragrancecart.LoginActivity.class);
        startActivity(in);
        finish();
    }

    // Function navigation to home activity
    public void goToHome() {
        Intent in = new Intent(RegisterActivity.this, HomeActivity.class);
        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(in);
    }


    // Function To Initialize UI Design
    public void InitalizeUI() {
        login_tv = (TextView) findViewById(R.id.login_tv);
        skip = (TextView) findViewById(R.id.skip_btn);
        userName = (EditText) findViewById(R.id.userName_edt);
        userEmail = (EditText) findViewById(R.id.userEmail_edt);
        userPhone = (EditText) findViewById(R.id.userPhone_edt);
        userPass = (EditText) findViewById(R.id.userPass_edt);
        register = (Button) findViewById(R.id.register_btn);
    }
}












