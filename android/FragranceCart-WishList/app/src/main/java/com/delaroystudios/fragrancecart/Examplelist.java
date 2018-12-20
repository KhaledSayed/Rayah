package com.delaroystudios.fragrancecart;

/**
 * Created by hp on 11/6/2018.
 */

public class Examplelist {
    String mNames;
    String mImageUrl;
    String mImageIcon;
    int mTextPrice;
    String desName;
    String desSupname;
    int desPrice;
    String desDescraption;
    int desRating;
    String desProductionDate;
    String desExpiredate;
    int desSize;
    String companyName;
    String desOrginCountry;

    public Examplelist(String mNames, String mImageUrl, String mImageIcon, int mTextPrice, String desName, String desSupname, int desPrice, String desDescraption, int desRating, String desProductionDate, String desExpiredate, int desSize, String companyName, String desOrginCountry) {
        this.mNames = mNames;
        this.mImageUrl = mImageUrl;
        this.mImageIcon = mImageIcon;
        this.mTextPrice = mTextPrice;
        this.desName = desName;
        this.desSupname = desSupname;
        this.desPrice = desPrice;
        this.desDescraption = desDescraption;
        this.desRating = desRating;
        this.desProductionDate = desProductionDate;
        this.desExpiredate = desExpiredate;
        this.desSize = desSize;
        this.companyName = companyName;
        this.desOrginCountry = desOrginCountry;
    }

    public String getmNames() {
        return mNames;
    }

    public String getmImageUrl() {
        return mImageUrl;
    }

    public String getmImageIcon() {
        return mImageIcon;
    }

    public int getmTextPrice() {
        return mTextPrice;
    }

    public String getDesName() {
        return desName;
    }

    public String getDesSupname() {
        return desSupname;
    }

    public int getDesPrice() {
        return desPrice;
    }

    public String getDesDescraption() {
        return desDescraption;
    }

    public int getDesRating() {
        return desRating;
    }

    public String getDesProductionDate() {
        return desProductionDate;
    }

    public String getDesExpiredate() {
        return desExpiredate;
    }

    public int getDesSize() {
        return desSize;
    }

    public String getCompanyName() {
        return companyName;
    }

    public String getDesOrginCountry() {
        return desOrginCountry;
    }
}
