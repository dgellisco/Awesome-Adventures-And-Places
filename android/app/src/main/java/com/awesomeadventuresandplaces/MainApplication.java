package com.awesomeadventuresandplaces;

import android.app.Application;
 
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
// react-native-navigation
import com.reactnativenavigation.NavigationApplication;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-maps
import com.airbnb.android.react.maps.MapsPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
 
import java.util.Arrays;
import java.util.List;
 
public class MainApplication extends NavigationApplication {
 
  @Override
  public boolean isDebug() {
    // Make sure you are using BuildConfig from your own application
    return BuildConfig.DEBUG;
  }
 
  protected List<ReactPackage> getPackages() {
    // Add additional packages you require here
    // No need to add RnnPackage and MainReactPackage
    return Arrays.<ReactPackage>asList(
      new MainReactPackage(),
      new VectorIconsPackage(),
      // Not needed???
      new ImagePickerPackage(),
      new MapsPackage()
    );
  }
 
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return getPackages();
  }
 
  @Override
  public String getJSMainModuleName() {
    return "index";
  }
}