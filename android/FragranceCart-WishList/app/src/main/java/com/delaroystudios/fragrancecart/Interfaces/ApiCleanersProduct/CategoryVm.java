package com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct;

import android.os.Parcel;
import android.os.Parcelable;

/**
 * Created by hp on 12/13/2018.
 */

public class CategoryVm implements Parcelable {
    String id;
    String name;
    String description;
    String parent;
    String thumbnail;

    protected CategoryVm(Parcel in) {
        id = in.readString();
        name = in.readString();
        description = in.readString();
        parent = in.readString();
        thumbnail = in.readString();
    }

    public static final Creator<CategoryVm> CREATOR = new Creator<CategoryVm>() {
        @Override
        public CategoryVm createFromParcel(Parcel in) {
            return new CategoryVm(in);
        }

        @Override
        public CategoryVm[] newArray(int size) {
            return new CategoryVm[size];
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getParent() {
        return parent;
    }

    public void setParent(String parent) {
        this.parent = parent;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }


    public CategoryVm() {
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeString(id);
        parcel.writeString(name);
        parcel.writeString(description);
        parcel.writeString(parent);
        parcel.writeString(thumbnail);
    }
}
