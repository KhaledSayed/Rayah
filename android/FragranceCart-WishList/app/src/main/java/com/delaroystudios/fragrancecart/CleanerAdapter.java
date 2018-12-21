package com.delaroystudios.fragrancecart;

import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CompoundButton;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.delaroystudios.fragrancecart.Interfaces.ApiCleanersProduct.ProductVm;
import com.delaroystudios.fragrancecart.ProductsFragments.DetergentsFragment;
import com.delaroystudios.fragrancecart.config.BaseUrl;
import com.delaroystudios.fragrancecart.data.Cleaner;
import com.delaroystudios.fragrancecart.data.FragranceContract;
import com.delaroystudios.fragrancecart.data.FragranceDbHelper;

import java.util.ArrayList;
import java.util.List;

import static android.support.constraint.Constraints.TAG;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COMPANYNAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_COUNTRY;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_DESCRIPTION;
//import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_ID;
//import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_IMAGE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_EXPIREDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_IMAGE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_NAME;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRICE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_PRODCTIONDATE;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_RATING;
import static com.delaroystudios.fragrancecart.ProductsDetails.CLEANER_SIZE;
import static com.delaroystudios.fragrancecart.ProductsDetails.ClEANER_SUPNAME;

/**
 * Created by hp on 10/27/2018.
 */

public class CleanerAdapter extends RecyclerView.Adapter<CleanerAdapter.ViewHolder> {

    Context cleaner_context;
    List<ProductVm> data;

    public CleanerAdapter(Context cleaner_context) {
        this.cleaner_context = cleaner_context;
        this.data = new ArrayList<>();
    }

    public void addProducts(List<ProductVm> products){
        if(data == null){
            data = new ArrayList<>();
        }
        data.addAll(products);
        this.notifyDataSetChanged();
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


        Glide.with(cleaner_context).asBitmap()
                .load(BaseUrl.baseImageUrl + data.get(position).getThumbnail())
                .into(holder.cleanerThumbnail);

        holder.cleanerPrice.setText(String.valueOf(data.get(position).getPrice()));

        holder.cleanerName.setText(data.get(position).getName());

        // Initialize for favorite button
        SharedPreferences sharedFavorit = cleaner_context.getSharedPreferences("cleanerlol", Context.MODE_PRIVATE);
        Boolean a = sharedFavorit.getBoolean("cleanerabc" + position, false);

        if (a) {
            holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(cleaner_context, R.drawable.toogel_favourit_true));
            holder.cleanerFavorite.setChecked(true);
        } else {
            holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(cleaner_context, R.drawable.toogel_ic_favourite));
            holder.cleanerFavorite.setChecked(false);
        }

        holder.cleanerFavorite.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                if (isChecked) {
                    holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(cleaner_context, R.drawable.toogel_favourit_true));
                    SharedPreferences.Editor editor = cleaner_context.getSharedPreferences("cleanerlol", Context.MODE_PRIVATE).edit();
                    editor.putBoolean("cleanerabc" + position, true);
                    editor.commit();


                    if (cleaner_context instanceof ProductsActivity) {
                        ((ProductsActivity) cleaner_context).addWishs();
                    }

                } else {
                    holder.cleanerFavorite.setBackgroundDrawable(ContextCompat.getDrawable(cleaner_context, R.drawable.toogel_ic_favourite));
                    SharedPreferences.Editor editor = cleaner_context.getSharedPreferences("cleanerlol", Context.MODE_PRIVATE).edit();
                    editor.putBoolean("cleanerabc" + position, false);
                    editor.commit();

                    if (cleaner_context instanceof ProductsActivity) {
                        ((ProductsActivity) cleaner_context).deleteWish();
                    }
                }
            }
        });


    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public TextView cleanerName, cleanerPrice;
        public ImageView cleanerThumbnail;
        public ToggleButton cleanerFavorite;


        public ViewHolder(View itemView) {
            super(itemView);
            cleanerName = (TextView) itemView.findViewById(R.id.product_item_title);
            cleanerThumbnail = (ImageView) itemView.findViewById(R.id.product_item_thumbnail);
            cleanerFavorite = (ToggleButton) itemView.findViewById(R.id.favorite_item_img);
            cleanerPrice = (TextView) itemView.findViewById(R.id.product_item_price_tv);

            itemView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    int pos = getAdapterPosition();
                    if (pos != RecyclerView.NO_POSITION) {
                        Intent intent = new Intent(cleaner_context, ProductsDetails.class);

                        intent.putExtra(CLEANER_NAME, data.get(pos).getName());
//                        intent.putExtra(CLEANER_DESCRIPTION, data.get(pos).getDesDescraption());
                        intent.putExtra(CLEANER_PRICE, data.get(pos).getPrice());
                        intent.putExtra(CLEANER_IMAGE, data.get(pos).getThumbnail());
//                        intent.putExtra(CLEANER_RATING, data.get(pos).getDesRating());
//                        intent.putExtra(ClEANER_SUPNAME, data.get(pos).getDesSupname());
//                        intent.putExtra(CLEANER_COMPANYNAME, data.get(pos).getCompanyName());
//                        intent.putExtra(CLEANER_PRODCTIONDATE, (data.get(pos).getDesProductionDate()));
//                        intent.putExtra(CLEANER_EXPIREDATE, (data.get(pos).getDesExpiredate()));
//                        Log.i(TAG, "onClick: expire " + data.get(pos).getDesExpiredate());
//                        intent.putExtra(CLEANER_SIZE, String.valueOf(data.get(pos).getDesSize()));
//                        intent.putExtra(CLEANER_COUNTRY, data.get(pos).desOrginCountry);

                        intent.putExtra("product",data.get(pos));
                        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        cleaner_context.startActivity(intent);
                    }
                }
            });
        }
    }


    @Override
    public int getItemCount() {
        return data.size();
    }


}
