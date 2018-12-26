package com.delaroystudios.fragrancecart.Fragments;


import android.content.Intent;
import android.content.res.Configuration;
import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.delaroystudios.fragrancecart.HomeAdapterlist;
import com.delaroystudios.fragrancecart.HomeProduct;
import com.delaroystudios.fragrancecart.HomeRecyclerViewAdapter;
import com.delaroystudios.fragrancecart.ProductsActivity;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.Search;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hp on 10/24/2018.
 */

/**
 * A simple {@link Fragment} subclass.
 */

public class HomeFragment extends Fragment implements View.OnClickListener {

    View v;
    RecyclerView homerecyclerView;
    HomeAdapterlist homeAdapterlist;
    Button product;
    Button search;
    List<HomeProduct> data;
    private static final String TAG = "HomeActivity";


    public HomeFragment() {

    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_home, container, false);

        // Show my items by recycler view
        homerecyclerView = v.findViewById(R.id.home_recyclerView);
        homerecyclerView.setHasFixedSize(true);

        LinearLayoutManager layoutManager = null;
        layoutManager = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
        homerecyclerView.setLayoutManager(layoutManager);
        homeAdapterlist = new HomeAdapterlist(getContext(), data);
        homerecyclerView.setAdapter(homeAdapterlist);

        // Button Initialize
        product = (Button) v.findViewById(R.id.home_myrequesties_btn);
        product.setOnClickListener(this);

        search = (Button) v.findViewById(R.id.home_search_edt);
        search.setOnClickListener(this);

        return v;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d(TAG, "initImageBitmaps: preparing bitmaps.");


        data = new ArrayList<>();
        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Cool", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 100, "Good Type of koki", "Koki", 100,
                "This Good Product", 4, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Wowww", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 15, "Good Type of koki", "Koki", 10,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falaor", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 20, "Good Type of koki", "Koki", 20,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new HomeProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


    }


//    @RequiresApi(api = Build.VERSION_CODES.M)
//    @Nullable
//    @Override
//    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, Bundle savedInstanceState) {
//        v = inflater.inflate(R.layout.fragment_home, container, false);
//
//        // RecyclerView
//        LinearLayoutManager layoutManager = null;
//        layoutManager = new LinearLayoutManager(getContext(), LinearLayoutManager.HORIZONTAL, false);
//        RecyclerView recyclerView = v.findViewById(R.id.home_recyclerView);
//        recyclerView.setLayoutManager(layoutManager);
//        adapter = new HomeRecyclerViewAdapter(getContext(), mNames, mImageUrls, mImageIcon, mTextPrice);
//        recyclerView.setAdapter(adapter);
//
//        // Button Initialize
//        product = (Button) v.findViewById(R.id.home_myrequesties_btn);
//        product.setOnClickListener(this);
//
//        search = (Button) v.findViewById(R.id.home_search_edt);
//        search.setOnClickListener(this);
//
//
//        return v;
//    }
//
//    @Override
//    public void onCreate(@Nullable Bundle savedInstanceState) {
//
//
//        Log.d(TAG, "initImageBitmaps: preparing bitmaps.");
//
//        mImageUrls.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//        mNames.add("Havasu Falls");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//
//        mImageUrls.add("https://i.redd.it/tpsnoz5bzo501.jpg");
//        mNames.add("Trondheim");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        mImageUrls.add("https://i.redd.it/qn7f9oqu7o501.jpg");
//        mNames.add("Portugal");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        mImageUrls.add("https://i.redd.it/j6myfqglup501.jpg");
//        mNames.add("Rocky Mountain National Park");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//
//        mImageUrls.add("https://i.redd.it/0h2gm1ix6p501.jpg");
//        mNames.add("Mahahual");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        mImageUrls.add("https://i.redd.it/k98uzl68eh501.jpg");
//        mNames.add("Frozen Lake");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//
//        mImageUrls.add("https://i.redd.it/glin0nwndo501.jpg");
//        mNames.add("White Sands Desert");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        mImageUrls.add("https://i.redd.it/obx4zydshg601.jpg");
//        mNames.add("Austrailia");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        mImageUrls.add("https://i.imgur.com/ZcLLrkY.jpg");
//        mNames.add("Washington");
//        mTextPrice.add("100");
//        mImageIcon.add("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//
//        super.onCreate(savedInstanceState);
//    }

    @Override
    public void onClick(View view) {
        if (view == product) {
            Intent in = new Intent(getActivity(), ProductsActivity.class);
            startActivity(in);

        }
        if (view == search) {
//            Fragment fragment = new SearchFragment();
//            getActivity().getSupportFragmentManager().beginTransaction()
//                    .replace(R.id.main_frame, fragment).
//                    commit();

            Intent in = new Intent(getContext(), Search.class);
            startActivity(in);

        }
    }
}
