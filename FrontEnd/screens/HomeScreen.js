import React from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useRef } from 'react';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from "react-native-image-crop-picker";


//Home screen components
const HomeScreen = (props) => {
  let cameraRef = useRef(null)
  const [cameraType, setcameraType] = useState(RNCamera.Constants.Type.back);
  const [FlashMode, setfalshligt] = useState(RNCamera.Constants.FlashMode.off);
  
  //Capture method for camera
  takePicture = async (props) => {
    if (cameraRef) {
      console.log('Taking photo');
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      // console.log(data,"--------------------------------------------------------");
      props.navigation.navigate("QuestionAnswerScreen",{uri:data.uri})
      console.log(props.navigation,"-ggggggggggg-");

    }
  };

  //Flip camera side method 
  flipCamera =() => {
      if(cameraType== RNCamera.Constants.Type.back){
        setcameraType(RNCamera.Constants.Type.front)
      }else {
        setcameraType(RNCamera.Constants.Type.back)
      }
  };

  //Flash Light on off method
  falshligt =()=> {
    if(FlashMode ==RNCamera.Constants.FlashMode.off){
      setfalshligt(RNCamera.Constants.FlashMode.on)
    }else{
      setfalshligt(RNCamera.Constants.FlashMode.off)
    }
  };

  //navigate with selected image from defualt image gallery
  navigateToViewPhotos = data => {
    console.log(data,"-ggggggggggg-ssasdasdas");
    props.navigation.navigate("QuestionAnswerScreen",{uri:data.uri})
  };

  choosePhotosFromGallery = () => {
  ImagePicker.openPicker({
      width:  600,
      height: 450,
      multiple: true,
  })
      .then(images => {
          console.log(images)
          if (images.length > 0) {
              navigateToViewPhotos(images);
          }
      })
      .catch(err => {
          console.log(' Error fetching images from gallery ', err);
      });
};

selectImages = () => {
  const buttons = ['Camera', 'Photo Library', 'Cancel'];
  ActionSheet.show(
      {
          options: buttons,
          cancelButtonIndex: 2,
      },
      buttonIndex => {
          console.log(' selected index ', buttonIndex);
          switch (buttonIndex) {
              case 1:
                  this.choosePhotosFromGallery();
                  break;
              default:
                  break;
          }
      },
  );
}

    return ( 
      <Root>
        <SafeAreaView style={styles.container}>
          <View style={styles.preview}>
            <RNCamera
              ref={cameraRef}
              style={styles.cameraView}
              type={cameraType}
              flashMode={FlashMode}
              captureAudio={false}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
          </View>
          <View style={styles.bottomSection}>
            <View style={styles.camBottomBar}>
                <TouchableOpacity   onPress={() => selectImages()} style={styles.capture}>
                  <Icon name="images-outline" size={36} color='#264CAD' />
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => takePicture(props)} style={styles.captureBtn}>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => flipCamera()} style={styles.capture}>
                  <Icon name="camera-reverse" size={36} color='#264CAD' />
              </TouchableOpacity>
            </View>
          </View>
        
      </SafeAreaView>
      </Root>
      
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#264CAD',
    },
    cameraView: {
      height: '100%'
    },
    preview: {
      flex: 1,
      borderRadius: 5,
      height: '80%',
    },
    bottomSection: {
      height: '20%',
      flex: 0,
      flexDirection: 'column'
    },
    capture: {
      flex: 0,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 50,
      alignSelf: 'center',
      margin: 10,
      borderRadius: 50,
    },
    captureBtn: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 5,
        borderColor: '#264CAD',
        backgroundColor: '#ffff',
        marginTop: 10
    },
    camBottomBar: {
      flexDirection: 'row', 
      justifyContent: 'center',
      backgroundColor: '#fff', 
      borderRadius: 100, 
      marginTop: 20, 
      marginHorizontal: 2,
      opacity: 0.8,
    }
  });
export default HomeScreen;







