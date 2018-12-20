package com.delaroystudios.fragrancecart;


import android.app.FragmentTransaction;
import android.content.ContentResolver;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.drawable.LayerDrawable;
import android.os.AsyncTask;
import android.os.Handler;
import android.support.annotation.NonNull;
import android.support.design.widget.BottomNavigationView;
import android.support.design.widget.NavigationView;
import android.support.v4.app.Fragment;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.FrameLayout;
import android.widget.Toast;

import com.delaroystudios.fragrancecart.Fragments.HomeFragment;
import com.delaroystudios.fragrancecart.Fragments.OffersFragment;
import com.delaroystudios.fragrancecart.Fragments.PurchasesFragment;
import com.delaroystudios.fragrancecart.Fragments.SearchFragment;
import com.delaroystudios.fragrancecart.Fragments.SectionsFragment;
import com.delaroystudios.fragrancecart.count.Utils;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CART_TABLE;

public class HomeActivity extends AppCompatActivity implements NavigationView.OnNavigationItemSelectedListener {

    private int mNotificationsCount = 0;

    private BottomNavigationView mMainNave;
    private FrameLayout mMainFrame;

    private HomeFragment homeFragment;
    private OffersFragment offersFragment;
    private PurchasesFragment purchasesFragment;
    private SearchFragment searchFragment;
    private SectionsFragment sectionsFragment;

    private NavigationView navigationView;
    private DrawerLayout mDrawelayout;
    private ActionBarDrawerToggle mToggle;

    ContentResolver mContentResolver;
    private SQLiteDatabase mDb;
    boolean doubleBackToexitePressedOnce = false;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // Initialize fragments
        mMainFrame = (FrameLayout) findViewById(R.id.main_frame);
        mMainNave = (BottomNavigationView) findViewById(R.id.main_nav);
        // Instance new fragments
        homeFragment = new HomeFragment();
        offersFragment = new OffersFragment();
        purchasesFragment = new PurchasesFragment();
        searchFragment = new SearchFragment();
        sectionsFragment = new SectionsFragment();
        // First fragment
        setFragment(homeFragment);
        //Initia;ize SQL Light
        mContentResolver = this.getContentResolver();
        FragranceDbHelper dbHelper = new FragranceDbHelper(this);
        mDb = dbHelper.getWritableDatabase();


        // Initialize navigation View
        // Drawer Ui Toggel
        mDrawelayout = (DrawerLayout) findViewById(R.id.drawer);
        mToggle = new ActionBarDrawerToggle(this, mDrawelayout, R.string.open, R.string.close);
        mDrawelayout.addDrawerListener(mToggle);
        mToggle.syncState();
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        // This is for make navigation in navigation drawer
        navigationView = (NavigationView) findViewById(R.id.navigation_view);
        navigationView.setNavigationItemSelectedListener(this);

        // navigation View for fragments
        mMainNave.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                // Navigation View For Fragments
                switch (item.getItemId()) {
                    case R.id.home_nav:
//                        mMainNave.setItemBackgroundResource(R.color.colorAccent);
                        setFragment(homeFragment);
                        return true;
                    case R.id.offer_nav:
                        setFragment(offersFragment);
                        return true;
                    case R.id.Purchases_nav:
                        setFragment(purchasesFragment);
                        return true;
                    case R.id.search_nav:
                        setFragment(searchFragment);
                        return true;
                    case R.id.section_nav:
                        setFragment(sectionsFragment);
                        return true;
                    default:
                        return false;
                }
            }

            private void setFragment(Fragment fragment) {
                android.support.v4.app.FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
                fragmentTransaction.replace(R.id.main_frame, fragment);
                fragmentTransaction.commit();
            }
        });

        // Navigation view for nav view
        navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                // Navigation View
                int id = item.getItemId();

                if (id == R.id.categories) {
                    Intent in = new Intent(getBaseContext(), ProductsActivity.class);
                    startActivity(in);
                    Log.d("TAG","onClick"+" Categories");
                }
                if (id == R.id.shopCart) {
                    Intent in = new Intent(getBaseContext(), CartActivity.class);
                    startActivity(in);
                }
                if (id == R.id.myAccount) {
                    Toast.makeText(HomeActivity.this, "My Account", Toast.LENGTH_SHORT).show();
                }
                if (id == R.id.contactUs) {
                    Toast.makeText(HomeActivity.this, "Contact Us", Toast.LENGTH_SHORT).show();
                }
                if (id == R.id.about) {
                    Intent in = new Intent(getBaseContext(), AboutActivity.class);
                    startActivity(in);
                }
                if (id == R.id.login) {
                    Intent in = new Intent(getBaseContext(), LoginActivity.class);
                    startActivity(in);
                }
                return false;
            }
        });
    }

    private void setFragment(HomeFragment homeFragment) {
        android.support.v4.app.FragmentTransaction fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.main_frame, homeFragment);
        fragmentTransaction.commit();
    }


    // navigation from Home Activity to Wish activity and cart activity
    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        return false;
    }

    @Override
    public void onPause() {
        super.onPause();
        new FetchCountTask().execute();
    }

    // option menu
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_main, menu);

        // Get the notifications MenuItem and
        // its LayerDrawable (layer-list)
        MenuItem item = menu.findItem(R.id.action_notifications);
        LayerDrawable icon = (LayerDrawable) item.getIcon();

        // Update LayerDrawable's BadgeDrawable
        Utils.setBadgeCount(this, icon, mNotificationsCount);

        return true;
    }

    private void updateNotificationsBadge(int count) {
        mNotificationsCount = count;

        // force the ActionBar to relayout its MenuItems.
        // onCreateOptionsMenu(Menu) will be called again.
        invalidateOptionsMenu();
    }

    /*
    Sample AsyncTask to fetch the notifications count
    */
    class FetchCountTask extends AsyncTask<Void, Void, Integer> {

        @Override
        protected Integer doInBackground(Void... params) {
            String countQuery = "SELECT  * FROM " + CART_TABLE;
            Cursor cursor = mDb.rawQuery(countQuery, null);
            int count = cursor.getCount();
            cursor.close();
            return count;

        }

        @Override
        public void onPostExecute(Integer count) {
            updateNotificationsBadge(count);
        }
    }


    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        // Toggel Navigation view
        if (mToggle.onOptionsItemSelected(item)) {
            return true;
        }

        switch (item.getItemId()) {

            case R.id.action_notifications: {
                Intent intent = new Intent(this, CartActivity.class);
                startActivity(intent);
                return true;
            }
            case R.id.wish: {
                Intent intent = new Intent(this, WishListActivity.class);
                startActivity(intent);
                return true;
            }
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (doubleBackToexitePressedOnce) {
            super.onBackPressed();
            return;
        }
        this.doubleBackToexitePressedOnce = true;
        Toast.makeText(this, "Please Click Back Again To Exite", Toast.LENGTH_SHORT).show();

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                doubleBackToexitePressedOnce = false;
            }
        }, 2000);
    }
}