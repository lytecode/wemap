import axios from "axios";
import { IAddress } from "../dto/address.dto";
import config from "../config";
import redis from "../utils/redis";

class AddressService {
  async validateAddress(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;

    //check redis cache for data
    const cachedEntry = await redis.get(`address:${street}-${country}`);
    //return cached if it exist
    if (cachedEntry) return JSON.parse(cachedEntry);

    try {
      //if cache miss, make request to api
      const { data } = await axios.get(
        `${config.NOMINATIM_BASE_API}/search.php?`,
        {
          params: {
            street: `${streetNumber}, ${street}`,
            city: town,
            postalcode: postalCode,
            country,
            format: "json",
          },
        }
      );

      //store result in redis
      redis.set(
        `address:${street}-${country}`,
        JSON.stringify(data),
        "EX",
        43200
      );

      return data;
    } catch (error) {
      return {
        error:
          "Unable to complete request at this time, please try again later",
      };
    }
  }

  async getWeather(addressDTO: IAddress) {
    const { street, streetNumber, town, postalCode, country } = addressDTO;
    let data;
    //check redis cache for data
    const cachedEntry = await redis.get(`address:${street}-${country}`);
    //return cached if it exist
    if (!cachedEntry) {
      try {
        const result = await axios.get(
          `${config.NOMINATIM_BASE_API}/search.php?`,
          {
            params: {
              street: `${streetNumber}, ${street}`,
              city: town,
              postalcode: postalCode,
              country,
              format: "json",
            },
          }
        );
        data = result.data;

        if (data.length === 0) {
          return { msg: "Address could not be found" };
        }
      } catch (error) {
        return {
          error:
            "Unable to complete request at this time, please try again later",
        };
      }
    }
    //we have data in cach for this address
    data = JSON.parse(cachedEntry as string);

    const { lat, lon } = data[0];

    //check if we have entry for this lat and lon
    const weatherEntry = await redis.get(`weather:${lat}-${lon}`);
    if (weatherEntry) return JSON.parse(weatherEntry);

    try {
      const { data: weather } = await axios.get(`${config.TIMER7_BASE_API}?`, {
        params: {
          lon,
          lat,
          product: "civillight",
          output: "json",
        },
      });

      //cache data in redis
      redis.set(`weather:${lat}-${lon}`, JSON.stringify(weather), "EX", 43200);

      return weather;
    } catch (error) {
      return {
        error:
          "Unable to complete request at this time, please try again later",
      };
    }
  }
}

export default new AddressService();
