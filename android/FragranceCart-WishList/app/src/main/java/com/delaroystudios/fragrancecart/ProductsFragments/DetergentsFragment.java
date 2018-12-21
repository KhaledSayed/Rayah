package com.delaroystudios.fragrancecart.ProductsFragments;


import android.app.Activity;


import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.database.Cursor;

import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;

import android.support.design.widget.BottomSheetBehavior;
import android.support.v4.app.Fragment;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.Loader;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.SeekBar;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.delaroystudios.fragrancecart.API.ApiClient;
import com.delaroystudios.fragrancecart.CleanerAdapter;
import com.delaroystudios.fragrancecart.CleanerProduct;
import com.delaroystudios.fragrancecart.DetailActivity;
import com.delaroystudios.fragrancecart.FragranceAdapter;
import com.delaroystudios.fragrancecart.HomeActivity;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.CategoryVm;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;
import com.delaroystudios.fragrancecart.ProductsDetails;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.data.Cleaner;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import java.lang.annotation.Annotation;
import java.util.ArrayList;
import java.util.List;


import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.Query;

import static android.support.constraint.Constraints.TAG;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CART_TABLE;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CLEANER_TABLE;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.COLUMN_WISH_NAME;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.COLUMN_WISH_PRICE;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.WISH_TABLE;

/**
 * A simple {@link Fragment} subclass.
 */
public class DetergentsFragment extends Fragment implements View.OnClickListener {

    ProductsDetails productsDetails;

    View v;
    private RecyclerView cleanerRecyclerView;
    CleanerAdapter cleanerAdapter;
    LinearLayoutManager manager;
    int iD, currentItems, totalItems, scrollOutItems;
    Boolean isScrolling = false;
    private static final int CLEANER_LOADER = 0;
    FragranceDbHelper fragranceDbHelper;
    private SQLiteDatabase mDb;
    ContentResolver mContentResolver;
    Cursor cursor;
    Call<List<ProductVm>> data;
    private BottomSheetBehavior mbottomSheetBehavior;
    Button openbootomsheet, back, filterPrice, filterType, filterQuantity, close, cancel;
    LinearLayout slidePriceLinear, sildeQuantityLinear, listTypeLinear;
    TextView textSeekBar, textseekbarquntity;
    SeekBar seekBar, seekbarquntity;
    ProgressBar progressBar, progressBarquntity, endLessProgress;
    private int mNotificationsCount = 0;

    public DetergentsFragment() {
        // Required empty public constructor
    }


    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_detergents, container, false);

        //Progress Bar Endless progressBar
        endLessProgress = (ProgressBar) v.findViewById(R.id.cleaner_progress);


        // BottomSheet
        openbootomsheet = (Button) v.findViewById(R.id.opensheet_btn);
        openbootomsheet.setOnClickListener(this);
        // Button back
        back = (Button) v.findViewById(R.id.back_btn);
        back.setOnClickListener(this);

        // Filter Buttons
        filterPrice = (Button) v.findViewById(R.id.cleaner_price_btn);
        filterPrice.setOnClickListener(this);
        filterType = (Button) v.findViewById(R.id.cleaner_type_btn);
        filterType.setOnClickListener(this);
        filterQuantity = (Button) v.findViewById(R.id.cleaner_quantity_btn);
        filterQuantity.setOnClickListener(this);

        //close bottom sheet
        close = (Button) v.findViewById(R.id.closesheet_btn);
        close.setOnClickListener(this);

        cancel = (Button) v.findViewById(R.id.cancel_btn);
        cancel.setOnClickListener(this);

        // LinearLayouts
        slidePriceLinear = (LinearLayout) v.findViewById(R.id.cleaner_slide_price_linear);
        sildeQuantityLinear = (LinearLayout) v.findViewById(R.id.cleaner_slide_quantity_linear);
        listTypeLinear = (LinearLayout) v.findViewById(R.id.cleaner_list_type_linear);

        // SeekBar initialize for price
        textSeekBar = (TextView) v.findViewById(R.id.cleaner_seekbar_tv);
        seekBar = (SeekBar) v.findViewById(R.id.cleaner_seekbar);
        progressBar = (ProgressBar) v.findViewById(R.id.progressbar);
        // SeekBar initialize for quantity
        textseekbarquntity = (TextView) v.findViewById(R.id.cleaner_seekbar_quantity__tv);
        seekbarquntity = (SeekBar) v.findViewById(R.id.cleaner_quantity_seekbar);
        progressBarquntity = (ProgressBar) v.findViewById(R.id.cleaner_quantity_progressbar);

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

    private void configerRecycler(List<ProductVm> products) {
        manager = new GridLayoutManager(getContext(), 2);
        // Show my items by recycler view
        cleanerRecyclerView = v.findViewById(R.id.cleaner_recyclerview);
        cleanerRecyclerView.setHasFixedSize(true);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            cleanerRecyclerView.setLayoutManager(manager);
        } else {
            cleanerRecyclerView.setLayoutManager(new GridLayoutManager(getContext(), 4));
        }
