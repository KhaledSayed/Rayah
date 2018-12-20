package com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

/**
 * Created by hp on 12/13/2018.
 */

public class ProductVm implements Parcelable {

    String id;
    String name;
    String code;
    int quantity;
    int price;
    boolean featured;
    String thumbnail;
    List<String> gallery;


    protected ProductVm(Parcel in) {
        id = in.readString();
        name = in.readString();
        code = in.readString();
        quantity = in.readInt();
        price = in.readInt();
        featured = in.readByte() != 0;
        thumbnail = in.readString();
        gallery = in.createStringArrayList();
    }

    public static final Creator<ProductVm> CREATOR = new Creator<ProductVm>() {
        @Override
        public ProductVm createFromParcel(Parcel in) {
            return new ProductVm(in);
        }

        @Override
        public ProductVm[] newArray(int size) {
            return new ProductVm[size];
        }
    };

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<String> getGallery() {
        return gallery;
    }

    public void setGallery(List<String> gallery) {
        this.gallery = gallery;
    }


    public ProductVm() {
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(id);
        parcel.writeString(name);
        parcel.writeString(code);
        parcel.writeInt(quantity);
        parcel.writeInt(price);
        parcel.writeByte((byte) (featured ? 1 : 0));
        parcel.writeString(thumbnail);
        parcel.writeStringList(gallery);
    }
}
