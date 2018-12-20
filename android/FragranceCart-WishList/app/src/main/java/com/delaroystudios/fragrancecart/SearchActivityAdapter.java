package com.delaroystudios.fragrancecart;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.ToggleButton;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;

import java.util.ArrayList;
import java.util.List;

import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COMPANYNAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COUNTRY;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_DESCRIPTION;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_EXPIREDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_IMAGE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_NAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRICE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRODCTIONDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_RATING;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_SIZE;
import static com.delaroystudios.fragrancecart.ProductsDetails.ClEANER_SUPNAME;

/**
 * Created by hp on 11/13/2018.
 */

public class SearchActivityAdapter extends RecyclerView.Adapter<SearchActivityAdapter.ViewHolder> {
    Context search_context;
    List<Searchlist> data;

    public SearchActivityAdapter(Context search_context, List<Searchlist> data) {
        this.search_context = search_context;
        this.data = data;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View cardview = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.productitems, parent, false);
        return new ViewHolder(cardview);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {


        holder.cleanerName.setText(data.get(position).getSrmNames());


        Glide.with(search_context)
                .load(data.get(position).getSrmImageUrl())
                .apply(new RequestOptions().placeholder(R.drawable.load))
                .into(holder.cleanerThumbnail);


        // Initialize for favorite button
        SharedPreferences sharedFavorit = search_context.getSharedPreferences("searchActivitylol", Context.MODE_PRIVATE);
        Boolean a = sharedFavorit.getBoolean("searchActivityabc" + position, false);

        if (a) {
            holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(search_context, R.drawable.toogel_favourit_true));
            holder.cleanerFavorite.setChecked(true);
        } else {
            holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(search_context, R.drawable.toogel_ic_favourite));
            holder.cleanerFavorite.setChecked(false);
        }

        holder.cleanerFavorite.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(search_context, R.drawable.toogel_favourit_true));
                    SharedPreferences.Editor editor = search_context.getSharedPreferences("searchActivitylol", Context.MODE_PRIVATE).edit();
                    editor.putBoolean("searchActivityabc" + position, true);
                    editor.commit();

//                    DetergentsFragment detergentsFragment = new DetergentsFragment();
////                    detergentsFragment.AddWish();
//                    Toast.makeText(cleaner_context, "done", Toast.LENGTH_SHORT).show();

                } else {
                    holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(search_context, R.drawable.toogel_ic_favourite));
                    SharedPreferences.Editor editor = search_context.getSharedPreferences("searchActivitylol", Context.MODE_PRIVATE).edit();
                    editor.putBoolean("searchActivityabc" + position, false);
                    editor.commit();

//                    DetergentsFragment detergentsFragment = new DetergentsFragment();
////                    detergentsFragment.DeleteWish();
//                    Toast.makeText(cleaner_context, "noooooooo", Toast.LENGTH_SHORT).show();
                }
            }
        });


    }

    @Override
    public int getItemCount() {
        return data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView cleanerName, cleanerUserRating, cleanerDescription, cleanerPrice;
        public ImageView cleanerThumbnail;
        public ToggleButton cleanerFavorite;

        public ViewHolder(View itemView) {
            super(itemView);
            cleanerName = (TextView) itemView.findViewById(R.id.product_item_title);
            cleanerThumbnail = (ImageView) itemView.findViewById(R.id.product_item_thumbnail);
            cleanerFavorite = (ToggleButton) itemView.findViewById(R.id.favorite_item_img);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int pos = getAdapterPosition();
                    if (pos != RecyclerView.NO_POSITION) {
                        Intent intent = new Intent(search_context, ProductsDetails.class);

                        intent.putExtra(CLEANER_NAME, data.get(pos).getSrmNames());
                        intent.putExtra(CLEANER_DESCRIPTION, data.get(pos).getSrdesDescraption());
                        intent.putExtra(CLEANER_PRICE, data.get(pos).getSrmTextPrice());
                        intent.putExtra(CLEANER_IMAGE, data.get(pos).getSrmImageUrl());
                        intent.putExtra(CLEANER_RATING, data.get(pos).getSrdesDescraption());
                        intent.putExtra(ClEANER_SUPNAME, data.get(pos).getSrdesSupname());
                        intent.putExtra(CLEANER_COMPANYNAME, data.get(pos).getSrcompanyName());
                        intent.putExtra(CLEANER_PRODCTIONDATE, (data.get(pos).getSrdesProductionDate()));
                        intent.putExtra(CLEANER_EXPIREDATE, (data.get(pos).getSrdesExpiredate()));
                        intent.putExtra(CLEANER_SIZE, String.valueOf(data.get(pos).getSrdesSize()));
                        intent.putExtra(CLEANER_COUNTRY, data.get(pos).getSrdesOrginCountry());

                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        search_context.startActivity(intent);
                    }
                }
            });

        }
    }


    public void filterlist(ArrayList<Searchlist> filteredlist) {
        data = filteredlist;
        notifyDataSetChanged();
    }

}

