package com.delaroystudios.fragrancecart;

import android.content.ComponentName;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.preference.Preference;
import android.preference.PreferenceManager;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.delaroystudios.fragrancecart.First_slider.PrefManager;
import com.delaroystudios.fragrancecart.First_slider.WelcomeActivity;

public class Splash extends AppCompatActivity {
    ConnectionDetector cd;
    CoordinatorLayout coordinatorLayout;
    ProgressBar progressBar;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        // Initialize coordinator layout
        coordinatorLayout = (CoordinatorLayout) findViewById(R.id.coordinator_layout);
        progressBar = (ProgressBar) findViewById(R.id.splash_progress);

        // Get shared
        gettokentouser();

        // Check Internet Class
        cd = new ConnectionDetector(this);

        // Splash After Check InterNet Connection
        if (cd.isConnected()) {
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {

                    if (gettokentouser()) {
                        Intent in = new Intent(Splash.this, HomeActivity.class);
                        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        startActivity(in);
                    } else {
                        Intent in = new Intent(Splash.this, WelcomeActivity.class);
                        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                        startActivity(in);
                        finish();
                    }

                }
            }, 3000);
        } else {
            // Function ckeck internet with snack bar
            snakbar();
        }


    }

    // No Internet Connection
    public void snakbar() {
        Snackbar.make(coordinatorLayout, "No Internet Connection", Snackbar.LENGTH_INDEFINITE)
                .setAction("Retry", new View.OnClickListener() {

                    // Handle the Retry Button Click
                    @Override
                    public void onClick(View v) {
                        progressBar.setVisibility(View.VISIBLE);
                        new Handler().postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                Intent in = new Intent(getBaseContext(), Splash.class);
                                in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                                startActivity(in);
                                finish();
                            }
                        }, 3000);

                    }
                })
                .setActionTextColor(getResources().getColor(R.color.whitebluecolo))
                .show();

    }

    // Shard Function
    public boolean gettokentouser() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        return !token.equals("");
    }

}

