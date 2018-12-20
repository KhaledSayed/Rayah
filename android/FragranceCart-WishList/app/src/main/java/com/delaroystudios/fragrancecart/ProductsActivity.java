package com.delaroystudios.fragrancecart;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.drawable.LayerDrawable;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.annotation.Nullable;
import android.support.design.widget.BottomSheetBehavior;
import android.support.design.widget.TabLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import android.widget.TextView;
import android.widget.Toast;

import com.delaroystudios.fragrancecart.API.ApiClient;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ApiCleanerProduct;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.CategoryVm;
import com.delaroystudios.fragrancecart.ProductsFragments.CannedFragment;
import com.delaroystudios.fragrancecart.ProductsFragments.DairyFragment;
import com.delaroystudios.fragrancecart.ProductsFragments.DetergentsFragment;
import com.delaroystudios.fragrancecart.ProductsFragments.MeatFragment;
import com.delaroystudios.fragrancecart.Second_Fragment.ProductsFragment;
import com.delaroystudios.fragrancecart.count.Utils;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;
import com.delaroystudios.fragrancecart.data.Wish;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static android.content.ContentValues.TAG;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CART_TABLE;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.COLUMN_WISH_NAME;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.WISH_TABLE;
import static java.security.AccessController.getContext;

public class ProductsActivity extends AppCompatActivity {

    /**
     * The {@link android.support.v4.view.PagerAdapter} that will provide
     * fragments for each of the sections. We use a
     * {@link FragmentPagerAdapter} derivative, which will keep every
     * loaded fragment in memory. If this becomes too memory intensive, it
     * may be best to switch to a
     * {@link android.support.v4.app.FragmentStatePagerAdapter}.
     */
    private SectionsPagerAdapter mSectionsPagerAdapter;
    private BottomSheetBehavior mbottomSheetBehavior;
    private TextView textView;
    int iD;
    List<Wish> data;
    Call<List<CategoryVm>> categoryCall ;

    FragranceDbHelper fragranceDbHelper;
    private SQLiteDatabase mDb;
    final ContentValues wishValues = new ContentValues();
    ContentResolver mContentResolver;
    private int mNotificationsCount = 0;

    /**
     * The {@link ViewPager} that will host the section contents.
     */
    private ViewPager mViewPager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_products);

        mContentResolver = getContentResolver();
        FragranceDbHelper dbHelper = new FragranceDbHelper(this);
        mDb = dbHelper.getWritableDatabase();


        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

//        configureView(null);
        Bundle bundle = new Bundle();
//        Bundle bundle = new Bundle();
//        bundle.putParcelable("Student", model);
//        fragmentGet.setArguments(bundle);
//

        categoryCall = ApiClient.getInstance().getApiCleanerProduct().getCategories(null,"1000","0");


        categoryCall.enqueue(new Callback<List<CategoryVm>>() {
            @Override
            public void onResponse(Call<List<CategoryVm>> call, Response<List<CategoryVm>> response) {
                if(response.isSuccessful()){
                    Log.d(TAG, "onResponse: succesfull retreive categories "+response.body().size());
                    List<ProductsFragment> productsFragments = new ArrayList<>();

                    for (CategoryVm category:
                         response.body()) {
                                Bundle bundle = new Bundle();
                                bundle.putParcelable("category", category);
                                ProductsFragment productFragment = new ProductsFragment();
                                productFragment.setArguments(bundle);
                                productsFragments.add(productFragment);
                    }

                    configureView(productsFragments,response.body());
                }
            }
            @Override
            public void onFailure(Call<List<CategoryVm>> call, Throwable t) {
                Log.d(TAG, "onFailure: "+t.getMessage());
            }
        });

    }

    private void configureView(List<ProductsFragment> productsFragments,List<CategoryVm> categories) {

        mSectionsPagerAdapter = new SectionsPagerAdapter(getSupportFragmentManager(),productsFragments,categories);
//        getSupportActionBar().setDisplayShowTitleEnabled(false);
//        View bottomSheet = findViewById(R.id.bottom_sheet);
//        mbottomSheetBehavior = BottomSheetBehavior.from(bottomSheet);
//        textView = (TextView) findViewById(R.id.TestFragment);

        // Set up the ViewPager with the sections adapter.
        mViewPager = (ViewPager) findViewById(R.id.container);
        mViewPager.setAdapter(mSectionsPagerAdapter);

        TabLayout tabLayout = (TabLayout) findViewById(R.id.tabs);

        mViewPager.addOnPageChangeListener(new TabLayout.TabLayoutOnPageChangeListener(tabLayout));
        tabLayout.addOnTabSelectedListener(new TabLayout.ViewPagerOnTabSelectedListener(mViewPager));
        tabLayout.setupWithViewPager(mViewPager);

    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);

        // Get the notifications MenuItem and
        // its LayerDrawable (layer-list)
        MenuItem item = menu.findItem(R.id.action_notifications);
        LayerDrawable icon = (LayerDrawable) item.getIcon();

        // Update LayerDrawable's BadgeDrawable
        Utils.setBadgeCount(this, icon, mNotificationsCount);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
