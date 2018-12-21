package com.delaroystudios.fragrancecart;

import android.content.Context;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.delaroystudios.fragrancecart.Fragments.HomeFragment;

import java.util.ArrayList;

import de.hdodenhof.circleimageview.CircleImageView;

/**
 * Created by hp on 10/23/2018.
 */

public class HomeRecyclerViewAdapter extends RecyclerView.Adapter<HomeRecyclerViewAdapter.ViewHolder> {
    private static final String TAG = "HomeRecyclerViewAdapter";

    private ArrayList<String> mNames = new ArrayList<>();
    private ArrayList<String> mImageUrls = new ArrayList<>();
    private ArrayList<String> mImageIcon = new ArrayList<>();
    private ArrayList<String> mTextPrice = new ArrayList<>();
    private Context context;

    public HomeRecyclerViewAdapter(Context context, ArrayList<String> mNames, ArrayList<String> mImageUrls, ArrayList<String> mImageIcon, ArrayList<String> mTextPrice) {
        this.mNames = mNames;
        this.mImageUrls = mImageUrls;
        this.mImageIcon = mImageIcon;
        this.mTextPrice = mTextPrice;
        this.context = context;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.home_listitem, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, final int position) {
        Log.d(TAG, "onCreateViewholder: called.");
        Glide.with(context).asBitmap()
                .load(mImageUrls.get(position))
                .into(holder.image);

        Glide.with(context).asBitmap()
                .load(R.drawable.download)
                .into(holder.icon);

        holder.price.setText(mTextPrice.get(position));

        holder.name.setText(mNames.get(position));
        holder.image.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: clicked on an image: " + mNames.get(position));
                Toast.makeText(context, mNames.get(position), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return mImageUrls.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {

        CircleImageView image;
        TextView name, price;
        ImageView icon;

        public ViewHolder(View itemView) {
            super(itemView);
            image = itemView.findViewById(R.id.home_image_item);
            name = itemView.findViewById(R.id.home_itemlist_name);
            price = itemView.findViewById(R.id.home_listitem_price);
            icon = itemView.findViewById(R.id.home_listitem_icon);

        }
    }
}
