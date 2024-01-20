import {Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native';
import {fallbackMoviePoster, image185} from '../network/MovieApi';
import {styles} from '../style/theme';

const {width, height} = Dimensions.get('window');

interface Props {
    title: string | any;
    data: any;
    hideSeeAll?: boolean;
}

const MovieListComponent = ({title, data, hideSeeAll = false}: Props) => {
    const navigation: any = useNavigation();
    return (
        <View className="mb-8 space-y-4">

            <View className="mx-4 ">
                <Text className="text-white text-lg">{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={styles.text} className="text-lg">See All</Text>
                        </TouchableOpacity>
                    )
                }


            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
                {
                    data.map((item: any, index: any) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => navigation.push('Movie', item)}
                            >
                                <View className="space-y-1 mr-4">
                                    <Image
                                        // source={require('../assets/images/moviePoster2.png')}
                                        source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                        className="rounded-3xl"
                                        style={{width: width * 0.33, height: height * 0.22}}
                                    />
                                    <Text className="text-neutral-300 ml-1">
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default MovieListComponent;
