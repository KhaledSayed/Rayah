package com.delaroystudios.fragrancecart.Fragments;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;

import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.Second_Fragment.Home_Canned;
import com.delaroystudios.fragrancecart.Second_Fragment.ProductsFragment;
import com.delaroystudios.fragrancecart.Second_Fragment.Home_Dairy;
import com.delaroystudios.fragrancecart.Second_Fragment.Home_Meat;

/**
 * A simple {@link Fragment} subclass.
 */
public class SectionsFragment extends Fragment implements View.OnClickListener {

    View v;
    Button cleanerSection, dairySection, meatSection, cannedSection;

    public SectionsFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_sections, container, false);
        // Initialize Buttons
        cleanerSection = (Button) v.findViewById(R.id.cleaner_section_btn);
        cleanerSection.setOnClickListener(this);
        dairySection = (Button) v.findViewById(R.id.dairy_section_btn);
        dairySection.setOnClickListener(this);
        meatSection = (Button) v.findViewById(R.id.meat_section_btn);
        meatSection.setOnClickListener(this);
        cannedSection = (Button) v.findViewById(R.id.canned_section_btn);
        cannedSection.setOnClickListener(this);
        return v;
    }

    @Override
    public void onClick(View v) {
        if (v == cleanerSection) {
            Fragment fragment = new ProductsFragment();
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.main_frame, fragment).
                    commit();

            Log.d("onClick","Products Fragment");
        }
        if (v == dairySection) {
            Fragment fragment = new Home_Dairy();
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.main_frame, fragment).
                    commit();

        }
        if (v == meatSection) {
            Fragment fragment = new Home_Meat();
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.main_frame, fragment).
                    commit();

        }
        if (v == cannedSection) {
            Fragment fragment = new Home_Canned();
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.main_frame, fragment).
                    commit();

        }
    }
}
