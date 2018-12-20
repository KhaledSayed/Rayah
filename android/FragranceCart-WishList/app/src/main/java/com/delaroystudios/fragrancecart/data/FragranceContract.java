package com.delaroystudios.fragrancecart.data;

import android.content.ContentResolver;
import android.net.Uri;
import android.provider.BaseColumns;

/**
 * Created by delaroy on 9/3/17.
 */

public class FragranceContract {

    private FragranceContract() {
    }

    /**
     * The "Content authority" is a name for the entire content provider, similar to the
     * relationship between a domain name and its website.  A convenient string to use for the
     * content authority is the package name for the app, which is guaranteed to be unique on the
     * device.
     */
    public static final String CONTENT_AUTHORITY = "com.delaroystudios.fragrancecart";

    /**
     * Use CONTENT_AUTHORITY to create the base of all URI's which apps will use to contact
     * the content provider.
     */
    public static final Uri BASE_CONTENT_URI = Uri.parse("content://" + CONTENT_AUTHORITY);


    public static final String PATH_FRAGRANCE = "fragrance-path";

    public static final String PATH_CART = "cart-path";

    public static final String PATH_WISH = "wish-path";

    public static final String PATH_CLEANER = "cleaner-path";


    /**
     * Inner class that defines constant values for the fragrance database table.
     * Each entry in the table represents a single fragrance.
     */
    public static final class FragranceEntry implements BaseColumns {

        /**
         * The content URI to access the fragrance data in the provider
         */
        public static final Uri CONTENT_URI = Uri.withAppendedPath(BASE_CONTENT_URI, PATH_FRAGRANCE);

        public static final Uri CONTENT_URI_CART = Uri.withAppendedPath(BASE_CONTENT_URI, PATH_CART);

        public static final Uri CONTENT_URI_WISH = Uri.withAppendedPath(BASE_CONTENT_URI, PATH_WISH);

        public static final Uri CONTENT_URI_CLEANER = Uri.withAppendedPath(BASE_CONTENT_URI, PATH_CLEANER);

        /**
         * The MIME type of the {@link #CONTENT_URI} for a list of fragrance.
         */
        public static final String CONTENT_LIST_TYPE =
                ContentResolver.CURSOR_DIR_BASE_TYPE + "/" + CONTENT_AUTHORITY + "/" + PATH_FRAGRANCE;

        /**
         * The MIME type of the {@link #CONTENT_URI} for a single fragrance.
         */
        public static final String CONTENT_ITEM_TYPE =
                ContentResolver.CURSOR_ITEM_BASE_TYPE + "/" + CONTENT_AUTHORITY + "/" + PATH_FRAGRANCE;

        /**
         * The MIME type of the {@link #CONTENT_URI} for a list of fragrance.
         */
        public static final String CONTENT_LIST_TYPE_CLEANER =
                ContentResolver.CURSOR_DIR_BASE_TYPE + "/" + CONTENT_AUTHORITY + "/" + PATH_CLEANER;

        /**
         * The MIME type of the {@link #CONTENT_URI} for a single fragrance.
         */
        public static final String CONTENT_ITEM_TYPE_CLEANER =
                ContentResolver.CURSOR_ITEM_BASE_TYPE + "/" + CONTENT_AUTHORITY + "/" + PATH_CLEANER;

        /**
         * Name of database table for fragrance
         */
        public final static String TABLE_NAME = "fragrances";

        //cart table name
        public final static String CART_TABLE = "cart";

        //wishlist table name
        public final static String WISH_TABLE = "wishlist";

        public final static String CLEANER_TABLE = "cleaner";

        /**
         * Unique ID number for the fragrance (only for use in the database table).
         * <p>
         * Type: INTEGER
         */
        public final static String _ID = BaseColumns._ID;

        public final static String _CARTID = BaseColumns._ID;

        public final static String _WISHID = BaseColumns._ID;

        public final static String _CLEANER = BaseColumns._ID;

        /**
         * Name of the fragrance.
         * <p>
         * Type: TEXT
         */
        public final static String COLUMN_NAME = "fragrancename";
        public final static String COLUMN_DESCRIPTION = "description";
        public final static String COLUMN_IMAGE = "imageurl";
        public final static String COLUMN_PRICE = "price";
        public final static String COLUMN_USERRATING = "userrating";

        //COLUMNS FOR CART
        public final static String COLUMN_CART_NAME = "cartfragrancename";
        public final static String COLUMN_CART_IMAGE = "cartimageurl";
        public final static String COLUMN_CART_QUANTITY = "cartquantity";
        public final static String COLUMN_CART_TOTAL_PRICE = "carttotalprice";
        public final static String COLUMN_CART_PRODUCT_ID = "product_id";

        //COLUMNS FOR WISHLIST
        public final static String COLUMN_WISH_NAME = "wish_fragrancename";
        public final static String COLUMN_WISH_SUPNAME = "wish_supename";
        public final static String COLUMN_WISH_DESCRIPTION = "wish_description";
        public final static String COLUMN_WISH_IMAGE = "wish_imageurl";
        public final static String COLUMN_WISH_PRICE = "wish_price";
        public final static String COLUMN_WISH_USERRATING = "wish_userrating";
        public final static String COLUMN_WISH_COMPANYNAME = "wish_company";
        public final static String COLUMN_WISH_PRODUCTIONDATE = "wish_prodate";
        public final static String COLUMN_WISH_EXPIREDATE = "wish_expier";
        public final static String COLUMN_WISH_SIZE = "wish_size";
        public final static String COLUMN_WISH_COUNTRY = "wish_country";
        //COULMNS FOR CLEANER
        public final static String COLUMN_NAME_CLEANER = "fragrancename";
        public final static String COLUMN_DESCRIPTION_CLEANER = "description";
        public final static String COLUMN_IMAGE_CLEANER = "imageurl";
        public final static String COLUMN_PRICE_CLEANER = "price";
        public final static String COLUMN_USERRATING_CLEANER = "userrating";


    }

}

