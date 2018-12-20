package com.delaroystudios.fragrancecart;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.app.LoaderManager;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.CursorLoader;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.Loader;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.drawable.LayerDrawable;
import android.os.AsyncTask;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RatingBar;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;
import com.delaroystudios.fragrancecart.config.BaseUrl;
import com.delaroystudios.fragrancecart.count.Utils;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;
import com.smarteist.autoimageslider.SliderLayout;
import com.smarteist.autoimageslider.SliderView;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static android.support.constraint.Constraints.TAG;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CART_TABLE;
import static com.delaroystudios.fragrancecart.data.FragranceContract.FragranceEntry.CONTENT_URI_CLEANER;
import static java.security.AccessController.getContext;

public class ProductsDetails extends AppCompatActivity {

    public static final String CLEANER_ID = "cleanereId";
    public static final String CLEANER_NAME = "cleanereName";
    public static final String CLEANER_DESCRIPTION = "cleanerDescription";
    public static final String CLEANER_RATING = "cleanerRating";
    public static final String CLEANER_IMAGE = "cleanerImage";
    public static final String CLEANER_PRICE = "cleanerPrice";
    public static final String ClEANER_SUPNAME = "cleanerSupname";
    public static final String CLEANER_COMPANYNAME = "cleanerCompanyname";
    public static final String CLEANER_PRODCTIONDATE = "cleanerDate";
    public static final String CLEANER_EXPIREDATE = "cleanerExpiredate";
    public static final String CLEANER_SIZE = "cleanerSize";
    public static final String CLEANER_COUNTRY = "cleanerCountry";
    //    public static final String CLEANER_ID = "cleanerId";
    public static final String CLEANER_ = "cleanerPrice";


    private ImageView cleaner_item_Image;


    String cleanerName, cleanerDescription, cleanerImage, cleanerSupName, cleanerCompanyname,
            cleanerCountry, cleanerDate, cleanerExpiredate, cleanerSize;
    int cleanerRating;
    int cleanerPrice;
    private int mQuantity = 1;
    private double mTotalPrice;
    String imagePath;
    TextView costTextView;
    ContentResolver mContentResolver;
    private SQLiteDatabase mDb;
    private FragranceDbHelper fragranceDbHelper;

    private int mNotificationsCount = 0;
    Button addToCartButton, rateButton;

    ViewPager viewPager;
    LinearLayout sliderDoatsPanal;
    private int dotscount;
    private ImageView[] dots;
    List<SliderImages> sliderImages;

    ViewPagerAdapter viewPagerAdapter;
    SliderLayout sliderLayout;

    LinearLayout linearLayoutshow;

    ProductVm currentProduct ;

    @SuppressLint("NewApi")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //TODO ADD description to view

        setContentView(R.layout.activity_products_details);

        sliderLayout = (SliderLayout) findViewById(R.id.imageSlider);

        // Initial SQLlight
        mContentResolver = this.getContentResolver();
        FragranceDbHelper dbHelper = new FragranceDbHelper(this);
        mDb = dbHelper.getWritableDatabase();

        // Rating button
        rateButton = (Button) findViewById(R.id.rate_btn);

        // view Pager to items
        viewPager = (ViewPager) findViewById(R.id.cleaner_viewPager);

        sliderDoatsPanal = (LinearLayout) findViewById(R.id.slidDots);
        linearLayoutshow = (LinearLayout) findViewById(R.id.details_slider_item);

        // Array Images of slider
//        sliderImages = new ArrayList<>();
//        sliderImages.add(new SliderImages("https://c1.staticflickr.com/5/4636/25316407448_de5fbf183d_o.jpg"));


        // Slider
//        ViewPagerAdapter viewPagerAdapter = new ViewPagerAdapter(this, sliderImages);
//        viewPager.setAdapter(viewPagerAdapter);
//
//        dotscount = viewPagerAdapter.getCount();
//        dots = new ImageView[dotscount];
//
//        for (int i = 0; i < dotscount; i++) {
//            dots[i] = new ImageView(this);
//            dots[i].setImageDrawable(ContextCompat.getDrawable(getApplicationContext(), R.drawable.nonactive_dot));
//
//            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, LinearLayout.LayoutParams.WRAP_CONTENT);
//            params.setMargins(8, 0, 8, 0);
//            sliderDoatsPanal.addView(dots[i], params);
//        }
//
//        dots[0].setImageDrawable(ContextCompat.getDrawable(getApplicationContext(), R.drawable.active_dot));


