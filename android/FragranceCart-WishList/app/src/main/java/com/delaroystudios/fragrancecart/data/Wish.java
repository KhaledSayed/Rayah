package com.delaroystudios.fragrancecart.data;

import android.database.Cursor;

/**
 * Created by delaroy on 10/1/17.
 */

public class Wish {

    public int id;

    public String wish_name;
    public String wish_supname;
    public String wish_description;
    public String wish_imageUrl;
    public int wish_price;
    public int wish_userRating;
    public String wish_companyname;
    public String wish_productiondate;
    public String wish_expiredate;
    public int wish_size;
    public String wish_country;

    public Wish(Cursor cursor) {
        this.id = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry._WISHID));
        this.wish_name = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_NAME));
        this.wish_supname = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_SUPNAME));
        this.wish_description = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_DESCRIPTION));
        this.wish_imageUrl = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_IMAGE));
        this.wish_price = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_PRICE));
        this.wish_userRating = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_USERRATING));
        this.wish_companyname = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_COMPANYNAME));
        this.wish_productiondate = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_PRODUCTIONDATE));
        this.wish_expiredate = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_EXPIREDATE));
        this.wish_size = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_SIZE));
        this.wish_country = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_WISH_COUNTRY));
    }
}