//
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

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        /**
         * The fragment argument representing the section number for this
         * fragment.
         */
        private static final String ARG_SECTION_NUMBER = "section_number";

        public PlaceholderFragment() {
        }

        /**
         * Returns a new instance of this fragment for the given section
         * number.
         */
        public static PlaceholderFragment newInstance(int sectionNumber) {
            PlaceholderFragment fragment = new PlaceholderFragment();
            Bundle args = new Bundle();
            args.putInt(ARG_SECTION_NUMBER, sectionNumber);
            fragment.setArguments(args);
            return fragment;
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            View rootView = inflater.inflate(R.layout.fragment_products, container, false);
//            TextView textView = (TextView) rootView.findViewById(R.id.section_label);
//            textView.setText(getString(R.string.section_format, getArguments().getInt(ARG_SECTION_NUMBER)));
            return rootView;
        }
    }

    /**
     * A {@link FragmentPagerAdapter} that returns a fragment corresponding to
     * one of the sections/tabs/pages.
     */
    public class SectionsPagerAdapter extends FragmentPagerAdapter {

        List<ProductsFragment> productsFragments ;
        List<CategoryVm> categories;
        public SectionsPagerAdapter(FragmentManager fm, List<ProductsFragment> productsFragments, List<CategoryVm> categories) {
            super(fm);
            this.productsFragments = productsFragments ;
            this.categories = categories ;
        }

        @Override
        public Fragment getItem(int position) {
            Fragment fragment = productsFragments.get(position);
            setTitle(categories.get(position).getName());
            return fragment;
        }

        @Override
        public int getCount() {
            // Show 3 total pages.
            return productsFragments.size();
        }

        @Override
        public CharSequence getPageTitle(int position) {
            CategoryVm categoryVm = this.categories.get(position);
            Log.d(TAG, "getPageTitle: "+categoryVm.getName());
            return categoryVm.getName();
        }
    }

    public void addWishs() {
        ContentValues wishValues = new ContentValues();


        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_NAME, "fragranceName");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_SUPNAME, "hello");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_DESCRIPTION, "description");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_IMAGE, "https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_PRICE, 10);
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_USERRATING, 3);
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_COMPANYNAME, "hello1");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_PRODUCTIONDATE, "22/22/22");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_EXPIREDATE, "22/23/22");
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_SIZE, 16);
        wishValues.put(FragranceContract.FragranceEntry.COLUMN_WISH_COUNTRY, "EGYPT");

        Log.i(TAG, "onClick: expire " + wishValues);

        mContentResolver.insert(FragranceContract.FragranceEntry.CONTENT_URI_WISH, wishValues);

        Toast.makeText(this, "Successfully added to Wish",
                Toast.LENGTH_SHORT).show();
    }

    public void deleteWish() {
        String stringId = Integer.toString(iD);
        Uri uri = FragranceContract.FragranceEntry.CONTENT_URI_WISH;
        uri = uri.buildUpon().appendPath(stringId).build();
        getContentResolver().delete(uri, null, null);
        Toast.makeText(this, "Delete from Wish", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onPause() {
        super.onPause();
        new FetchCountTask().execute();
    }

    private void updateNotificationsBadge(int count) {
        mNotificationsCount = count;

//         force the ActionBar to relayout its MenuItems.
//         onCreateOptionsMenu(Menu) will be called again.
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
    public void onBackPressed() {
        super.onBackPressed();
        Intent in = new Intent(this, HomeActivity.class);
        in.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        startActivity(in);
    }

}
