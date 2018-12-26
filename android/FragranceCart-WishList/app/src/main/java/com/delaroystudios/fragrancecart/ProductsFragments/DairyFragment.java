package com.delaroystudios.fragrancecart.ProductsFragments;


import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
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

import com.delaroystudios.fragrancecart.DairyAdapter;
import com.delaroystudios.fragrancecart.DairyProduct;
import com.delaroystudios.fragrancecart.HomeActivity;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import java.util.ArrayList;
import java.util.List;

import static android.content.ContentValues.TAG;

/**
 * A simple {@link Fragment} subclass.
 */
public class DairyFragment extends Fragment implements View.OnClickListener {

    View v;
    private RecyclerView dairyRecyclerView;
    DairyAdapter dairyAdapter;
    private static final int CLEANER_LOADER = 0;
    FragranceDbHelper fragranceDbHelper;
    LinearLayoutManager manager;
    int iD, currentItems, totalItems, scrollOutItems;
    Boolean isScrolling = false;
    private SQLiteDatabase mDb;
    final ContentValues wishValues = new ContentValues();
    ContentResolver mContentResolver;
    Cursor cursor;
    List<DairyProduct> data;
    private BottomSheetBehavior mbottomSheetBehavior;
    Button openbootomsheet, back, filterPrice, filterType, filterQuantity, close, cancel;
    LinearLayout slidePriceLinear, sildeQuantityLinear, listTypeLinear;
    TextView textSeekBar, textseekbarquntity;
    SeekBar seekBar, seekbarquntity;
    ProgressBar progressBar, progressBarquntity, endLessProgress;


    public DairyFragment() {
        // Required empty public constructor
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_dairy, container, false);
        //Progress Bar Endless progressBar
        endLessProgress = (ProgressBar) v.findViewById(R.id.dairy_progress);
        manager = new GridLayoutManager(getContext(), 2);
        // Show my items by recycler view
        dairyRecyclerView = v.findViewById(R.id.dairy_recyclerview);
        dairyRecyclerView.setHasFixedSize(true);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            dairyRecyclerView.setLayoutManager(manager);
        } else {
            dairyRecyclerView.setLayoutManager(new GridLayoutManager(getContext(), 4));
        }
//        dairyAdapter = new DairyAdapter(getContext(), data);
        dairyRecyclerView.setAdapter(dairyAdapter);
        dairyRecyclerView.setLayoutManager(manager);

        //Endless recyclerView
        dairyRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
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
        openbootomsheet = (Button) v.findViewById(R.id.dairy_opensheet_btn);
        openbootomsheet.setOnClickListener(this);
        // Button back
        back = (Button) v.findViewById(R.id.dairy_back_btn);
        back.setOnClickListener(this);

        // Filter Buttons
        filterPrice = (Button) v.findViewById(R.id.dairy_price_btn);
        filterPrice.setOnClickListener(this);
        filterType = (Button) v.findViewById(R.id.dairy_type_btn);
        filterType.setOnClickListener(this);
        filterQuantity = (Button) v.findViewById(R.id.dairy_quantity_btn);
        filterQuantity.setOnClickListener(this);

        //close bottom sheet
        close = (Button) v.findViewById(R.id.dairy_closesheet_btn);
        close.setOnClickListener(this);

        cancel = (Button) v.findViewById(R.id.dairy_cancel_btn);
        cancel.setOnClickListener(this);

        // LinearLayouts
        slidePriceLinear = (LinearLayout) v.findViewById(R.id.dairy_slide_price_linear);
        sildeQuantityLinear = (LinearLayout) v.findViewById(R.id.dairy_slide_quantity_linear);
        listTypeLinear = (LinearLayout) v.findViewById(R.id.dairy_list_type_linear);

        // SeekBar initialize
        textSeekBar = (TextView) v.findViewById(R.id.dairy_seekbar_tv);
        seekBar = (SeekBar) v.findViewById(R.id.dairy_seekbar);
        progressBar = (ProgressBar) v.findViewById(R.id.dairy_progressbar);

        textseekbarquntity = (TextView) v.findViewById(R.id.dairy_seekbar_quantity__tv);
        seekbarquntity = (SeekBar) v.findViewById(R.id.dairy_quantity_seekbar);
        progressBarquntity = (ProgressBar) v.findViewById(R.id.dairy_quantity_progressbar);


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
                    data.add(new DairyProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                            "", 10, "Good Type of koki", "Koki", 10,
                            "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                            16, "Koki", "Egypt"));
                    dairyAdapter.notifyDataSetChanged();
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
        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Cool", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 100, "Good Type of koki", "Koki", 100,
                "This Good Product", 4, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Wowww", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 15, "Good Type of koki", "Koki", 10,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falaor", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 20, "Good Type of koki", "Koki", 20,
                "This Good Product", 5, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        data.add(new DairyProduct("Havasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


    }

    @Override
    public void onClick(View v) {
        View bottomSheet = getView().findViewById(R.id.dairy_bottom_sheettoww);
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
