package com.delaroystudios.fragrancecart;

/**
 * Created by hp on 11/13/2018.
 */

public class Searchlist {
    String srmNames;
    String srmImageUrl;
    String srmImageIcon;
    int srmTextPrice;
    String srdesName;
    String srdesSupname;
    int srdesPrice;
    String srdesDescraption;
    int srdesRating;
    String srdesProductionDate;
    String srdesExpiredate;
    int srdesSize;
    String srcompanyName;
    String srdesOrginCountry;

    public Searchlist(String srmNames, String srmImageUrl, String srmImageIcon, int srmTextPrice, String srdesName, String srdesSupname, int srdesPrice, String srdesDescraption, int srdesRating, String srdesProductionDate, String srdesExpiredate, int srdesSize, String srcompanyName, String srdesOrginCountry) {
        this.srmNames = srmNames;
        this.srmImageUrl = srmImageUrl;
        this.srmImageIcon = srmImageIcon;
        this.srmTextPrice = srmTextPrice;
        this.srdesName = srdesName;
        this.srdesSupname = srdesSupname;
        this.srdesPrice = srdesPrice;
        this.srdesDescraption = srdesDescraption;
        this.srdesRating = srdesRating;
        this.srdesProductionDate = srdesProductionDate;
        this.srdesExpiredate = srdesExpiredate;
        this.srdesSize = srdesSize;
        this.srcompanyName = srcompanyName;
        this.srdesOrginCountry = srdesOrginCountry;
    }

    public String getSrmNames() {
        return srmNames;
    }

    public String getSrmImageUrl() {
        return srmImageUrl;
    }

    public String getSrmImageIcon() {
        return srmImageIcon;
    }

    public int getSrmTextPrice() {
        return srmTextPrice;
    }

    public String getSrdesName() {
        return srdesName;
    }

    public String getSrdesSupname() {
        return srdesSupname;
    }

    public int getSrdesPrice() {
        return srdesPrice;
    }

    public String getSrdesDescraption() {
        return srdesDescraption;
    }

    public int getSrdesRating() {
        return srdesRating;
    }

    public String getSrdesProductionDate() {
        return srdesProductionDate;
    }

    public String getSrdesExpiredate() {
        return srdesExpiredate;
    }

    public int getSrdesSize() {
        return srdesSize;
    }

    public String getSrcompanyName() {
        return srcompanyName;
    }

    public String getSrdesOrginCountry() {
        return srdesOrginCountry;
    }
}
