package com.delaroystudios.fragrancecart.data;

import android.database.Cursor;

/**
 * Created by hp on 10/27/2018.
 */

public class Cleaner {

    public int id_cleane;

    public int getId_cleane() {
        return id_cleane;
    }

    public void setId_cleane(int id_cleane) {
        this.id_cleane = id_cleane;
    }

    public String getName_cleane() {
        return name_cleane;
    }

    public void setName_cleane(String name_cleane) {
        this.name_cleane = name_cleane;
    }

    public String getDescription_cleane() {
        return description_cleane;
    }

    public void setDescription_cleane(String description_cleane) {
        this.description_cleane = description_cleane;
    }

    public String getImageUrl_cleane() {
        return imageUrl_cleane;
    }

    public void setImageUrl_cleane(String imageUrl_cleane) {
        this.imageUrl_cleane = imageUrl_cleane;
    }

    public Double getPrice_cleane() {
        return price_cleane;
    }

    public void setPrice_cleane(Double price_cleane) {
        this.price_cleane = price_cleane;
    }

    public int getUserRating_cleane() {
        return userRating_cleane;
    }

    public void setUserRating_cleane(int userRating_cleane) {
        this.userRating_cleane = userRating_cleane;
    }

    public String name_cleane;
    public String description_cleane;
    public String imageUrl_cleane;
    public Double price_cleane;
    public int userRating_cleane;

    public Cleaner(Cursor cursor) {
        this.id_cleane = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry._CLEANER));
        this.name_cleane = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_NAME_CLEANER));
        this.description_cleane = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_DESCRIPTION_CLEANER));
        this.imageUrl_cleane = cursor.getString(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_IMAGE_CLEANER));
        this.price_cleane = cursor.getDouble(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_PRICE_CLEANER));
        this.userRating_cleane = cursor.getInt(cursor.getColumnIndex(FragranceContract.FragranceEntry.COLUMN_USERRATING_CLEANER));
    }

    public Cleaner(int cleaner_iD, String cleanerName, String cleanerDescription, int cleanerRating, String cleanerImage, Double cleanerPrice) {
        this.id_cleane = cleaner_iD;
        this.name_cleane = cleanerName;
        this.description_cleane = cleanerDescription;
        this.imageUrl_cleane = cleanerImage;
        this.price_cleane = cleanerPrice;
        this.userRating_cleane = cleanerRating;
    }
}
