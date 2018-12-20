package com.delaroystudios.fragrancecart;

import android.app.Activity;
import android.app.LoaderManager;
import android.content.CursorLoader;
import android.content.Intent;
import android.content.Loader;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;


import com.delaroystudios.fragrancecart.API.ApiClient;
import com.delaroystudios.fragrancecart.API.models.order.Basket;
import com.delaroystudios.fragrancecart.API.models.order.OrderPostParams;
import com.delaroystudios.fragrancecart.API.models.order.OrderVm;
import com.delaroystudios.fragrancecart.data.Fragrance;
import com.delaroystudios.fragrancecart.data.FragranceContract;


import org.json.JSONException;

import java.math.BigDecimal;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by delaroy on 9/5/17.
 */

public class CartActivity extends AppCompatActivity implements LoaderManager.LoaderCallbacks<Cursor> {

    /**
     * Identifier for the employee data loader
     */
    private static final int CART_LOADER = 0;

    /**
     * Adapter for the ListView
     */
    CartAdapter cartAdapter;
    RecyclerView mRecyclerView;
    Double totalPrice;
    Button paymentButton;
    Call<OrderVm> orderCall ;
    OrderPostParams currentOrder ;

    // Shard Function
    public boolean hasJWTToken() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        return !token.equals("");
    }


    public String getJWTToken() {
        SharedPreferences preferences = PreferenceManager.getDefaultSharedPreferences(this);
        String token = preferences.getString("Token", "");
        return token;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.cart);


        //TODO ADD TEXT AREA FOR USER ADDRESS
        //TODO ADD TEXT AREA FOR USER ADDRESS

        // Set the RecyclerView to its corresponding view
        mRecyclerView = (RecyclerView) findViewById(R.id.cart_recycler);

        // Set the layout for the RecyclerView to be a linear layout, which measures and
        // positions items within a RecyclerView into a linear list
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize the adapter and attach it to the RecyclerView
        cartAdapter = new CartAdapter(this);
        mRecyclerView.setAdapter(cartAdapter);
        mRecyclerView.addItemDecoration(new SimpleDividerItemDecoration(this));

        new ItemTouchHelper(new ItemTouchHelper.SimpleCallback(0, ItemTouchHelper.LEFT | ItemTouchHelper.RIGHT) {
            @Override
            public boolean onMove(RecyclerView recyclerView, RecyclerView.ViewHolder viewHolder, RecyclerView.ViewHolder target) {
                return false;
            }

            // Called when a user swipes left or right on a ViewHolder
            @Override
            public void onSwiped(RecyclerView.ViewHolder viewHolder, int swipeDir) {
                // Here is where you'll implement swipe to delete

                // COMPLETED (1) Construct the URI for the item to delete
                //[Hint] Use getTag (from the adapter code) to get the id of the swiped item
                // Retrieve the id of the task to delete
                int id = (int) viewHolder.itemView.getTag();

                // Build appropriate uri with String row id appended
                String stringId = Integer.toString(id);
                Uri uri = FragranceContract.FragranceEntry.CONTENT_URI_CART;
                uri = uri.buildUpon().appendPath(stringId).build();

                // COMPLETED (2) Delete a single row of data using a ContentResolver
                getContentResolver().delete(uri, null, null);
                // COMPLETED (3) Restart the loader to re-query for all tasks after a deletion
                getLoaderManager().restartLoader(CART_LOADER, null, CartActivity.this);

            }
        }).attachToRecyclerView(mRecyclerView);

        getLoaderManager().initLoader(CART_LOADER, null, this);

        paymentButton = (Button) findViewById(R.id.button_payment);



        paymentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(CartActivity.this, "Check Out", Toast.LENGTH_SHORT).show();

                //TODO Send Order Request
                // don't forget to set address for @currentOrder

                if(!hasJWTToken()){
                    //TODO PREVENT USER FROM PERFORM AN ORDER
                }
                else {
                    ApiClient.getInstance().getOrderClient().postOrder("Bearer "+getJWTToken(), currentOrder).enqueue(new Callback<OrderVm>() {
                        @Override
                        public void onResponse(Call<OrderVm> call, Response<OrderVm> response) {

                            //TODO Post Order
                            if (response.isSuccessful()) {
                                //remove all items in cart from database
                                // show a message that show the order is successfuly post
                                // go to home page

                            }
                        }

                        @Override
                        public void onFailure(Call<OrderVm> call, Throwable t) {

                        }
                    });


                    //TODO if u want to retreive all orders for user (Move it to the correct layout)

//                    ApiClient.getInstance().getOrderClient().getOrders("Bearer "+getJWTToken(),getStatusList(),1000,0).enqueue(new Callback<List<OrderVm>>() {
//                        @Override
//                        public void onResponse(Call<List<OrderVm>> call, Response<List<OrderVm>> response) {
//
//                            if(response.isSuccessful()){
//                                //TODO  add Items to OrderAdapter like in Cleaner Adapter
//                            }
//                        }
//
//                        @Override
//                        public void onFailure(Call<List<OrderVm>> call, Throwable t) {
//
//                        }
//                    });

                }
            }
        });

    }

    private List<String> getStatusList() {                    List<String> status = new ArrayList<>();

        status.add("Created");
        status.add("Processing");
        status.add("Shipped");
        status.add("Canceled");
        status.add("Refunded");

        return status ;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }


    @Override
    public Loader<Cursor> onCreateLoader(int i, Bundle bundle) {
        // Define a projection that specifies the columns from the table we care about.
        String[] projection = {
                FragranceContract.FragranceEntry._CARTID,
                FragranceContract.FragranceEntry.COLUMN_CART_NAME,
                FragranceContract.FragranceEntry.COLUMN_CART_IMAGE,
                FragranceContract.FragranceEntry.COLUMN_CART_QUANTITY,
                FragranceContract.FragranceEntry.COLUMN_CART_TOTAL_PRICE,
                FragranceContract.FragranceEntry.COLUMN_CART_PRODUCT_ID
        };

        // This loader will execute the ContentProvider's query method on a background thread
        return new CursorLoader(this,   // Parent activity context
                FragranceContract.FragranceEntry.CONTENT_URI_CART,   // Provider content URI to query
                projection,             // Columns to include in the resulting Cursor
                null,                   // No selection clause
                null,                   // No selection arguments
                null);                  // Default sort order
    }


    @Override
    public void onLoadFinished(Loader<Cursor> loader, Cursor cursor) {

        cartAdapter.swapCursor(cursor);
        calculateTotal(cursor);
        setProductList(cursor);
    }

    private void setProductList(Cursor cursor) {

        currentOrder = new OrderPostParams();
        currentOrder.setBasket(new ArrayList<Basket>());


        for(int i = 0 ; i < cursor.getCount();i++){
            cursor.moveToPosition(i);
            int productIdIndex = cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_CART_PRODUCT_ID);
            int quantityIndex = cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_CART_QUANTITY);

            String productId = cursor.getString(productIdIndex);
            int quantity = cursor.getInt(quantityIndex);


            Basket basket = new Basket();
            basket.setId(productId);
            basket.setQuantity(quantity);
            currentOrder.getBasket().add(basket);
        }
    }

    @Override
    public void onResume() {
        super.onResume();
    }

    public double calculateTotal(Cursor cursor) {
        totalPrice = 0.00;
        for (int i = 0; i < cursor.getCount(); i++) {
            int price = cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_CART_TOTAL_PRICE);

            cursor.moveToPosition(i);
            Double fragrancePrice = cursor.getDouble(price);
            totalPrice += fragrancePrice;

        }

        TextView totalCost = (TextView) findViewById(R.id.totalPrice);
        String convertPrice = NumberFormat.getInstance().format(totalPrice);
        totalCost.setText("L.E" + convertPrice);
        return totalPrice;
    }

    @Override
    public void onLoaderReset(Loader<Cursor> loader) {
        cartAdapter.swapCursor(null);

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

    }
}
