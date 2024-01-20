import {Dimensions, Image, TouchableWithoutFeedback} from 'react-native'
import React from 'react'
import {image500} from '../network/MovieApi';

const {width, height} = Dimensions.get('window');

interface Props {
    item: any;
    handleClick: any;
}

const MovieCardComponent = ({item, handleClick}: Props) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // source={require('../assets/images/moviePoster1.png')}
                // @ts-ignore
                source={{uri: image500(item.poster_path)}}
                style={{
                    width: width * 0.6,
                    height: height * 0.4
                }}
                className="rounded-3xl"
            />
        </TouchableWithoutFeedback>
    );
};

export default MovieCardComponent;
