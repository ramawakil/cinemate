import {Dimensions, Image, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import {LinearGradient} from 'expo-linear-gradient'
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
    fallbackMoviePoster,
    fetchMovieCredits,
    fetchMovieDetails,
    fetchSimilarMovies,
    image500
} from '../network/MovieApi';
import {styles, theme} from '../style/theme';
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import Cast from "../components/Cast";

const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';
const {width, height} = Dimensions.get('window');

const MovieScreen = () => {
    const {params: item}: any = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie]: any = useState({});
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies]: any = useState([])
    const [isFavourite, setFavourite]: any = useState(false);
    const [loading, setLoading]: any = useState(false);


    useEffect(() => {
        setLoading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getSimilarMovies(item.id);
    }, [item]);

    const getMovieDetails = async (id: any) => {
        const data = await fetchMovieDetails(id);
        console.log('got movie details');
        setLoading(false);
        if (data) {
            setMovie({...movie, ...data});
        }
    }
    const getMovieCredits = async (id: any) => {
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async (id: any) => {
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }
    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900">

            {/* back button and movie poster */}
            <View className="w-full">
                <SafeAreaView
                    className={"absolute z-20 w-full flex-row justify-between items-center px-4 " + topMargin}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1"
                                      onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => (!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/images/moviePoster2.png')}
                                source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
                                style={{width, height: height * 0.55}}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{width, height: height * 0.40}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                                className="absolute bottom-0"
                            />
                        </View>
                    )
                }


            </View>

            {/* movie details */}

            <View style={{marginTop: -(height * 0.09)}} className="space-y-3">
                {/* title */}
                <Text className="text-white text-center text-3xl font-bold tracking-widest">
                    {
                        movie?.title
                    }
                </Text>

                {/* status, release year, runtime */}
                {
                    movie?.id ? (
                        <Text className="text-neutral-400 font-semibold text-base text-center">
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }


                {/* genres  */}
                <View className="flex-row justify-center mx-4 space-x-2">
                    {
                        movie?.genres?.map((genre: any, index: any) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text className="text-neutral-400 mx-4 tracking-wide">
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* cast */}
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast}/>
            }

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 &&
                <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies}/>
            }

        </ScrollView>
    )
};

export default MovieScreen;
