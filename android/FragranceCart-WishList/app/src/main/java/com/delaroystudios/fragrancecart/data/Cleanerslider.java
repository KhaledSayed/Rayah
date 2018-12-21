package com.delaroystudios.fragrancecart.data;

import android.database.Cursor;

/**
 * Created by hp on 10/30/2018.
 */

public class Cleanerslider {
    public int id_cleane;
    public String imageUrl_cleane_slid;

    public Cleanerslider(Cursor cursor) {

        this.id_cleane = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry._CLEANER));
        this.imageUrl_cleane_slid = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_IMAGE_CLEANER));


    }

}
