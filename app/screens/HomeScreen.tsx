import {Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {StatusBar} from 'expo-status-bar';
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from '../network/MovieApi';
import {useNavigation} from '@react-navigation/native';
import {styles} from '../style/theme';
import Loading from "../components/Loading";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";

const ios = Platform.OS === 'ios';

const HomeScreen = () => {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();


    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        console.log('got trending', data.results.length)
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
        console.log('got upcoming', data.results.length)
        if (data && data.results) setUpcoming(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        console.log('got top rated', data.results.length)
        if (data && data.results) setTopRated(data.results);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar */}
            <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
                <StatusBar style="light"/>
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                    <Text
                        className="text-white text-3xl font-bold">
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    {/* @ts-ignore */}
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white"/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {
                loading ? (
                    <Loading/>
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >

                        {/* Trending Movies Carousel */}
                        {trending.length > 0 && <TrendingMovies data={trending}/>}

                        {/* upcoming movies row */}
                        {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming}/>}

                        {/* top rated movies row */}
                        {topRated.length > 0 && <MovieList title="Top Rated" data={topRated}/>}

                    </ScrollView>
                )
            }
        </View>

    );
};

export default HomeScreen;
