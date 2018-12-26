package com.delaroystudios.fragrancecart;

import android.content.res.Configuration;
import android.os.Handler;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.AbsListView;
import android.widget.EditText;
import android.widget.ProgressBar;

import java.util.ArrayList;
import java.util.List;

public class Search extends AppCompatActivity {

    private RecyclerView searchRecyclerView;
    SearchActivityAdapter searchAdapter;
    List<Searchlist> mExamplelist;
    LinearLayoutManager manager;
    int iD, currentItems, totalItems, scrollOutItems;
    Boolean isScrolling = false;
    ProgressBar endLessProgress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        // Data list
        mExamplelist = new ArrayList<>();
        mExamplelist.add(new Searchlist("Hsavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hsavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hddavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hyavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hoavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hpavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hhhavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hvavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Hhavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("bavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));

        mExamplelist.add(new Searchlist("Aavasu Falls", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                "", 10, "Good Type of koki", "Koki", 10,
                "This Good Product", 3, "1 / 1 / 2018", "31 / 6 / 2018",
                16, "Koki", "Egypt"));


        EditText editText = findViewById(R.id.search_toolbar);
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
        endLessProgress = (ProgressBar) findViewById(R.id.searchactivity_progress);
        manager = new GridLayoutManager(this, 2);
        // Show my items by recycler view
        searchRecyclerView = findViewById(R.id.search_recyclerView);
        searchRecyclerView.setHasFixedSize(true);
        if (this.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
            searchRecyclerView.setLayoutManager(manager);
        } else {
            searchRecyclerView.setLayoutManager(new GridLayoutManager(this, 4));
        }
        searchAdapter = new SearchActivityAdapter(this, mExamplelist);
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


    }

    private void fechData() {
        endLessProgress.setVisibility(View.VISIBLE);
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    mExamplelist.add(new Searchlist("Cool Now", "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg",
                            "", 10, "Good Type of koki", "Koki", 10,
                            "This Good Product", 2, "1 / 1 / 2018", "31 / 6 / 2018",
                            16, "Koki", "Egypt"));
                    searchAdapter.notifyDataSetChanged();
                    endLessProgress.setVisibility(View.GONE);
                }
            }
        }, 5000);
    }

    private void filter(String text) {
        ArrayList<Searchlist> filteredlist = new ArrayList<>();

        for (Searchlist item : mExamplelist) {
            if (item.getSrmNames().toLowerCase().contains(text.toLowerCase())) {
                filteredlist.add(item);
            }
        }
        searchAdapter.filterlist(filteredlist);

    }

}
