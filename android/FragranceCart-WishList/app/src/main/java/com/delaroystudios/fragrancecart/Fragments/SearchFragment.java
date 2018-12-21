package com.delaroystudios.fragrancecart.Fragments;


import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.content.res.Configuration;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.Loader;
import android.support.v4.view.MenuItemCompat;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.EditText;
import android.widget.ProgressBar;

import com.delaroystudios.fragrancecart.CleanerAdapter;
import com.delaroystudios.fragrancecart.Examplelist;
import com.delaroystudios.fragrancecart.HomeActivity;
import com.delaroystudios.fragrancecart.ProductsDetails;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.SearchAdapter;
import com.delaroystudios.fragrancecart.data.Cleaner;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import java.util.ArrayList;
import java.util.List;

import static android.support.constraint.Constraints.TAG;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CLEANER_TABLE;

/**
 * A simple {@link Fragment} subclass.
 */
public class SearchFragment extends Fragment {

    View v;

    private RecyclerView searchRecyclerView;
    SearchAdapter searchAdapter;
    List<Examplelist> mExamplelist;
    LinearLayoutManager manager;
    int iD, currentItems, totalItems, scrollOutItems;
    Boolean isScrolling = false;
    ProgressBar endLessProgress;

    public SearchFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_search, container, false);


        // Search Edit Text
        EditText editText = v.findViewById(R.id.search_toolbar);
        editText.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                filter(s.toString());
            }
        });

        //Progress Bar Endless progressBar
        endLessProgress = (ProgressBar) v.findViewById(R.id.search_progress);
        manager = new GridLayoutManager(getContext(), 2);
        // Show my items by recycler view
        searchRecyclerView = v.findViewById(R.id.search_recyclerView);
        searchRecyclerView.setHasFixedSize(true);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            searchRecyclerView.setLayoutManager(manager);
        } else {
            searchRecyclerView.setLayoutManager(new GridLayoutManager(getContext(), 4));
        }
        searchAdapter = new SearchAdapter(getContext(), mExamplelist);
        searchRecyclerView.setAdapter(searchAdapter);

        //Endless recyclerView
        searchRecyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
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


        return v;
    }

    private void fechData() {
        endLessProgress.setVisibility(View.VISIBLE);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    mExamplelist.add(new Examplelist("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                            "", 10, "Good Type of koki", "Koki", 10,
                            "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                            16, "Koki", "Egypt"));
                    searchAdapter.notifyDataSetChanged();
                    endLessProgress.setVisibility(View.GONE);
                }
            }
        }, 5000);
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mExamplelist = new ArrayList<>();
        mExamplelist.add(new Examplelist("Hsavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hsavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hddavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hyavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hoavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hpavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hhhavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hvavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Hhavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("bavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Examplelist("Aavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


    }


    private void filter(String text) {
        ArrayList<Examplelist> filteredlist = new ArrayList<>();

        for (Examplelist item : mExamplelist) {
            if (item.getmNames().toLowerCase().contains(text.toLowerCase())) {
                filteredlist.add(item);
            }
        }
        searchAdapter.filterlist(filteredlist);

    }
}
