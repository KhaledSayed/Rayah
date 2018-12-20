package com.delaroystudios.fragrancecart;

import android.content.Context;
import android.database.Cursor;
import android.support.annotation.NonNull;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.bumptech.glide.Glide;
import com.bumptech.glide.request.RequestOptions;
import com.delaroystudios.fragrancecart.data.Cleanerslider;
import com.delaroystudios.fragrancecart.data.FragranceContract;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hp on 10/30/2018.
 */


public class ViewPagerAdapter extends PagerAdapter {

    private Context context;
    private LayoutInflater layoutInflater;
    Cursor cursor;
    ProductsDetails productsDetails;
    List<SliderImages> sliderImages;

//    private int[] images = {R.drawable.download, R.drawable.images, R.drawable.download};

    public ViewPagerAdapter(Context context, List<SliderImages> sliderImages) {
        this.context = context;
        this.sliderImages = sliderImages;
    }

    @Override

    public int getCount() {
        return sliderImages.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, final int position) {
        layoutInflater = (LayoutInflater) context.getSystemService(context.LAYOUT_INFLATER_SERVICE);
        View view = layoutInflater.inflate(R.layout.pager_layout, null);
        ImageView imageView = (ImageView) view.findViewById(R.id.imagerView);
        final LinearLayout linearLayoutshow = (LinearLayout) view.findViewById(R.id.details_slider_item);
//        imageView.setImageResource(images[position]);


        Glide.with(context).asBitmap()
                .load(sliderImages.get(position).getSliderimage())
                .apply(new RequestOptions().placeholder(R.drawable.load).override(500 , 400))
                .into(imageView);

//        view.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                if (position == 0) {
////                    Toast.makeText(context, "slide 1 cliked", Toast.LENGTH_SHORT).show();
////                    productsDetails.linershow();
//                } else if (position == 1) {
////                    Toast.makeText(context, "slide 2 cliked", Toast.LENGTH_SHORT).show();
////                    productsDetails.linershow();
//                } else if (position == 2) {
////                    Toast.makeText(context, "slide 3 cliked", Toast.LENGTH_SHORT).show();
////                    productsDetails.linershow();
//                }
//            }
//        });


        ViewPager vp = (ViewPager) container;
        vp.addView(view, 0);
        return view;
    }

    @Override
    public void destroyItem(@NonNull ViewGroup container, int position, @NonNull Object object) {
        ViewPager vp = (ViewPager) container;
        View view = (View) object;
        vp.removeView(view);
    }
}
