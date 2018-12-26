package com.delaroystudios.fragrancecart.Fragments;


import android.database.Cursor;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v4.app.Fragment;
import android.support.v4.app.LoaderManager;
import android.support.v4.content.CursorLoader;
import android.support.v4.content.Loader;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.helper.ItemTouchHelper;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;


import com.delaroystudios.fragrancecart.CartAdapter;
import com.delaroystudios.fragrancecart.R;
import com.delaroystudios.fragrancecart.SimpleDividerItemDecoration;
import com.delaroystudios.fragrancecart.data.FragranceContract;

import java.text.NumberFormat;

/**
 * A simple {@link Fragment} subclass.
 */
public class PurchasesFragment extends Fragment implements LoaderManager.LoaderCallbacks<Cursor>, View.OnClickListener {
    View v;
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


    public PurchasesFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        v = inflater.inflate(R.layout.fragment_purchases, container, false);
        // payment Button
        paymentButton = (Button) v.findViewById(R.id.button_payment);
        paymentButton.setOnClickListener(this);
        // Set the RecyclerView to its corresponding view
        mRecyclerView = (RecyclerView) v.findViewById(R.id.cart_recycler);

        // Set the layout for the RecyclerView to be a linear layout, which measures and
        // positions items within a RecyclerView into a linear list
        mRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Initialize the adapter and attach it to the RecyclerView
        cartAdapter = new CartAdapter(getContext());
        mRecyclerView.setAdapter(cartAdapter);
        mRecyclerView.addItemDecoration(new SimpleDividerItemDecoration(getContext()));

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
                getActivity().getContentResolver().delete(uri, null, null);
                // COMPLETED (3) Restart the loader to re-query for all tasks after a deletion
                getLoaderManager().restartLoader(CART_LOADER, null, PurchasesFragment.this);

            }
        }).attachToRecyclerView(mRecyclerView);

        getLoaderManager().initLoader(CART_LOADER, null, this);

        return v;
    }

    @NonNull
    @Override
    public Loader<Cursor> onCreateLoader(int id, @Nullable Bundle args) {
        // Define a projection that specifies the columns from the table we care about.
        String[] projection = {
                FragranceContract.FragranceEntry._CARTID,
                FragranceContract.FragranceEntry.COLUMN_CART_NAME,
                FragranceContract.FragranceEntry.COLUMN_CART_IMAGE,
                FragranceContract.FragranceEntry.COLUMN_CART_QUANTITY,
                FragranceContract.FragranceEntry.COLUMN_CART_TOTAL_PRICE,
        };

        // This loader will execute the ContentProvider's query method on a background thread
        return new CursorLoader(getContext(),   // Parent activity context
                FragranceContract.FragranceEntry.CONTENT_URI_CART,   // Provider content URI to query
                projection,             // Columns to include in the resulting Cursor
                null,                   // No selection clause
                null,                   // No selection arguments
                null);                  // Default sort order
    }

    @Override
    public void onLoadFinished(@NonNull Loader<Cursor> loader, Cursor data) {
        cartAdapter.swapCursor(data);
        calculateTotal(data);
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

        TextView totalCost = (TextView) v.findViewById(R.id.totalPrice);
        String convertPrice = NumberFormat.getInstance().format(totalPrice);
        totalCost.setText("L.E" + convertPrice);
        return totalPrice;
    }


    @Override
    public void onLoaderReset(@NonNull Loader<Cursor> loader) {
        cartAdapter.swapCursor(null);
    }

    @Override
    public void onClick(View v) {
        if (v == paymentButton) {
            Toast.makeText(getContext(), "Check Your Payment", Toast.LENGTH_SHORT).show();
        }
    }
}
