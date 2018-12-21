package com.delaroystudios.fragrancecart.ProductsFragments;


import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.content.res.Configuration;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import android.support.design.widget.BottomSheetBehavior;
import android.support.v4.app.Fragment;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;

import com.delaroystudios.fragrancecart.HomeActivity;
import com.delaroystudios.fragrancecart.MeatAdapter;
import com.delaroystudios.fragrancecart.MeatProduct;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import java.util.ArrayList;
import java.util.List;

import static android.content.ContentValues.TAG;

/**
 * A simple {@link Fragment} subclass.
 */
public class MeatFragment extends Fragment implements View.OnClickListener {

    View v;
    private RecyclerView meatRecyclerView;
    MeatAdapter meatAdapter;
    LinearLayoutManager manager;
    int iD, currentItems, totalItems, scrollOutItems;
    Boolean isScrolling = false;
    private static final int CLEANER_LOADER = 0;
    FragranceDbHelper fragranceDbHelper;
    private SQLiteDatabase mDb;
    final ContentValues wishValues = new ContentValues();
    ContentResolver mContentResolver;
    Cursor cursor;
    List<MeatProduct> data;
    private BottomSheetBehavior mbottomSheetBehavior;
    Button openbootomsheet, back, filterPrice, filterType, filterQuantity, close, cancel;
    LinearLayout slidePriceLinear, sildeQuantityLinear, listTypeLinear;
    TextView textSeekBar, textseekbarquntity;
    SeekBar seekBar, seekbarquntity;
    ProgressBar progressBar, progressBarquntity, endLessProgress;


