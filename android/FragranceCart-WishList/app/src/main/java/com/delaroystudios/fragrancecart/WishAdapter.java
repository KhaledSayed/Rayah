package com.delaroystudios.fragrancecart;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.bumptech.glide.Glide;
import com.delaroystudios.fragrancecart.data.Fragrance;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.Wish;

import java.util.List;

import static android.content.ContentValues.TAG;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_DESCRIPTION;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_ID;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_IMAGE;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_NAME;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_PRICE;
import static com.delaroystudios.fragrancecart.DetailActivity.FRAGRANCE_RATING;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COMPANYNAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COUNTRY;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_DESCRIPTION;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_EXPIREDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_ID;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_IMAGE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_NAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRICE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRODCTIONDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_RATING;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_SIZE;
import static com.delaroystudios.fragrancecart.ProductsDetails.ClEANER_SUPNAME;

/**
 * Created by delaroy on 10/1/17.
 */

public class WishAdapter extends RecyclerView.Adapter<WishAdapter.ViewHolder> {

    Cursor dataCursor;
    Context context;
    int id;

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView name, userrating, description, price;
        public ImageView thumbnail;


        public ViewHolder(View itemView) {
            super(itemView);
            name = (TextView) itemView.findViewById(R.id.title);
//              userrating = (TextView) itemView.findViewById(R.id.userrating);
            thumbnail = (ImageView) itemView.findViewById(R.id.thumbnail);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int pos = getAdapterPosition();
                    if (pos != RecyclerView.NO_POSITION) {
                        Intent intent = new Intent(context, ProductsDetails.class);
                        intent.putExtra(CLEANER_ID, getItem(pos).id);
                        intent.putExtra(CLEANER_NAME, getItem(pos).wish_name);
                        intent.putExtra(ClEANER_SUPNAME, getItem(pos).wish_supname);
                        intent.putExtra(CLEANER_DESCRIPTION, getItem(pos).wish_description);
                        intent.putExtra(CLEANER_PRICE, getItem(pos).wish_price);
                        intent.putExtra(CLEANER_IMAGE, getItem(pos).wish_imageUrl);
                        intent.putExtra(CLEANER_RATING, getItem(pos).wish_userRating);
                        intent.putExtra(CLEANER_COMPANYNAME, getItem(pos).wish_companyname);
                        intent.putExtra(CLEANER_PRODCTIONDATE, getItem(pos).wish_productiondate);
                        intent.putExtra(CLEANER_EXPIREDATE, getItem(pos).wish_expiredate);
                        Log.i(TAG, "onClick: expire " + getItem(pos).wish_expiredate);
                        intent.putExtra(CLEANER_SIZE, String.valueOf(getItem(pos).wish_size));
                        intent.putExtra(CLEANER_COUNTRY, getItem(pos).wish_country);

                        context.startActivity(intent);
                    }
                }
            });
        }
    }

    public WishAdapter(Activity mContext, Cursor cursor) {
        dataCursor = cursor;
        context = mContext;
    }


    @Override
    public WishAdapter.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View cardview = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragrance_card, parent, false);
        return new WishAdapter.ViewHolder(cardview);
    }

    @Override
    public void onBindViewHolder(WishAdapter.ViewHolder holder, int position) {
        dataCursor.moveToPosition(position);

        id = dataCursor.getInt(dataCursor.getColumnIndex(FragranceContract.FragranceEntry._WISHID));
        String mName = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_NAME));
        String supname = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_SUPNAME));
        String mDescription = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_DESCRIPTION));
        String mImageUrl = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_IMAGE));
        int mPrice = dataCursor.getInt(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_PRICE));
        int mUserrating = dataCursor.getInt(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_USERRATING));
        String companyname = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_COMPANYNAME));
        String productiondate = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_PRODUCTIONDATE));
        String expiredate = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_EXPIREDATE));
        int size = dataCursor.getInt(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_SIZE));
        String country = dataCursor.getString(dataCursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_COUNTRY));



        holder.name.setText(mName);

        String poster = mImageUrl;

        Glide.with(context)
                .load(poster)
//                .placeholder(R.drawable.load)
                .into(holder.thumbnail);


    }

    public Cursor swapCursor(Cursor cursor) {
        if (dataCursor == cursor) {
            return null;
        }
        Cursor oldCursor = dataCursor;
        this.dataCursor = cursor;
        if (cursor != null) {
            this.notifyDataSetChanged();
        }
        return oldCursor;
    }

    @Override
    public int getItemCount() {
        return (dataCursor == null) ? 0 : dataCursor.getCount();
    }

    public Wish getItem(int position) {
        if (position < 0 || position >= getItemCount()) {
            throw new IllegalArgumentException("Item position is out of adapter's range");
        } else if (dataCursor.moveToPosition(position)) {
            return new Wish(dataCursor);
        }
        return null;
    }


}
