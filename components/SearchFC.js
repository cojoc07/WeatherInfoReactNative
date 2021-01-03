import React, { useRef, useCallback, useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";

import * as forecastActions from "../store/actions/forecast";
import { useDispatch, useSelector } from "react-redux";

const PlacesInput = (props) => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [showList, setShowList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useSelector((state) => state.location);

  const dispatch = useDispatch();

  //cand se schimba locatia din state
  useEffect(() => {
    if (location.location.length > 5) {
      console.log("Location changed: " + location.location);
      setQuery(location.location);
    }
  }, [location]);

  //componentDidMount
  useEffect(() => {
    if (props.query) {
      fetchPlaces();
    }
  }, []);

  const buildCountryQuery = () => {
    const { queryCountries } = props;

    if (!queryCountries) {
      return "";
    }

    return `&components=${queryCountries
      .map((countryCode) => {
        return `country:${countryCode}`;
      })
      .join("|")}`;
  };

  const buildLocationQuery = () => {
    const { searchLatitude, searchLongitude, searchRadius } = props;

    if (!searchLatitude || !searchLongitude || !searchRadius) {
      return "";
    }

    return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
  };

  const buildTypesQuery = () => {
    const { queryTypes } = props;

    if (!queryTypes) {
      return "";
    }

    return `&types=${queryTypes}`;
  };

  const buildSessionQuery = () => {
    const { querySession } = props;

    if (querySession) {
      return `&sessiontoken=${querySession}`;
    }

    return "";
  };

  const tryLoad = async (lat, lon) => {
    setIsLoading(true);
    try {
      await dispatch(forecastActions.fetchForecast(lat, lon));
    } catch (err) {
      Alert.alert("Eroare", err.message);
    }
    setIsLoading(false);
  };

  const fetchPlaces = async (query) => {
    if (!query || query.length < props.requiredCharactersBeforeSearch) {
      return;
    }
    console.log("Fetching places for " + query);
    setShowList(true);
    setIsLoading(true);

    const places = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${
        props.googleApiKey
      }&inputtype=textquery&language=${props.language}&fields=${
        props.queryFields
      }${buildLocationQuery()}${buildCountryQuery()}${buildTypesQuery()}${buildSessionQuery()}`
    ).then((response) => response.json());

    setIsLoading(false);
    setPlaces(places.predictions);
  };

  const debouncedFunctionRef = useRef();
  debouncedFunctionRef.current = (field, payload) => fetchPlaces(field);

  const debouncedChange = useCallback(
    _.debounce((...args) => debouncedFunctionRef.current(...args), 1000),
    []
  );

  const onPlaceSelect = async (id, passedPlace) => {
    const { clearQueryOnSelect } = props;

    setIsLoading(true);
    console.log("entering onPlaceSelect");
    try {
      const place = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${
          props.googleApiKey
        }&fields=${props.queryFields}&language=${
          props.language
        }${buildSessionQuery()}`
      ).then((response) => response.json());

      setShowList(false);
      setIsLoading(false);
      setQuery(
        clearQueryOnSelect
          ? ""
          : place &&
              place.result &&
              (place.result.formatted_address || place.result.name)
      );

      tryLoad(
        place.result.geometry.location.lat,
        place.result.geometry.location.lng
      );

      Keyboard.dismiss();
    } catch (e) {
      console.log("entering catch" + e.message);
      setShowList(false);
      setIsLoading(false);
      setQuery(passedPlace.description);
    }
  };

  return (
    <View>
      <View style={[styles.container, props.stylesContainer]}>
        <TextInput
          placeholder={props.placeHolder}
          style={[styles.input, props.stylesInput]}
          onChangeText={(newquery) => {
            setQuery(newquery);
            console.log("Setting query to " + newquery);
            //delayedQuery(newquery);
            debouncedChange(newquery);
          }}
          value={query}
          onFocus={() => setShowList(true)}
          onBlur={() => setShowList(false)}
          {...props.textInputProps}
          clearButtonMode="never"
        />

        {showList && (
          <View
            style={[styles.scrollView, props.stylesList]}
            keyboardShouldPersistTaps="always"
          >
            {props.contentScrollViewTop}
            {isLoading && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator
                  size="small"
                  style={[styles.loading, props.stylesLoading]}
                />
              </View>
            )}
            {places.map((place) => {
              return (
                <TouchableOpacity
                  key={`place-${place.place_id || place.id}`}
                  style={[styles.place, props.stylesItem]}
                  onPress={() => onPlaceSelect(place.place_id, place)}
                >
                  <Text style={[styles.placeText, props.stylesItemText]}>
                    {props.resultRender(place)}
                  </Text>
                  {props.iconResult}
                </TouchableOpacity>
              );
            })}

            {props.contentScrollViewBottom}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={{
          flex: 1,
          position: "absolute",
          padding: 5,

          elevation: 5,
          zIndex: 1000,
          top: 18,
          right: 22,
        }}
        onPress={() => {
          setQuery("");

          Keyboard.dismiss();
        }}
      >
        <Ionicons name="ios-close" size={22} color={"gray"} />
      </TouchableOpacity>
    </View>
  );
};

PlacesInput.propTypes = {
  clearQueryOnSelect: PropTypes.bool,
  contentScrollViewBottom: PropTypes.node,
  contentScrollViewTop: PropTypes.node,
  stylesInput: PropTypes.object,
  stylesContainer: PropTypes.object,
  stylesList: PropTypes.object,
  stylesItem: PropTypes.object,
  stylesItemText: PropTypes.object,
  stylesLoading: PropTypes.object,
  resultRender: PropTypes.func,
  query: PropTypes.string,
  queryFields: PropTypes.string,
  queryCountries: PropTypes.array,
  queryTypes: PropTypes.string,
  querySession: PropTypes.string,
  searchRadius: PropTypes.number,
  searchLatitude: PropTypes.number,
  searchLongitude: PropTypes.number,
  googleApiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  textInputProps: PropTypes.object,
  iconResult: PropTypes.any,
  iconInput: PropTypes.any,
  language: PropTypes.string,
  onSelect: PropTypes.func,
  onChangeText: PropTypes.func,

  requiredCharactersBeforeSearch: PropTypes.number,
  requiredTimeBeforeSearch: PropTypes.number,
};

PlacesInput.defaultProps = {
  stylesInput: {},
  stylesContainer: {},
  stylesList: {},
  stylesItem: {},
  stylesLoading: {},
  stylesItemText: {},
  queryFields: "formatted_address,geometry,name",
  placeHolder: "Search places...",
  textInputProps: {},
  language: "en",
  resultRender: (place) => place.description,
  requiredCharactersBeforeSearch: 2,
  requiredTimeBeforeSearch: 1000,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    zIndex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  input: {
    height: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  scrollView: {
    backgroundColor: "#fff",
  },
  place: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    padding: 15,
    position: "relative",
    zIndex: 10001,
  },
  placeIcon: {
    position: "absolute",
    top: 10,
    right: 15,
    color: "rgba(0,0,0,0.3)",
  },
  placeText: {
    color: "rgba(0,0,0,0.8)",
    paddingRight: 60,
  },
  loading: {
    margin: 10,
  },
});

export default PlacesInput;