        // Function details
//        detailslist();


        addToCartButton = (Button) findViewById(R.id.product_details_addtocart_btn);
        costTextView = (TextView) findViewById(R.id.cost_text_view);
//        cleaner_item_Image = (ImageView) findViewById(R.id.product_details_img);

        Intent intentThatStartedThisActivity = getIntent();

        if(intentThatStartedThisActivity !=null){
            currentProduct = intentThatStartedThisActivity.getParcelableExtra("product");

            if(currentProduct.getGallery().size() != 0){
                setSliderViews(currentProduct.getGallery());
            }

            //TODO set current product Description to View @currentProduct.getDescription()
        }


        // Add To Cart Function
        addToCartButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                addToCart();
            }
        });

        if (intentThatStartedThisActivity.hasExtra(CLEANER_NAME)) {
            Toast.makeText(this, "Enter", Toast.LENGTH_SHORT).show();
//            cleaner_iD = getIntent().getExtras().getInt(CLEANER_ID);
            cleanerName = getIntent().getExtras().getString(CLEANER_NAME);
            cleanerDescription = getIntent().getExtras().getString(CLEANER_DESCRIPTION);
            cleanerRating = getIntent().getExtras().getInt(CLEANER_RATING);
//            cleanerImage = getIntent().getExtras().getString(CLEANER_IMAGE);
            cleanerPrice = getIntent().getExtras().getInt(CLEANER_PRICE);
            cleanerSupName = getIntent().getExtras().getString(ClEANER_SUPNAME);
            cleanerCompanyname = getIntent().getExtras().getString(CLEANER_COMPANYNAME);
            cleanerDate = getIntent().getExtras().getString(CLEANER_PRODCTIONDATE);
            cleanerExpiredate = getIntent().getExtras().getString(CLEANER_EXPIREDATE);
            Log.i(TAG, "onClick: expire2222" + CLEANER_EXPIREDATE);
            cleanerSize = getIntent().getExtras().getString(CLEANER_SIZE);
            cleanerCountry = getIntent().getExtras().getString(CLEANER_COUNTRY);
            cleanerImage = getIntent().getExtras().getString(CLEANER_IMAGE);

            TextView desc = (TextView) findViewById(R.id.product_details_descraption_tv);
            desc.setText(cleanerDescription);

            TextView fragmentPrice = (TextView) findViewById(R.id.product_detalis_price_tv);
            DecimalFormat precision = new DecimalFormat("0.00");
            fragmentPrice.setText("L.E" + precision.format(cleanerPrice));

            float f = Float.parseFloat(Double.toString(cleanerRating));

            setTitle(cleanerName);

            TextView clener_name = (TextView) findViewById(R.id.product_details_name_tv);
            clener_name.setText(cleanerName);

            RatingBar ratingBar = (RatingBar) findViewById(R.id.product_details_rating);
            ratingBar.setRating(f);
            rateButton.setText(String.valueOf(f));

            TextView supname = (TextView) findViewById(R.id.product_details_supname_tv);
            supname.setText(cleanerSupName);

            TextView companyName = (TextView) findViewById(R.id.cleaner_companyName_tv);
            companyName.setText(cleanerCompanyname);

            TextView productiondate = (TextView) findViewById(R.id.cleaner_productionDate_tv);
            productiondate.setText((cleanerDate));

            TextView expiredate = (TextView) findViewById(R.id.cleaner_expireDate_tv);
            expiredate.setText(cleanerExpiredate);
            Log.i(TAG, "onClick: expire3333333" + cleanerExpiredate);

            TextView size = (TextView) findViewById(R.id.cleaner_size_tv);
            size.setText(cleanerSize);

            TextView country = (TextView) findViewById(R.id.cleaner_orginCountry_tv);
            country.setText(cleanerCountry);

//            Glide.with(this)
//                    .load(R.drawable.download)
//                    .apply(new RequestOptions().placeholder(R.drawable.load))
//                    .into(cleaner_item_Image);


            // Quantity of item
            if (mQuantity == 1) {

                mTotalPrice = cleanerPrice;
                displayCost(mTotalPrice);
            }


        } else {
            Toast.makeText(this, "Nooooooooooooo", Toast.LENGTH_SHORT).show();
        }

    }


    private void setSliderViews(List<String> gallery) {

        for (int i = 0; i < gallery.size(); i++) {

            SliderView sliderView = new SliderView(this);

            sliderView.setImageUrl(BaseUrl.baseImageUrl+gallery.get(i));


            sliderView.setImageScaleType(ImageView.ScaleType.CENTER_CROP);
            sliderView.setDescription("setDescription " + (i + 1));
            final int finalI = i;
            sliderView.setOnSliderClickListener(new SliderView.OnSliderClickListener() {
                @Override
                public void onSliderClick(SliderView sliderView) {
//                    Toast.makeText(MainActivity.this, "This is slider " + (finalI + 1), Toast.LENGTH_SHORT).show();
                }
            });

            //at last add this view in your layout :
            sliderLayout.addSliderView(sliderView);
        }
    }

    public void onPause() {
        super.onPause();
        new FetchCountTask().execute();
        Toast.makeText(this, "Paused", Toast.LENGTH_SHORT).show();
    }

    public void onBackPressed() {
        super.onBackPressed();
        new FetchCountTask().execute();
        Toast.makeText(this, "Back", Toast.LENGTH_SHORT).show();
    }


    public void increment(View view) {

        cleanerPrice = getIntent().getExtras().getInt(CLEANER_PRICE);
        mQuantity = mQuantity + 1;
        displayQuantity(mQuantity);
        mTotalPrice = mQuantity * cleanerPrice;
        displayCost(mTotalPrice);
    }

    public void decrement(View view) {
        if (mQuantity > 1) {

            mQuantity = mQuantity - 1;
            displayQuantity(mQuantity);
            mTotalPrice = mQuantity * cleanerPrice;
            displayCost(mTotalPrice);

        }
    }

    private void displayQuantity(int numberOfItems) {
        TextView quantityTextView = (TextView) findViewById(R.id.quantity_text_view);
        quantityTextView.setText(String.valueOf(numberOfItems));
    }

    private void displayCost(double totalPrice) {

        String convertPrice = NumberFormat.getInstance().format(totalPrice);
        costTextView.setText("L.E" + convertPrice);
    }


    private void addValuesToCart() {
// Add values
        ContentValues cartValues = new ContentValues();

        cartValues.put(FragranceContract.FragranceEntry.COLUMN_CART_NAME, cleanerName);
        cartValues.put(FragranceContract.FragranceEntry.COLUMN_CART_IMAGE, this.currentProduct.getThumbnail());
        cartValues.put(FragranceContract.FragranceEntry.COLUMN_CART_QUANTITY, mQuantity);
        cartValues.put(FragranceContract.FragranceEntry.COLUMN_CART_TOTAL_PRICE, mTotalPrice);
        cartValues.put(FragranceContract.FragranceEntry.COLUMN_CART_PRODUCT_ID, this.currentProduct.getId());

        mContentResolver.insert(FragranceContract.FragranceEntry.CONTENT_URI_CLEANER, cartValues);

        Toast.makeText(this, "Successfully added to Cart",
                Toast.LENGTH_SHORT).show();
    }

    public void addToCart() {
        // Create an AlertDialog.Builder and set the message, and click listeners
        // for the postivie and negative buttons on the dialog.
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setMessage(R.string.add_to_cart);
        builder.setPositiveButton(R.string.add, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                addValuesToCart();
            }
        });
        builder.setNegativeButton(R.string.cancel, new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                // User clicked the "Cancel" button, so dismiss the dialog
                // and continue editing the items.
                if (dialog != null) {
                    dialog.dismiss();
                }
            }
        });

        // Create and show the AlertDialog
        AlertDialog alertDialog = builder.create();
        alertDialog.show();
    }

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

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

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
}