    public MeatFragment() {
        // Required empty public constructor
    }


    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_meat, container, false);
        //Progress Bar Endless progressBar
        endLessProgress = (ProgressBar) v.findViewById(R.id.meat_progress);
        manager = new GridLayoutManager(getContext(), 2);

        // Show my items by recycler view
        meatRecyclerView = v.findViewById(R.id.meat_recyclerview);
        meatRecyclerView.setHasFixedSize(true);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            meatRecyclerView.setLayoutManager(manager);
        } else {
            meatRecyclerView.setLayoutManager(new GridLayoutManager(getContext(), 4));
        }
        meatAdapter = new MeatAdapter(getContext(), data);
        meatRecyclerView.setAdapter(meatAdapter);
        meatRecyclerView.setLayoutManager(manager);

        //Endless recyclerView
        meatRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrollStateChanged(RecyclerView recyclerView, int newState) {
                super.onScrollStateChanged(recyclerView, newState);
                if (newState == AbsListView.OnScrollListener.SCROLL_STATE_TOUCH_SCROLL) {
                    isScrolling = true;
                }
            }

            @Override
            public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
                currentItems = manager.getChildCount();
                totalItems = manager.getItemCount();
                scrollOutItems = manager.findFirstVisibleItemPosition();

                if (isScrolling && (currentItems + scrollOutItems == totalItems)) {
                    isScrolling = false;
                    fechData();
                }
            }
        });


        // BottomSheet
        openbootomsheet = (Button) v.findViewById(R.id.meat_opensheet_btn);
        openbootomsheet.setOnClickListener(this);
        // Button back
        back = (Button) v.findViewById(R.id.meat_back_btn);
        back.setOnClickListener(this);

        // Filter Buttons
        filterPrice = (Button) v.findViewById(R.id.meat_price_btn);
        filterPrice.setOnClickListener(this);
        filterType = (Button) v.findViewById(R.id.meat_type_btn);
        filterType.setOnClickListener(this);
        filterQuantity = (Button) v.findViewById(R.id.meat_quantity_btn);
        filterQuantity.setOnClickListener(this);

        //close bottom sheet
        close = (Button) v.findViewById(R.id.meat_closesheet_btn);
        close.setOnClickListener(this);

        cancel = (Button) v.findViewById(R.id.meat_cancel_btn);
        cancel.setOnClickListener(this);

        // LinearLayouts
        slidePriceLinear = (LinearLayout) v.findViewById(R.id.meat_slide_price_linear);
        sildeQuantityLinear = (LinearLayout) v.findViewById(R.id.meat_slide_quantity_linear);
        listTypeLinear = (LinearLayout) v.findViewById(R.id.meat_list_type_linear);

        // SeekBar initialize
        textSeekBar = (TextView) v.findViewById(R.id.meat_seekbar_tv);
        seekBar = (SeekBar) v.findViewById(R.id.meat_seekbar);
        progressBar = (ProgressBar) v.findViewById(R.id.meat_progressbar);

        textseekbarquntity = (TextView) v.findViewById(R.id.meat_seekbar_quantity__tv);
        seekbarquntity = (SeekBar) v.findViewById(R.id.meat_quantity_seekbar);
        progressBarquntity = (ProgressBar) v.findViewById(R.id.meat_quantity_progressbar);

        // Seekbar for price
        seekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                String test = String.valueOf(progress);
                progressBar.setProgress(Integer.parseInt(test));
                textSeekBar.setText(test);

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });

        // Seekbar for quantity
        seekbarquntity.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                String testquntity = String.valueOf(progress);
                progressBarquntity.setProgress(Integer.parseInt(testquntity));
                textseekbarquntity.setText(testquntity);

            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {

            }

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {

            }
        });


        return v;
    }

    private void fechData() {
        endLessProgress.setVisibility(View.VISIBLE);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    data.add(new MeatProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                            "", 10, "Good Type of koki", "Koki", 10,
                            "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                            16, "Koki", "Egypt"));
                    meatAdapter.notifyDataSetChanged();
                    endLessProgress.setVisibility(View.GONE);
                }
            }
        }, 5000);
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Log.d(TAG, "initImageBitmaps: preparing bitmaps.");


        data = new ArrayList<>();
        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Cool", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 100, "Good Type of koki", "Koki", 100,
                "This Good Product", 4, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Wowww", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 15, "Good Type of koki", "Koki", 10,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falaor", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 20, "Good Type of koki", "Koki", 20,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new MeatProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


    }

    @Override
    public void onClick(View v) {
        View bottomSheet = getView().findViewById(R.id.meat_bottom_sheettoww);
        mbottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);
        slidePriceLinear.setVisibility(View.VISIBLE);
        filterPrice.setBackgroundColor(getResources().getColor(R.color.white));


        if (v == openbootomsheet) {
            mbottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);

        }
        if (v == back) {
            Intent in = new Intent(getContext(), HomeActivity.class);
            in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            startActivity(in);
        }
        if (v == filterPrice) {
            slidePriceLinear.setVisibility(View.VISIBLE);
            sildeQuantityLinear.setVisibility(View.GONE);
            listTypeLinear.setVisibility(View.GONE);
            filterPrice.setBackgroundColor(getResources().getColor(R.color.white));
            filterQuantity.setBackgroundColor(getResources().getColor(R.color.colorLine));
            filterType.setBackgroundColor(getResources().getColor(R.color.colorLine));
        }
        if (v == filterQuantity) {
            sildeQuantityLinear.setVisibility(View.VISIBLE);
            slidePriceLinear.setVisibility(View.GONE);
            listTypeLinear.setVisibility(View.GONE);
            filterQuantity.setBackgroundColor(getResources().getColor(R.color.white));
            filterPrice.setBackgroundColor(getResources().getColor(R.color.colorLine));
            filterType.setBackgroundColor(getResources().getColor(R.color.colorLine));

        }
        if (v == filterType) {
            listTypeLinear.setVisibility(View.VISIBLE);
            sildeQuantityLinear.setVisibility(View.GONE);
            slidePriceLinear.setVisibility(View.GONE);
            filterType.setBackgroundColor(getResources().getColor(R.color.white));
            filterQuantity.setBackgroundColor(getResources().getColor(R.color.colorLine));
            filterPrice.setBackgroundColor(getResources().getColor(R.color.colorLine));
        }
        if (v == close) {
            mbottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
            filterPrice.setBackgroundColor(getResources().getColor(R.color.white));
            filterType.setBackgroundColor(getResources().getColor(R.color.colorLine));
            filterQuantity.setBackgroundColor(getResources().getColor(R.color.colorLine));
        }
        if (v == cancel) {
            mbottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED);
            filterPrice.setBackgroundColor(getResources().getColor(R.color.white));
            filterType.setBackgroundColor(getResources().getColor(R.color.colorLine));
            filterQuantity.setBackgroundColor(getResources().getColor(R.color.colorLine));
        }
    }
}