//        cleanerAdapter = new CleanerAdapter(getContext(), products);
        cleanerRecyclerView.setAdapter(cleanerAdapter);
        cleanerRecyclerView.setLayoutManager(manager);

        //Endless recyclerView
        cleanerRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
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

    }

    private void fechData() {
        endLessProgress.setVisibility(View.VISIBLE);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
//                    data.add(new CleanerProduct("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
//                            "", 10, "Good Type of koki", "Koki", 10,
//                            "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
//                            16, "Koki", "Egypt"));
                    cleanerAdapter.notifyDataSetChanged();
                    endLessProgress.setVisibility(View.GONE);
                }
            }
        }, 5000);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
//        // SQL Light
//        mContentResolver = getActivity().getContentResolver();
//        FragranceDbHelper dbHelper = new FragranceDbHelper(getActivity());
//        mDb = dbHelper.getWritableDatabase();
//
//////        ContentValues wishValues = new ContentValues();
//////
//////        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_NAME, "fragranceName");
//////        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_DESCRIPTION, "description");
//////        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_IMAGE, "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
//////        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_PRICE, 5);
//////        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_USERRATING, "3");
////
////        Log.i(TAG, "addValuesToCart: " + wishValues);
////
////        mContentResolver.insert(FragranceContract.FragranceEntry.CONTENT_URI_WISH, wishValues);
////
////        Toast.makeText(getContext(), "Successfully added to Wish",
////                Toast.LENGTH_SHORT).show();
////

        // Make Api

        List<String> categories = new ArrayList<>();
        data = ApiClient.getInstance().getApiCleanerProduct().cleanerProduct(false, "10000", "0", "10", "0", null);
        data.enqueue(new Callback<List<ProductVm>>() {
            @Override
            public void onResponse(Call<List<ProductVm>> call, Response<List<ProductVm>> response) {
                // Function

                if (response.isSuccessful()) {
                    Log.i(TAG, "onResponse: " + response.body().size());
                    configerRecycler(response.body());
                } else {
                    Log.i(TAG, "onResponse: " + " response failuire");
                }


            }

            @Override
            public void onFailure(Call<List<ProductVm>> call, Throwable t) {
                Log.i(TAG, "onFailure: " + t.getMessage());
            }
        });


    }

    @Override
    public void onCreateOptionsMenu(Menu menu, MenuInflater inflater) {
        super.onCreateOptionsMenu(menu, inflater);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_settings) {
            mbottomSheetBehavior.setState(BottomSheetBehavior.STATE_EXPANDED);
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onClick(View v) {

        View bottomSheet = getView().findViewById(R.id.bottom_sheettoww);
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

    //    @Override
//    public void onPause() {
//        super.onPause();
//        new FetchCountTask().execute();
//    }
    // Function Add Valuse To Cart Activity
    private void addValuesToCart() {

        ContentValues wishValues = new ContentValues();

        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_NAME, "fragranceName");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_DESCRIPTION, "description");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_IMAGE, "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_PRICE, "5");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_USERRATING, "5");

        Log.i(TAG, "addValuesToCart: " + wishValues);

        mContentResolver.insert(FragranceContract.FragranceEntry.CONTENT_URI_WISH, wishValues);

        Toast.makeText(getContext(), "Successfully added to Wish",
                Toast.LENGTH_SHORT).show();


    }

    // function add to wish
    public void addToWish() {
        addValuesToCart();

    }

//    private void updateNotificationsBadge(int count) {
//        mNotificationsCount = count;
//
//        // force the ActionBar to relayout its MenuItems.
//        // onCreateOptionsMenu(Menu) will be called again.
////        invalidateOptionsMenu();
//    }
//

//    /*
//Sample AsyncTask to fetch the notifications count
//*/
//    class FetchCountTask extends AsyncTask<Void, Void, Integer> {
//
//        @Override
//        protected Integer doInBackground(Void... params) {
//            String countQuery = "SELECT  * FROM " + WISH_TABLE;
//            Cursor cursor = mDb.rawQuery(countQuery, null);
//            int count = cursor.getCount();
//            cursor.close();
//            return count;
//
//        }
//
//        @Override
//        public void onPostExecute(Integer count) {
//            updateNotificationsBadge(count);
//        }
//    }

}
