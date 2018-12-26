package com.delaroystudios.fragrancecart.Fragments;



import android.content.Intent;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;


import com.delaroystudios.fragrancecart.HomeActivity;
import com.delaroystudios.fragrancecart.R;


public class OffersFragment extends Fragment {
    View v;

    public OffersFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_offers, container, false);

        return v;
    }
}
